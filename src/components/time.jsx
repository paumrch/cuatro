"use client";

import { useState, useEffect } from "react";

const timeFormatter = new Intl.DateTimeFormat("es-ES", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

export default function Time() {
  const [showTimer, setShowTimer] = useState(false);
  const [currentTime, setCurrentTime] = useState(() =>
    timeFormatter.format(new Date())
  );

  useEffect(() => {
    setShowTimer(true);

    const interval = setInterval(() => {
      setCurrentTime(timeFormatter.format(new Date()));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <p suppressHydrationWarning>
      {showTimer ? currentTime : null}
    </p>
  );
}
