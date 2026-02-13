"use client";

import { gsap } from "gsap";
import { useState, useEffect } from "react";

import Image from "next/image";
import Time from "./time";

import Link from "next/link";

const navLinks = [
  { name: "Servicios", href: "/servicios" },
  { name: "Proyectos", href: "/work" },
  { name: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header>
      <nav className="mx-auto flex items-center justify-between p-6">
        {/* Logo */}
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

        {/* Desktop nav */}
        <div
          className={`hidden md:flex items-center gap-8 animated-component ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-stone-500 hover:text-stone-900 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center text-xs text-stone-400">
            <p className="uppercase">Valencia</p>
            <div className="h-1 w-1 bg-stone-400 rounded-full mx-2"></div>
            <div className="w-14">
              <Time />
            </div>
          </div>
          <Link
            href="https://www.cal.eu/paumarch/15min"
            target="_blank"
            className="inline-flex items-center rounded-md border border-stone-300 bg-transparent px-4 py-1.5 text-sm text-stone-900 hover:border-stone-900 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-600 focus-visible:ring-offset-2"
          >
            <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full mr-2"></span>
            Contacto
          </Link>
        </div>

        {/* Mobile: time + hamburger */}
        <div
          className={`flex md:hidden items-center gap-4 animated-component ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex items-center text-xs text-stone-400">
            <p className="uppercase">Valencia</p>
            <div className="h-1 w-1 bg-stone-400 rounded-full mx-2"></div>
            <div className="w-14">
              <Time />
            </div>
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 -mr-2 text-stone-600 hover:text-stone-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-600 focus-visible:ring-offset-2 rounded-sm"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-white">
            <div className="flex items-center justify-between p-6">
              <Link href="/" onClick={() => setMobileOpen(false)} className="-m-1.5 p-1.5">
                <span className="sr-only">4 de Junio</span>
                <Image
                  className="h-4 w-auto"
                  src="https://wp.4dejunio.com/wp-content/uploads/2024/04/4dejunio_nuevo_negro.svg"
                  alt="4 de Junio - Agencia Creativa"
                  width={100}
                  height={100}
                />
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="p-2 -mr-2 text-stone-600 hover:text-stone-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-600 focus-visible:ring-offset-2 rounded-sm"
                aria-label="Cerrar menú"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="px-6 pt-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl font-medium text-stone-900 hover:text-stone-600 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-stone-200">
                <Link
                  href="https://www.cal.eu/paumarch/15min"
                  target="_blank"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center rounded-md border border-stone-300 bg-transparent px-6 py-2.5 text-sm font-medium text-stone-900 hover:border-stone-900 transition-colors duration-300"
                >
                  <span className="h-2 w-2 bg-emerald-500 rounded-full mr-2"></span>
                  Agendar reunión
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
