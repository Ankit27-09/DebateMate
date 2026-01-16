'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DebateConfig from '@/components/debateAgents/DebateConfig';
import Navbar from '@/components/navbar';

export default function AIDebatePage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleStartDebate = async (config: {
        topic: string;
        numAgents: number;
        userRole: string | null;
        difficulty: string;
        userName: string;
    }) => {
        setIsLoading(true);
        setError(null);

        try {
            const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

            const response = await fetch(`${BACKEND_URL}/api/rooms/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    topic: config.topic,
                    num_agents: config.numAgents,
                    user_role: config.userRole,
                    user_name: config.userName,
                    difficulty: config.difficulty,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create debate room');
            }

            const data = await response.json();

            sessionStorage.setItem('debateRoom', JSON.stringify({
                debateId: data.debate_id,
                roomName: data.room_name,
                userToken: data.user_token,
                topic: data.topic,
                agents: data.agents,
            }));

            router.push(`/ai-debate/room/${data.debate_id}`);

        } catch (err) {
            console.error('Error starting debate:', err);
            setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <main className="flex-1 pt-24 pb-16 px-4">
                <section className="container mx-auto max-w-3xl">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                            AI Voice Debate
                        </h1>
                        <p className="text-muted-foreground max-w-xl mx-auto">
                            Practice your debate skills with AI-powered debaters in real-time voice conversations.
                        </p>
                    </div>

                    {/* Configuration Card */}
                    <div className="bg-card rounded-xl border p-6 md:p-8">
                        <h2 className="text-xl font-semibold text-center mb-6">
                            Configure Your Debate
                        </h2>

                        {error && (
                            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6 text-center">
                                <p className="text-destructive text-sm">{error}</p>
                            </div>
                        )}

                        <DebateConfig
                            onStart={handleStartDebate}
                            isLoading={isLoading}
                        />
                    </div>
                </section>
            </main>
        </div>
    );
}
