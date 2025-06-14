import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const rooms = new Map<string, Set<string>>();

io.on("connection", (socket) => {
  const roomId = socket.handshake.query.roomId as string;
  if (!roomId) {
    socket.disconnect();
    return;
  }

  // Join room
  socket.join(roomId);
  if (!rooms.has(roomId)) {
    rooms.set(roomId, new Set());
  }
  rooms.get(roomId)!.add(socket.id);

  // Notify others in the room
  socket.to(roomId).emit("peer-joined", socket.id);

  // Handle WebRTC signaling
  socket.on("offer", (data: { peerId: string; offer: RTCSessionDescriptionInit }) => {
    socket.to(data.peerId).emit("offer", {
      peerId: socket.id,
      offer: data.offer,
    });
  });

  socket.on("answer", (data: { peerId: string; answer: RTCSessionDescriptionInit }) => {
    socket.to(data.peerId).emit("answer", {
      peerId: socket.id,
      answer: data.answer,
    });
  });

  socket.on("ice-candidate", (data: { peerId: string; candidate: RTCIceCandidateInit }) => {
    socket.to(data.peerId).emit("ice-candidate", {
      peerId: socket.id,
      candidate: data.candidate,
    });
  });

  // Handle chat messages
  socket.on("message", (message: string) => {
    socket.to(roomId).emit("message", {
      peerId: socket.id,
      message,
    });
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    if (rooms.has(roomId)) {
      rooms.get(roomId)!.delete(socket.id);
      if (rooms.get(roomId)!.size === 0) {
        rooms.delete(roomId);
      } else {
        socket.to(roomId).emit("peer-left", socket.id);
      }
    }
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Signaling server running on port ${PORT}`);
}); 