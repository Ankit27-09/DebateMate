'use client';

import { useEffect, useState } from 'react';

interface TurnIndicatorProps {
    currentSpeaker: string | null;
    turnStartTime: number | null;
    getParticipantInfo: (identity: string) => {
        name: string;
        role: string;
        isUser: boolean;
        personality: string | null;
    };
}

export default function TurnIndicator({
    currentSpeaker,
    turnStartTime,
    getParticipantInfo,
}: TurnIndicatorProps) {
    const [elapsed, setElapsed] = useState(0);

    // Update elapsed time every second
    useEffect(() => {
        if (!turnStartTime) {
            setElapsed(0);
            return;
        }

        const interval = setInterval(() => {
            setElapsed(Math.floor((Date.now() - turnStartTime) / 1000));
        }, 1000);

        return () => clearInterval(interval);
    }, [turnStartTime]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const speakerInfo = currentSpeaker
        ? getParticipantInfo(currentSpeaker)
        : null;

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'PRO': return 'text-green-500 bg-green-100 dark:bg-green-900/30';
            case 'CON': return 'text-red-500 bg-red-100 dark:bg-red-900/30';
            case 'MODERATOR': return 'text-purple-500 bg-purple-100 dark:bg-purple-900/30';
            default: return 'text-indigo-500 bg-indigo-100 dark:bg-indigo-900/30';
        }
    };

    if (!currentSpeaker || !speakerInfo) {
        return (
            <div className="px-4 py-2 rounded-full bg-muted text-muted-foreground text-sm">
                Live Debate
            </div>
        );
    }

    const roleColorClass = getRoleColor(speakerInfo.role);

    return (
        <div className="flex items-center gap-3">
            {/* Speaking Indicator */}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${roleColorClass}`}>
                <div className={`w-2 h-2 rounded-full bg-current animate-pulse`} />
                <span className="font-medium text-sm">
                    {speakerInfo.name}
                </span>
                <span className="text-xs opacity-75">
                    ({speakerInfo.role})
                </span>
            </div>

            {/* Timer */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-foreground font-mono text-sm font-semibold">
                <span>⏱️</span>
                <span>{formatTime(elapsed)}</span>
            </div>
        </div>
    );
}
