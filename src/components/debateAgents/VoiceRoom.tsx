'use client';

import { useEffect, useState } from 'react';
import {
    LiveKitRoom,
    RoomAudioRenderer,
    useRoomContext,
    useParticipants,
    useLocalParticipant,
} from '@livekit/components-react';
import '@livekit/components-styles';
import Link from 'next/link';

import ParticipantTile from '@/components/debateAgents/ParticipantTile';
import VoiceControls from '@/components/debateAgents/VoiceControls';
import TurnIndicator from '@/components/debateAgents/TurnIndicator';
import DebateHistory from '@/components/debateAgents/DebateHistory';

interface VoiceRoomProps {
    serverUrl: string;
    token: string;
    roomName: string;
    topic: string;
    agents: Array<{
        agent_id: string;
        name: string;
        role: string;
        personality: string;
    }>;
    onLeave: () => void;
}

export default function VoiceRoom({
    serverUrl,
    token,
    roomName,
    topic,
    agents,
    onLeave,
}: VoiceRoomProps) {
    const [isConnected, setIsConnected] = useState(false);

    return (
        <LiveKitRoom
            serverUrl={serverUrl}
            token={token}
            connect={true}
            audio={true}
            video={false}
            onConnected={() => setIsConnected(true)}
            onDisconnected={() => setIsConnected(false)}
            className="h-screen"
        >
            <RoomContent
                topic={topic}
                agents={agents}
                isConnected={isConnected}
                onLeave={onLeave}
            />
            <RoomAudioRenderer />
        </LiveKitRoom>
    );
}

interface RoomContentProps {
    topic: string;
    agents: Array<{
        agent_id: string;
        name: string;
        role: string;
        personality: string;
    }>;
    isConnected: boolean;
    onLeave: () => void;
}

function RoomContent({ topic, agents, isConnected, onLeave }: RoomContentProps) {
    const room = useRoomContext();
    const participants = useParticipants();
    const { localParticipant } = useLocalParticipant();

    const [currentSpeaker, setCurrentSpeaker] = useState<string | null>(null);
    const [turnStartTime, setTurnStartTime] = useState<number | null>(null);
    const [debateHistory, setDebateHistory] = useState<Array<{
        speaker: string;
        role: string;
        content: string;
        timestamp: number;
    }>>([]);

    // Track speaking participants
    useEffect(() => {
        const speakingParticipant = participants.find(p => p.isSpeaking);
        if (speakingParticipant) {
            if (currentSpeaker !== speakingParticipant.identity) {
                setCurrentSpeaker(speakingParticipant.identity);
                setTurnStartTime(Date.now());
            }
        }
    }, [participants, currentSpeaker]);

    // Capture transcriptions for debate history
    useEffect(() => {
        if (!room) return;

        let lastSegmentId = '';

        const handleTranscription = (segments: any[], participant: any) => {
            if (!participant || !segments || segments.length === 0) return;

            const finalSegments = segments.filter(s => s.final === true || s.isFinal === true);
            if (finalSegments.length === 0) return;

            const segmentId = finalSegments.map(s => s.id || s.text).join('-');
            if (segmentId === lastSegmentId) return;
            lastSegmentId = segmentId;

            const text = finalSegments.map(s => s.text).filter(Boolean).join(' ');
            if (!text.trim()) return;

            const identity = participant.identity;
            const isAgent = identity.startsWith('agent') || identity.includes('agent');

            let speakerName = 'Agent';
            let role = 'UNKNOWN';

            if (!isAgent) {
                speakerName = localParticipant?.name || 'You';
                role = 'CON';
            } else {
                const textLower = text.toLowerCase();
                if (textLower.includes("i'm morgan") || textLower.includes("i am morgan") || textLower.includes("moderator")) {
                    speakerName = 'Morgan';
                    role = 'MODERATOR';
                } else if (textLower.includes("i'm alex") || textLower.includes("i am alex")) {
                    speakerName = 'Alex';
                    role = 'PRO';
                } else if (textLower.includes("i'm maya") || textLower.includes("i am maya")) {
                    speakerName = 'Maya';
                    role = 'CON';
                } else if (textLower.includes("i'm jordan") || textLower.includes("i am jordan")) {
                    speakerName = 'Jordan';
                    role = 'PRO';
                } else if (textLower.includes("i'm riley") || textLower.includes("i am riley")) {
                    speakerName = 'Riley';
                    role = 'CON';
                }
            }

            setDebateHistory(prev => [...prev, {
                speaker: speakerName,
                role,
                content: text.trim(),
                timestamp: Date.now()
            }]);
        };

        room.on('transcriptionReceived', handleTranscription);

        return () => {
            room.off('transcriptionReceived', handleTranscription);
        };
    }, [room, localParticipant]);

    const getRole = (identity: string): string => {
        if (identity.startsWith('user_')) return localParticipant?.name?.includes('PRO') ? 'PRO' : 'CON';
        if (identity === 'moderator') return 'MODERATOR';

        const agent = agents.find(a => identity.includes(a.agent_id));
        return agent?.role || 'UNKNOWN';
    };

    const getParticipantInfo = (identity: string, participantName?: string) => {
        if (identity.startsWith('user_')) {
            return {
                name: localParticipant?.name || 'You',
                role: getRole(identity),
                isUser: true,
                personality: null,
            };
        }

        if (identity.startsWith('agent') || identity.includes('agent')) {
            const agentName = participantName || 'Agent';

            let role = 'UNKNOWN';
            if (agentName === 'Morgan') role = 'MODERATOR';
            else if (['Alex', 'Jordan'].includes(agentName)) role = 'PRO';
            else if (['Maya', 'Riley'].includes(agentName)) role = 'CON';

            return {
                name: agentName,
                role: role,
                isUser: false,
                personality: null,
            };
        }

        const agent = agents.find(a => identity.includes(a.agent_id));
        return {
            name: participantName || agent?.name || identity,
            role: agent?.role || 'UNKNOWN',
            isUser: false,
            personality: agent?.personality || null,
        };
    };

    if (!isConnected) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-muted border-t-indigo-600 rounded-full animate-spin mx-auto" />
                    <p className="mt-6 text-muted-foreground">
                        Connecting to debate room...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] grid-rows-[auto_1fr_auto] min-h-screen bg-background gap-3 p-3">
            {/* Header */}
            <header className="col-span-full flex items-center justify-between p-4 bg-card rounded-xl border shadow-sm">
                <div className="flex items-center gap-4">
                    <Link
                        href="/ai-debate"
                        className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                    </Link>
                    <div>
                        <h2 className="text-lg font-semibold text-foreground">
                            {topic}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            {participants.length} participants • Live debate
                        </p>
                    </div>
                </div>

                <TurnIndicator
                    currentSpeaker={currentSpeaker}
                    turnStartTime={turnStartTime}
                    getParticipantInfo={(identity) => {
                        const p = participants.find(x => x.identity === identity);
                        return getParticipantInfo(identity, p?.name);
                    }}
                />
            </header>

            {/* Main Participants Grid */}
            <main className="flex items-center justify-center p-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl">
                    {participants.map((participant) => {
                        const info = getParticipantInfo(participant.identity, participant.name);
                        return (
                            <ParticipantTile
                                key={participant.identity}
                                participant={participant}
                                name={info.name}
                                role={info.role}
                                personality={info.personality}
                                isUser={info.isUser}
                                isSpeaking={participant.isSpeaking}
                                isCurrentTurn={currentSpeaker === participant.identity}
                            />
                        );
                    })}
                </div>
            </main>

            {/* Debate History Sidebar */}
            <aside className="row-span-2 bg-card rounded-xl overflow-hidden flex flex-col border shadow-sm hidden lg:flex">
                <DebateHistory history={debateHistory} />
            </aside>

            {/* Voice Controls */}
            <footer className="flex justify-center py-2">
                <VoiceControls onLeave={onLeave} />
            </footer>
        </div>
    );
}
