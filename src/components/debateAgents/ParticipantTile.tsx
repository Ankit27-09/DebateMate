'use client';

import { Participant } from 'livekit-client';

interface ParticipantTileProps {
    participant: Participant;
    name: string;
    role: string;
    personality: string | null;
    isUser: boolean;
    isSpeaking: boolean;
    isCurrentTurn: boolean;
}

export default function ParticipantTile({
    participant,
    name,
    role,
    personality,
    isUser,
    isSpeaking,
    isCurrentTurn,
}: ParticipantTileProps) {
    const getRoleStyles = () => {
        switch (role) {
            case 'PRO':
                return {
                    gradient: 'from-green-500 to-green-600',
                    color: 'text-green-500',
                    bgTint: 'bg-green-50 dark:bg-green-900/20',
                    borderColor: 'border-green-500',
                };
            case 'CON':
                return {
                    gradient: 'from-red-500 to-red-600',
                    color: 'text-red-500',
                    bgTint: 'bg-red-50 dark:bg-red-900/20',
                    borderColor: 'border-red-500',
                };
            case 'MODERATOR':
                return {
                    gradient: 'from-purple-500 to-indigo-600',
                    color: 'text-purple-500',
                    bgTint: 'bg-purple-50 dark:bg-purple-900/20',
                    borderColor: 'border-purple-500',
                };
            default:
                return {
                    gradient: 'from-indigo-600 to-indigo-700',
                    color: 'text-indigo-600',
                    bgTint: 'bg-indigo-50 dark:bg-indigo-900/20',
                    borderColor: 'border-indigo-500',
                };
        }
    };

    const styles = getRoleStyles();
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

    return (
        <div
            className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all relative
                ${isCurrentTurn
                    ? `${styles.bgTint} ${styles.borderColor} shadow-lg`
                    : 'bg-card border-border hover:border-muted-foreground'
                }`}
        >
            {/* Speaking Badge */}
            {isCurrentTurn && (
                <div className={`absolute -top-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${styles.gradient}`}>
                    Speaking
                </div>
            )}

            {/* Avatar */}
            <div className={`relative w-14 h-14 rounded-full bg-gradient-to-br ${styles.gradient} flex items-center justify-center text-white text-lg font-semibold mb-2`}>
                {isUser ? '👤' : initials}

                {isSpeaking && (
                    <div className={`absolute -inset-1 rounded-full border-2 ${styles.borderColor} animate-ping opacity-50`} />
                )}
            </div>

            {/* Name */}
            <div className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                {name}
                {isUser && (
                    <span className="text-[10px] bg-foreground text-background px-1.5 py-0.5 rounded-full">
                        YOU
                    </span>
                )}
            </div>

            {/* Role */}
            <div className="flex items-center gap-1 mt-1">
                <span className={`w-1.5 h-1.5 rounded-full ${styles.color.replace('text-', 'bg-')}`} />
                <span className={`text-xs font-medium ${styles.color}`}>
                    {role}
                </span>
            </div>

            {/* Audio Bars */}
            {isSpeaking && (
                <div className="flex gap-0.5 mt-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div
                            key={i}
                            className={`w-1 rounded-sm ${styles.color.replace('text-', 'bg-')} animate-pulse`}
                            style={{
                                height: `${8 + i * 3}px`,
                                animationDelay: `${i * 0.1}s`,
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
