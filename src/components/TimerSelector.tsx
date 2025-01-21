import React from 'react';
import { cn } from "@/lib/utils";

interface TimerSelectorProps {
  selectedTime: number;
  onTimeSelect: (time: number) => void;
}

const TimerSelector: React.FC<TimerSelectorProps> = ({ selectedTime, onTimeSelect }) => {
  const times = [1, 2, 5];

  return (
    <div className="flex gap-4 justify-center mb-8">
      {times.map((time) => (
        <button
          key={time}
          onClick={() => onTimeSelect(time)}
          className={cn(
            "timer-button",
            selectedTime === time && "active"
          )}
        >
          {time} min
        </button>
      ))}
    </div>
  );
};

export default TimerSelector;