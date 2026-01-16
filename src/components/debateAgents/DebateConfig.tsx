'use client';

import { useState } from 'react';

interface DebateConfigProps {
    onStart: (config: {
        topic: string;
        numAgents: number;
        userRole: string | null;
        difficulty: string;
        userName: string;
    }) => void;
    isLoading: boolean;
}

const SAMPLE_TOPICS = [
    "Is artificial intelligence beneficial for humanity?",
    "Should remote work become the standard?",
    "Is social media doing more harm than good?",
    "Should college education be free for everyone?",
    "Is climate change the most important issue of our time?",
];

export default function DebateConfig({ onStart, isLoading }: DebateConfigProps) {
    const [topic, setTopic] = useState('');
    const [numAgents, setNumAgents] = useState(4);
    const [userRole, setUserRole] = useState<string | null>('PRO');
    const [difficulty, setDifficulty] = useState('beginner');
    const [userName, setUserName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!topic.trim()) {
            return;
        }

        onStart({
            topic: topic.trim(),
            numAgents,
            userRole,
            difficulty,
            userName: userName.trim() || 'Debater',
        });
    };

    const selectRandomTopic = () => {
        const randomTopic = SAMPLE_TOPICS[Math.floor(Math.random() * SAMPLE_TOPICS.length)];
        setTopic(randomTopic);
    };

    const proAgents = userRole === 'PRO'
        ? Math.floor((numAgents - 1) / 2)
        : userRole === 'CON'
            ? Math.ceil(numAgents / 2)
            : Math.ceil(numAgents / 2);

    const conAgents = numAgents - proAgents;

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Topic Input */}
            <div>
                <label className="block text-sm font-medium mb-2" htmlFor="topic">
                    Debate Topic
                </label>
                <div className="relative">
                    <textarea
                        id="topic"
                        className="w-full px-4 py-3 pr-24 border border-border rounded-lg bg-background focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-y min-h-[80px]"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="Enter your debate topic... (e.g., 'Is war a good thing or a curse?')"
                        rows={3}
                        required
                    />
                    <button
                        type="button"
                        onClick={selectRandomTopic}
                        className="absolute right-2 top-2 px-3 py-1.5 text-xs font-medium border border-border rounded-md hover:bg-muted transition-colors"
                    >
                        🎲 Random
                    </button>
                </div>
            </div>

            {/* Your Name */}
            <div>
                <label className="block text-sm font-medium mb-2" htmlFor="userName">
                    Your Name (optional)
                </label>
                <input
                    id="userName"
                    type="text"
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your name..."
                />
            </div>

            {/* Number of Agents Slider */}
            <div>
                <label className="block text-sm font-medium mb-2">
                    Number of AI Agents: <strong className="text-indigo-600">{numAgents}</strong>
                </label>
                <input
                    type="range"
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    min={2}
                    max={6}
                    value={numAgents}
                    onChange={(e) => setNumAgents(Number(e.target.value))}
                />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                    <span>2 agents</span>
                    <span>6 agents</span>
                </div>

                {/* Agent Distribution Preview */}
                <div className="flex justify-center gap-6 mt-4">
                    <div className="flex items-center gap-1.5">
                        <span className="text-green-500">●</span>
                        <span className="text-sm">
                            {userRole === 'PRO' ? proAgents + 1 : proAgents} PRO
                            {userRole === 'PRO' && ' (incl. you)'}
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="text-red-500">●</span>
                        <span className="text-sm">
                            {userRole === 'CON' ? conAgents + 1 : conAgents} CON
                            {userRole === 'CON' && ' (incl. you)'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Role Selection */}
            <div>
                <label className="block text-sm font-medium mb-2">Your Role</label>
                <div className="grid grid-cols-3 gap-3">
                    <button
                        type="button"
                        className={`p-4 rounded-xl border-2 text-center transition-all ${userRole === 'PRO'
                                ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                                : 'border-border hover:border-muted-foreground'
                            }`}
                        onClick={() => setUserRole('PRO')}
                    >
                        <div className="text-2xl mb-1">👍</div>
                        <div className="font-semibold">PRO</div>
                        <div className="text-xs text-muted-foreground">Support the topic</div>
                    </button>

                    <button
                        type="button"
                        className={`p-4 rounded-xl border-2 text-center transition-all ${userRole === 'CON'
                                ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                                : 'border-border hover:border-muted-foreground'
                            }`}
                        onClick={() => setUserRole('CON')}
                    >
                        <div className="text-2xl mb-1">👎</div>
                        <div className="font-semibold">CON</div>
                        <div className="text-xs text-muted-foreground">Oppose the topic</div>
                    </button>

                    <button
                        type="button"
                        className={`p-4 rounded-xl border-2 text-center transition-all ${userRole === null
                                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                                : 'border-border hover:border-muted-foreground'
                            }`}
                        onClick={() => setUserRole(null)}
                    >
                        <div className="text-2xl mb-1">👀</div>
                        <div className="font-semibold">Observer</div>
                        <div className="text-xs text-muted-foreground">Watch & learn</div>
                    </button>
                </div>
            </div>

            {/* Difficulty Selection */}
            <div>
                <label className="block text-sm font-medium mb-2">Difficulty Level</label>
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { value: 'beginner', label: '🌱 Beginner', desc: 'More support & encouragement' },
                        { value: 'intermediate', label: '🌿 Intermediate', desc: 'Standard debating' },
                        { value: 'advanced', label: '🌳 Advanced', desc: 'Challenging opponents' },
                    ].map((level) => (
                        <button
                            key={level.value}
                            type="button"
                            onClick={() => setDifficulty(level.value)}
                            className={`p-4 rounded-xl border-2 text-center transition-all ${difficulty === level.value
                                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                                    : 'border-border hover:border-muted-foreground'
                                }`}
                        >
                            <div className="font-medium">{level.label}</div>
                            <div className="text-xs text-muted-foreground mt-1">{level.desc}</div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-muted disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
                disabled={isLoading || !topic.trim()}
            >
                {isLoading ? (
                    <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Creating Room...
                    </>
                ) : (
                    <>🎙️ Start Debate</>
                )}
            </button>

            {/* Encouragement Message */}
            {userRole !== null && (
                <p className="text-center text-sm text-muted-foreground">
                    💚 Don&apos;t worry — the AI will be supportive and encouraging!
                </p>
            )}
        </form>
    );
}
