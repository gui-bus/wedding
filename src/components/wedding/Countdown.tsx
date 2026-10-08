"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CountdownProps {
  targetDateISO: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export function Countdown({ targetDateISO }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {

    const calculateTime = () => {
      const difference = +new Date(targetDateISO) - +new Date();
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isPast: false,
      });
    };
    const initialTick = setTimeout(() => { setMounted(true); calculateTime(); }, 0);
    const interval = setInterval(calculateTime, 1000);
    return () => { clearTimeout(initialTick); clearInterval(interval); };
  }, [targetDateISO]);

  if (!mounted) return null;

  if (timeLeft.isPast) {
    return (
      <div className="inline-flex items-center gap-3 py-2 text-white font-serif text-xl sm:text-2xl tracking-widest uppercase">
        <span>Hoje é o nosso grande dia</span>
      </div>
    );
  }

  const units = [
    { label: "DIAS", value: timeLeft.days },
    { label: "HORAS", value: timeLeft.hours },
    { label: "MIN", value: timeLeft.minutes },
    { label: "SEG", value: timeLeft.seconds },
  ];

  return (
    <div className="inline-flex items-baseline justify-center gap-4 sm:gap-8 md:gap-12 select-none">
      {units.map((unit, index) => (
        <div key={unit.label} className="flex items-baseline gap-4 sm:gap-8 md:gap-12">
          <div className="flex flex-col items-center">
            <motion.span
              key={unit.value}
              initial={{ opacity: 0.7, y: 2 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-white tracking-tight tabular-nums"
            >
              {unit.value.toString().padStart(2, "0")}
            </motion.span>
            <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.3em] text-white uppercase mt-1">
              {unit.label}
            </span>
          </div>
          {index < units.length - 1 && (
            <span className="font-serif text-2xl sm:text-3xl text-white/60 font-light select-none">
              /
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
