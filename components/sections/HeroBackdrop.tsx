"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const HERO_IMAGES = [
  "/images/hero-team.jpg",
  "/images/hero-reception.jpg",
  "/images/hero-surgery.jpg",
  "/images/hero-lab.jpg",
  "/images/hero-maternity.jpg",
] as const;

const SLIDE_MS = 4000;
const TARGET_OPACITY = 0.13;

export function HeroBackdrop() {
  const [index, setIndex] = useState(0);
  const [activations, setActivations] = useState<number[]>(() =>
    HERO_IMAGES.map((_, i) => (i === 0 ? 1 : 0)),
  );

  // Warm the browser cache so subsequent slides don't show a load delay.
  useEffect(() => {
    HERO_IMAGES.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % HERO_IMAGES.length;
        setActivations((arr) => {
          const copy = [...arr];
          copy[next] += 1;
          return copy;
        });
        return next;
      });
    }, SLIDE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {HERO_IMAGES.map((src, i) => {
        const isActive = i === index;
        const zoomIn = i % 2 === 0;
        return (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-[1000ms] ease-in-out motion-reduce:transition-none"
            style={{ opacity: isActive ? TARGET_OPACITY : 0 }}
          >
            <div
              key={`kb-${i}-${activations[i]}`}
              className={`absolute inset-0 motion-reduce:!animate-none ${zoomIn ? "hero-kb-in" : "hero-kb-out"}`}
            >
              <Image
                src={src}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
