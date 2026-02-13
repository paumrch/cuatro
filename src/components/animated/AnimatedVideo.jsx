'use client'

import React, { useEffect, useState } from "react";

const AnimatedVideo = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setPrefersReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  return (
    <video
      width="1920"
      height="1080"
      muted
      autoPlay={!prefersReducedMotion}
      playsInline
      loop
      preload="metadata"
    >
      <source src="/cuatro.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default AnimatedVideo;
