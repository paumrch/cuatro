'use client'

import React from "react";
import AnimatedElement from "../AnimatedElement";

const AnimatedVideo = () => {
  return (
    <AnimatedElement animation={{ duration: 0.7 }} delay={1}>
      <video
        width="1920"
        height="1080"
        muted
        autoPlay
        playsInline
        loop
        preload="auto"
      >
        <source src="/cuatro.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </AnimatedElement>
  );
};

export default AnimatedVideo;
