'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import VoiceRoom from '@/components/debateAgents/VoiceRoom';

interface RoomData {
    debateId: string;
    roomName: string;
    userToken: string;
    topic: string;
    agents: Array<{
        agent_id: string;
        name: string;
        role: string;
        personality: string;
    }>;
}

export default function AIDebateRoomPage() {
    const router = useRouter();
    const params = useParams();
    const [roomData, setRoomData] = useState<RoomData | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Load room data from sessionStorage
    useEffect(() => {
        try {
            const stored = sessionStorage.getItem('debateRoom');
            if (!stored) {
                setError('No room data found. Please start a new debate.');
                return;
            }

            const data = JSON.parse(stored) as RoomData;

            // Verify the room ID matches
            if (data.debateId !== params.roomId) {
                setError('Room ID mismatch. Please start a new debate.');
                return;
            }

            setRoomData(data);
        } catch (err) {
            console.error('Error loading room data:', err);
            setError('Failed to load room data.');
        }
    }, [params.roomId]);

    const handleLeave = () => {
        // Clear room data
        sessionStorage.removeItem('debateRoom');

        // Navigate back to AI Debate page
        router.push('/ai-debate');
    };

    // Error state
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-background p-8">
                <div className="bg-card rounded-2xl shadow-xl border p-8 max-w-md text-center">
                    <div className="text-5xl mb-4">😕</div>
                    <h2 className="text-xl font-semibold mb-4">Oops!</h2>
                    <p className="text-muted-foreground mb-6">{error}</p>
                    <button
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                        onClick={() => router.push('/ai-debate')}
                    >
                        Start New Debate
                    </button>
                </div>
            </div>
        );
    }

    // Loading state
    if (!roomData) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-background">
                <div className="w-12 h-12 border-4 border-muted border-t-indigo-600 rounded-full animate-spin" />
                <p className="mt-6 text-muted-foreground">Loading debate room...</p>
            </div>
        );
    }

    // Get LiveKit server URL
    const livekitUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL || '';

    if (!livekitUrl) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-background p-8">
                <div className="bg-card rounded-2xl shadow-xl border p-8 max-w-lg text-center">
                    <div className="text-5xl mb-4">⚠️</div>
                    <h2 className="text-xl font-semibold mb-4">Configuration Required</h2>
                    <p className="text-muted-foreground mb-6">
                        LiveKit server URL is not configured. Please set the{' '}
                        <code className="bg-muted px-2 py-1 rounded text-sm">
                            NEXT_PUBLIC_LIVEKIT_URL
                        </code>{' '}
                        environment variable.
                    </p>
                    <button
                        className="border border-muted-foreground/30 hover:bg-muted px-6 py-3 rounded-lg font-medium transition-colors"
                        onClick={() => router.push('/ai-debate')}
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <VoiceRoom
            serverUrl={livekitUrl}
            token={roomData.userToken}
            roomName={roomData.roomName}
            topic={roomData.topic}
            agents={roomData.agents}
            onLeave={handleLeave}
        />
    );
}
