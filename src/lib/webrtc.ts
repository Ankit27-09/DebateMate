import { io, Socket } from "socket.io-client";

export type PeerConnection = {
  peerId: string;
  connection: RTCPeerConnection;
  stream: MediaStream;
};

export class WebRTCManager {
  private socket: Socket;
  private localStream: MediaStream | null = null;
  private peerConnections: Map<string, PeerConnection> = new Map();
  private configuration: RTCConfiguration = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:stun1.l.google.com:19302" },
    ],
  };

  constructor(
    private roomId: string,
    private onPeerJoined: (peerId: string) => void,
    private onPeerLeft: (peerId: string) => void,
    private onMessage: (peerId: string, message: string) => void
  ) {
    this.socket = io(process.env.NEXT_PUBLIC_SIGNALING_SERVER || "http://localhost:3001", {
      query: { roomId },
    });

    this.setupSocketListeners();
  }

  private setupSocketListeners() {
    this.socket.on("peer-joined", async (peerId: string) => {
      console.log("Peer joined:", peerId);
      await this.createPeerConnection(peerId);
      this.onPeerJoined(peerId);
    });

    this.socket.on("peer-left", (peerId: string) => {
      console.log("Peer left:", peerId);
      this.closePeerConnection(peerId);
      this.onPeerLeft(peerId);
    });

    this.socket.on("offer", async (data: { peerId: string; offer: RTCSessionDescriptionInit }) => {
      console.log("Received offer from:", data.peerId);
      const connection = await this.createPeerConnection(data.peerId);
      await connection.setRemoteDescription(new RTCSessionDescription(data.offer));
      const answer = await connection.createAnswer();
      await connection.setLocalDescription(answer);
      this.socket.emit("answer", { peerId: data.peerId, answer });
    });

    this.socket.on("answer", async (data: { peerId: string; answer: RTCSessionDescriptionInit }) => {
      console.log("Received answer from:", data.peerId);
      const connection = this.peerConnections.get(data.peerId)?.connection;
      if (connection) {
        await connection.setRemoteDescription(new RTCSessionDescription(data.answer));
      }
    });

    this.socket.on("ice-candidate", async (data: { peerId: string; candidate: RTCIceCandidateInit }) => {
      console.log("Received ICE candidate from:", data.peerId);
      const connection = this.peerConnections.get(data.peerId)?.connection;
      if (connection) {
        await connection.addIceCandidate(new RTCIceCandidate(data.candidate));
      }
    });

    this.socket.on("message", (data: { peerId: string; message: string }) => {
      this.onMessage(data.peerId, data.message);
    });
  }

  async initialize() {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
    } catch (error) {
      console.error("Failed to get user media:", error);
      throw new Error("Failed to access microphone");
    }
  }

  private async createPeerConnection(peerId: string): Promise<RTCPeerConnection> {
    const connection = new RTCPeerConnection(this.configuration);

    // Add local stream
    if (this.localStream) {
      this.localStream.getTracks().forEach((track) => {
        connection.addTrack(track, this.localStream!);
      });
    }

    // Handle ICE candidates
    connection.onicecandidate = (event) => {
      if (event.candidate) {
        this.socket.emit("ice-candidate", {
          peerId,
          candidate: event.candidate,
        });
      }
    };

    // Handle incoming tracks
    connection.ontrack = (event) => {
      const peerConnection = this.peerConnections.get(peerId);
      if (peerConnection) {
        peerConnection.stream = event.streams[0];
      }
    };

    // Create and send offer
    const offer = await connection.createOffer();
    await connection.setLocalDescription(offer);
    this.socket.emit("offer", { peerId, offer });

    this.peerConnections.set(peerId, {
      peerId,
      connection,
      stream: new MediaStream(),
    });

    return connection;
  }

  private closePeerConnection(peerId: string) {
    const peerConnection = this.peerConnections.get(peerId);
    if (peerConnection) {
      peerConnection.connection.close();
      this.peerConnections.delete(peerId);
    }
  }

  async toggleMute(muted: boolean) {
    if (this.localStream) {
      this.localStream.getAudioTracks().forEach((track) => {
        track.enabled = !muted;
      });
    }
  }

  sendMessage(message: string) {
    this.socket.emit("message", { message });
  }

  getPeerStream(peerId: string): MediaStream | null {
    return this.peerConnections.get(peerId)?.stream || null;
  }

  cleanup() {
    this.localStream?.getTracks().forEach((track) => track.stop());
    this.peerConnections.forEach(({ connection }) => connection.close());
    this.peerConnections.clear();
    this.socket.disconnect();
  }
} 