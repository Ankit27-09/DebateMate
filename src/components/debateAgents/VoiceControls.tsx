'use client';

import { useLocalParticipant, useRoomContext } from '@livekit/components-react';
import { useState } from 'react';

interface VoiceControlsProps {
    onLeave: () => void;
}

export default function VoiceControls({ onLeave }: VoiceControlsProps) {
    const { localParticipant } = useLocalParticipant();
    const room = useRoomContext();
    const [isLeavingConfirm, setIsLeavingConfirm] = useState(false);

    const isMuted = !localParticipant?.isMicrophoneEnabled;

    const toggleMute = async () => {
        if (localParticipant) {
            await localParticipant.setMicrophoneEnabled(isMuted);
        }
    };

    const handleLeave = () => {
        if (isLeavingConfirm) {
            room?.disconnect();
            onLeave();
        } else {
            setIsLeavingConfirm(true);
            setTimeout(() => setIsLeavingConfirm(false), 3000);
        }
    };

    return (
        <div className="flex items-center justify-center gap-4 px-6 py-3 bg-card rounded-full shadow-lg border">
            {/* Mute Button */}
            <button
                onClick={toggleMute}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all
                    ${isMuted
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-muted text-foreground hover:bg-muted/80'
                    }`}
                title={isMuted ? 'Unmute' : 'Mute'}
            >
                {isMuted ? '🔇' : '🎤'}
            </button>

            {/* Main Status Indicator */}
            <div className="flex flex-col items-center gap-1">
                <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all
                        ${isMuted
                            ? 'bg-muted text-muted-foreground'
                            : 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30'
                        }`}
                >
                    {!isMuted ? '🗣️' : '🔈'}
                </div>
                <span className={`text-xs font-medium ${isMuted ? 'text-muted-foreground' : 'text-green-500'}`}>
                    {isMuted ? 'Muted' : 'Live'}
                </span>
            </div>

            {/* Pause Button */}
            <button
                className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center text-xl hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-all"
                title="Request Break"
            >
                ⏸️
            </button>

            {/* Leave Button */}
            <button
                onClick={handleLeave}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all
                    ${isLeavingConfirm
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-500 hover:bg-red-200 dark:hover:bg-red-900/50'
                    }`}
                title={isLeavingConfirm ? 'Click again to confirm' : 'Leave Debate'}
            >
                {isLeavingConfirm ? '✓' : '🚪'}
            </button>

            {/* Mic Level Indicator */}
            {!isMuted && (
                <div className="flex items-end gap-0.5 h-6">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div
                            key={i}
                            className="w-1 bg-green-500 rounded-sm animate-pulse"
                            style={{
                                height: `${i * 4}px`,
                                animationDelay: `${i * 0.1}s`,
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
