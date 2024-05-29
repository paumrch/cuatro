'use client'

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const AnimatedElement = ({ children, animation, delay = 0 }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;

    gsap.set(element, { opacity: 0, visibility: 'hidden' });

    if (animation) {
      gsap.fromTo(
        element,
        { opacity: 0, visibility: 'visible' },
        { ...animation, opacity: 1, delay }
      );
    }
  }, [animation, delay]);

  return (
    <div ref={elementRef}>
      {children}
    </div>
  );
};

export default AnimatedElement;

