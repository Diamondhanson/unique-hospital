"use client";

import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/theme/ThemeProvider";

const TRANSITION = { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const };

export function ThemeToggle({ variant = "default" }: { variant?: "default" | "menu" }) {
  const { theme, setTheme } = useTheme();
  const isLight = theme === "light";

  if (variant === "menu") {
    return (
      <div
        role="group"
        aria-label="Theme"
        className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
      >
        <span className="flex items-center gap-2 text-sm font-medium text-ink-700">
          {isLight ? (
            <Sun className="h-4 w-4 text-brand-lime-500" />
          ) : (
            <Moon className="h-4 w-4 text-brand-blue-300" />
          )}
          {isLight ? "Light mode" : "Dark mode"}
        </span>
        <ToggleSwitch theme={theme} setTheme={setTheme} />
      </div>
    );
  }

  return <ToggleSwitch theme={theme} setTheme={setTheme} />;
}

function ToggleSwitch({
  theme,
  setTheme,
}: {
  theme: "dark" | "light";
  setTheme: (t: "dark" | "light") => void;
}) {
  return (
    <div
      role="group"
      aria-label="Theme"
      className="relative flex items-center rounded-full border border-white/10 bg-white/5 p-0.5"
    >
      <motion.span
        layout
        transition={TRANSITION}
        className="brand-gradient absolute inset-y-0.5 w-[calc(50%-2px)] rounded-full"
        style={{ left: theme === "dark" ? 2 : "calc(50% + 0px)" }}
      />
      {(["dark", "light"] as const).map((t) => {
        const active = theme === t;
        const Icon = t === "dark" ? Moon : Sun;
        return (
          <button
            key={t}
            type="button"
            onClick={() => setTheme(t)}
            aria-pressed={active}
            aria-label={t === "dark" ? "Dark mode" : "Light mode"}
            className={`relative z-10 grid h-7 w-9 place-items-center rounded-full transition-colors duration-300 ${
              active ? "text-white" : "text-ink-500 hover:text-ink-700"
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
          </button>
        );
      })}
    </div>
  );
}
