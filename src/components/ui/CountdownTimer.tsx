import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Clock, Pause, Play, SkipForward } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { RoundConfig } from "./TimerSettings";

interface CountdownTimerProps {
  rounds: RoundConfig[];
  currentRoundIndex: number;
  setCurrentRoundIndex: (index: number) => void;
  soundAlerts: boolean;
  autoSubmit: boolean;
  onTimeExpired: () => void;
  onDismiss: () => void;
}

export default function CountdownTimer({
  rounds,
  currentRoundIndex,
  setCurrentRoundIndex,
  soundAlerts,
  autoSubmit,
  onTimeExpired,
  onDismiss,
}: CountdownTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(
    rounds[currentRoundIndex]?.durationSeconds || 0
  );
  const [isRunning, setIsRunning] = useState(false);
  const [showTimer, setShowTimer] = useState(true);

  // Audio references
  const alertSound30Ref = useRef<HTMLAudioElement | null>(null);
  const alertSound15Ref = useRef<HTMLAudioElement | null>(null);
  const alertSound5Ref = useRef<HTMLAudioElement | null>(null);
  const alertSoundEndRef = useRef<HTMLAudioElement | null>(null);

  // Create audio elements on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      alertSound30Ref.current = new Audio("/sounds/alert-30sec.mp3");
      alertSound15Ref.current = new Audio("/sounds/alert-15sec.mp3");
      alertSound5Ref.current = new Audio("/sounds/alert-5sec.mp3");
      alertSoundEndRef.current = new Audio("/sounds/alert-end.mp3");

      // Set volume
      [
        alertSound30Ref,
        alertSound15Ref,
        alertSound5Ref,
        alertSoundEndRef,
      ].forEach((ref) => {
        if (ref.current) ref.current.volume = 0.5;
      });
    }

    return () => {
      // Clean up audio
      [
        alertSound30Ref,
        alertSound15Ref,
        alertSound5Ref,
        alertSoundEndRef,
      ].forEach((ref) => {
        if (ref.current) ref.current.pause();
      });
    };
  }, []);

  // Reset timer when round changes
  useEffect(() => {
    setTimeRemaining(rounds[currentRoundIndex]?.durationSeconds || 0);
    setIsRunning(true);
  }, [currentRoundIndex, rounds]);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          const newTime = prev - 1;

          // Play alert sounds if enabled
          if (soundAlerts) {
            if (newTime === 30) alertSound30Ref.current?.play();
            if (newTime === 15) alertSound15Ref.current?.play();
            if (newTime === 5) alertSound5Ref.current?.play();
            if (newTime === 0) alertSoundEndRef.current?.play();
          }

          return newTime;
        });
      }, 1000);
    } else if (timeRemaining === 0 && isRunning) {
      // Time expired for the current round
      setIsRunning(false);

      if (currentRoundIndex < rounds.length - 1) {
        // Move to next round after a brief pause
        setTimeout(() => {
          setCurrentRoundIndex(currentRoundIndex + 1);
        }, 1500);
      } else {
        // End of all rounds
        if (autoSubmit) {
          onTimeExpired();
        }
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [
    isRunning,
    timeRemaining,
    currentRoundIndex,
    rounds.length,
    setCurrentRoundIndex,
    soundAlerts,
    autoSubmit,
    onTimeExpired,
  ]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getTimerColor = () => {
    if (timeRemaining <= 5) return "text-red-500";
    if (timeRemaining <= 15) return "text-orange-500";
    if (timeRemaining <= 30) return "text-amber-400";
    return "text-green-500";
  };

  const getProgressPercent = () => {
    const totalSeconds = rounds[currentRoundIndex]?.durationSeconds || 1;
    return (timeRemaining / totalSeconds) * 100;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const skipToNextRound = () => {
    if (currentRoundIndex < rounds.length - 1) {
      setCurrentRoundIndex(currentRoundIndex + 1);
    }
  };

  const toggleTimerDisplay = () => {
    setShowTimer(!showTimer);
  };

  if (!showTimer) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="fixed bottom-20 right-4 z-20 opacity-60 hover:opacity-100"
        onClick={toggleTimerDisplay}
      >
        <Clock className="h-4 w-4 mr-1" />
        Show Timer
      </Button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-20 right-4 z-20 w-64 rounded-lg border bg-card p-4 shadow-lg"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium">
          {rounds[currentRoundIndex]?.name || "Round"}
        </h3>
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" onClick={toggleTimerDisplay}>
            <Clock className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onDismiss}>
            ✕
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className={`text-3xl font-bold ${getTimerColor()}`}>
          {formatTime(timeRemaining)}
        </div>

        <div className="w-full mt-2 bg-muted rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: "100%" }}
            animate={{ width: `${getProgressPercent()}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="flex justify-between w-full mt-4">
          <Button size="sm" onClick={toggleTimer}>
            {isRunning ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
            {isRunning ? "Pause" : "Resume"}
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={skipToNextRound}
            disabled={currentRoundIndex >= rounds.length - 1}
          >
            <SkipForward className="h-4 w-4 mr-1" />
            Next
          </Button>
        </div>

        <div className="w-full mt-3 text-center text-xs text-muted-foreground">
          Round {currentRoundIndex + 1} of {rounds.length}
        </div>
      </div>
    </motion.div>
  );
}
