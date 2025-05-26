import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export type RoundConfig = {
  name: string;
  durationSeconds: number;
};

export type TimerConfig = {
  enabled: boolean;
  rounds: RoundConfig[];
  soundAlerts: boolean;
  autoSubmit: boolean;
};

const presetFormats = {
  standard: [
    { name: "Opening Statement", durationSeconds: 120 },
    { name: "Rebuttal", durationSeconds: 180 },
    { name: "Cross-Examination", durationSeconds: 120 },
    { name: "Closing Statement", durationSeconds: 60 },
  ],
  quick: [
    { name: "Opening", durationSeconds: 60 },
    { name: "Rebuttal", durationSeconds: 90 },
    { name: "Closing", durationSeconds: 30 },
  ],
  extended: [
    { name: "Opening Statement", durationSeconds: 180 },
    { name: "First Rebuttal", durationSeconds: 240 },
    { name: "Second Rebuttal", durationSeconds: 180 },
    { name: "Cross-Examination", durationSeconds: 150 },
    { name: "Closing Statement", durationSeconds: 120 },
  ],
};

interface TimerSettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  config: TimerConfig;
  onSave: (config: TimerConfig) => void;
}

export default function TimerSettings({
  open,
  onOpenChange,
  config,
  onSave,
}: TimerSettingsProps) {
  const [currentConfig, setCurrentConfig] = useState<TimerConfig>({
    ...config,
  });
  const [selectedPreset, setSelectedPreset] = useState<string>("custom");

  const handlePresetChange = (value: string) => {
    setSelectedPreset(value);
    if (value !== "custom") {
      setCurrentConfig({
        ...currentConfig,
        rounds: [...presetFormats[value as keyof typeof presetFormats]],
      });
    }
  };

  const updateRoundDuration = (index: number, durationSeconds: number) => {
    const updatedRounds = [...currentConfig.rounds];
    updatedRounds[index] = {
      ...updatedRounds[index],
      durationSeconds,
    };
    setCurrentConfig({ ...currentConfig, rounds: updatedRounds });
    setSelectedPreset("custom");
  };

  const updateRoundName = (index: number, name: string) => {
    const updatedRounds = [...currentConfig.rounds];
    updatedRounds[index] = {
      ...updatedRounds[index],
      name,
    };
    setCurrentConfig({ ...currentConfig, rounds: updatedRounds });
    setSelectedPreset("custom");
  };

  const addRound = () => {
    const updatedRounds = [
      ...currentConfig.rounds,
      { name: "New Round", durationSeconds: 120 },
    ];
    setCurrentConfig({ ...currentConfig, rounds: updatedRounds });
    setSelectedPreset("custom");
  };

  const removeRound = (index: number) => {
    const updatedRounds = currentConfig.rounds.filter((_, i) => i !== index);
    setCurrentConfig({ ...currentConfig, rounds: updatedRounds });
    setSelectedPreset("custom");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Timed Debate Settings</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="timer-enabled">Enable Timer</Label>
            <Switch
              id="timer-enabled"
              checked={currentConfig.enabled}
              onCheckedChange={(checked) =>
                setCurrentConfig({ ...currentConfig, enabled: checked })
              }
            />
          </div>

          {currentConfig.enabled && (
            <>
              <div className="space-y-2">
                <Label>Debate Format</Label>
                <Select
                  value={selectedPreset}
                  onValueChange={handlePresetChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard Format</SelectItem>
                    <SelectItem value="quick">Quick Debate</SelectItem>
                    <SelectItem value="extended">Extended Format</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label>Rounds Configuration</Label>
                {currentConfig.rounds.map((round, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-8 gap-2 items-center"
                  >
                    <div className="col-span-3">
                      <Input
                        value={round.name}
                        onChange={(e) => updateRoundName(index, e.target.value)}
                        placeholder="Round name"
                      />
                    </div>
                    <div className="col-span-3 flex items-center gap-2">
                      <Input
                        type="number"
                        value={round.durationSeconds}
                        onChange={(e) =>
                          updateRoundDuration(index, parseInt(e.target.value))
                        }
                        min={10}
                        step={10}
                      />
                      <span className="text-sm">sec</span>
                    </div>
                    <Button
                      variant="destructive"
                      className="col-span-2"
                      onClick={() => removeRound(index)}
                      disabled={currentConfig.rounds.length <= 1}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button variant="outline" onClick={addRound} className="w-full">
                  Add Round
                </Button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="sound-alerts">Sound Alerts</Label>
                  <Switch
                    id="sound-alerts"
                    checked={currentConfig.soundAlerts}
                    onCheckedChange={(checked) =>
                      setCurrentConfig({
                        ...currentConfig,
                        soundAlerts: checked,
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-submit">
                    Auto-Submit When Time Expires
                  </Label>
                  <Switch
                    id="auto-submit"
                    checked={currentConfig.autoSubmit}
                    onCheckedChange={(checked) =>
                      setCurrentConfig({
                        ...currentConfig,
                        autoSubmit: checked,
                      })
                    }
                  />
                </div>
              </div>
            </>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onSave(currentConfig);
              onOpenChange(false);
            }}
          >
            Save Settings
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
