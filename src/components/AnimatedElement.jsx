'use client'

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const AnimatedElement = ({ children, animation, delay = 0 }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;

    // Asegúrate de que el elemento tiene la clase `hidden` al renderizar
    element.classList.add('hidden');

    if (animation) {
      // Utiliza GSAP para quitar la clase `hidden` y aplicar la animación
      gsap.fromTo(
        element,
        { opacity: 0 },
        { ...animation, opacity: 1, delay,
          onStart: () => {
            element.classList.remove('hidden');
          }
        }
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