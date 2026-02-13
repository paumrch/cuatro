"use client";

import { gsap } from "gsap";
import { useState, useEffect } from "react";

import Image from "next/image";
import Time from "./time";

import Link from "next/link";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timeout = setTimeout(() => {
      setIsVisible(true);
      if (!prefersReducedMotion) {
        gsap.fromTo(
          ".animated-component",
          { opacity: 0 },
          { opacity: 1, duration: 1, ease: "power2.out" }
        );
      }
    }, prefersReducedMotion ? 0 : 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <header className="">
      <nav className="mx-auto flex items-center justify-between p-6">
        <Link href="/" className="-m-1.5 p-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-600 focus-visible:ring-offset-2 rounded-sm">
          <span className="sr-only">4 de Junio</span>
          <Image
            className="h-4 w-auto"
            src="https://wp.4dejunio.com/wp-content/uploads/2024/04/4dejunio_nuevo_negro.svg"
            alt="4 de Junio - Agencia Creativa"
            width={100}
            height={100}
          />
        </Link>

        <div
          className={`relative flex items-center text-xs animated-component ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="uppercase">Valencia</p>
          <div className="h-1 w-1 bg-black rounded-full m-2"></div>
          <div className="w-14">
            <Time />
          </div>
        </div>
      </nav>
    </header>
  );
}
