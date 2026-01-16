'use client';

import { useRef, useEffect } from 'react';

interface DebateHistoryProps {
    history: Array<{
        speaker: string;
        role: string;
        content: string;
        timestamp: number;
    }>;
}

export default function DebateHistory({ history }: DebateHistoryProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom on new messages
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const getRoleStyle = (role: string) => {
        switch (role) {
            case 'PRO':
                return {
                    bg: 'bg-green-50 dark:bg-green-900/20',
                    border: 'border-l-green-500',
                    label: 'text-green-600 dark:text-green-400',
                };
            case 'CON':
                return {
                    bg: 'bg-red-50 dark:bg-red-900/20',
                    border: 'border-l-red-500',
                    label: 'text-red-600 dark:text-red-400',
                };
            case 'MODERATOR':
                return {
                    bg: 'bg-purple-50 dark:bg-purple-900/20',
                    border: 'border-l-purple-500',
                    label: 'text-purple-600 dark:text-purple-400',
                };
            default:
                return {
                    bg: 'bg-blue-50 dark:bg-blue-900/20',
                    border: 'border-l-blue-500',
                    label: 'text-blue-600 dark:text-blue-400',
                };
        }
    };

    const formatTime = (timestamp: number) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-base font-semibold text-foreground">
                    📜 Debate History
                </h3>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                    {history.length} turns
                </span>
            </div>

            {/* History List */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-3"
            >
                {history.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                        <span className="text-3xl block mb-2">🎙️</span>
                        <p className="text-sm">
                            The debate transcript will appear here as participants speak.
                        </p>
                    </div>
                ) : (
                    history.map((entry, index) => {
                        const style = getRoleStyle(entry.role);
                        return (
                            <div
                                key={index}
                                className={`p-3 rounded-lg border-l-4 ${style.bg} ${style.border} animate-in slide-in-from-bottom-2 duration-300`}
                            >
                                {/* Header */}
                                <div className="flex justify-between items-center mb-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-semibold text-foreground">
                                            {entry.speaker}
                                        </span>
                                        <span className={`text-xs font-medium ${style.label}`}>
                                            {entry.role}
                                        </span>
                                    </div>
                                    <span className="text-xs text-muted-foreground">
                                        {formatTime(entry.timestamp)}
                                    </span>
                                </div>

                                {/* Content */}
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {entry.content}
                                </p>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Summary Stats */}
            {history.length > 0 && (
                <div className="flex justify-around p-3 border-t text-xs">
                    <div className="text-center">
                        <span className="text-green-600 dark:text-green-400 font-semibold">
                            {history.filter(h => h.role === 'PRO').length}
                        </span>
                        <span className="text-muted-foreground ml-1">PRO</span>
                    </div>
                    <div className="text-center">
                        <span className="text-red-600 dark:text-red-400 font-semibold">
                            {history.filter(h => h.role === 'CON').length}
                        </span>
                        <span className="text-muted-foreground ml-1">CON</span>
                    </div>
                </div>
            )}
        </div>
    );
}
