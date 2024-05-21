"use client";

import { gsap } from "gsap";
import { useState, useEffect } from "react";

import Image from "next/image";
import Time from "./time";

import Link from 'next/link';

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
      gsap.fromTo(
        ".animated-component",
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" }
      );
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <header className="">
      <nav className="mx-auto flex items-center justify-between p-6">
        <div>
        <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">4 de Junio</span>
            <Image
              className="h-4 w-auto"
              src="http://wp.4dejunio.com/wp-content/uploads/2024/04/4dejunio_nuevo_negro.svg"
              alt=""
              width={100}
              height={100}
            />
          </Link>
        </div>
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
