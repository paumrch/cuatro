"use client";
import { useEffect, useRef } from "react";
import { useLenis } from "@studio-freight/react-lenis";

function HorizontalSmoothScrolling({ children }) {
  const containerRef = useRef(null);
  const lenis = useLenis();

  useEffect(() => {
    if (lenis && containerRef.current) {
      lenis.on("scroll", ({ scroll, limit, velocity, direction }) => {
        // Custom horizontal scroll logic
        const container = containerRef.current;
        container.scrollLeft += velocity * 0.1;
      });
    }

    return () => {
      if (lenis) {
        lenis.off("scroll");
      }
    };
  }, [lenis]);

  return (
    <div ref={containerRef} className="horizontal-scroll-container">
      {children}
    </div>
  );
}

export default HorizontalSmoothScrolling;