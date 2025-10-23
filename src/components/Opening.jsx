"use client";
import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Moon, Sun } from "lucide-react";

export default function Opening({ onProceed }) {
  const [theme, setTheme] = useState("dark");

  // 🌗 Apply theme to HTML root
  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);

  // 🎯 Smooth Parallax Motion
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Add smooth spring effect to parallax
  const smoothX = useSpring(x, { stiffness: 100, damping: 10 });
  const smoothY = useSpring(y, { stiffness: 100, damping: 10 });

  // Increase rotation range for stronger parallax
  const rotateX = useTransform(smoothY, [-250, 250], [15, -15]);
  const rotateY = useTransform(smoothX, [-250, 250], [-15, 15]);
  const translateX = useTransform(smoothX, [-250, 250], [-20, 20]);
  const translateY = useTransform(smoothY, [-250, 250], [-20, 20]);

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    const offsetX = e.clientX - innerWidth / 2;
    const offsetY = e.clientY - innerHeight / 2;
    x.set(offsetX);
    y.set(offsetY);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      onClick={onProceed}
      className="w-screen h-screen overflow-hidden flex flex-col items-center justify-center 
                 bg-stone-200 dark:bg-neutral-900 text-neutral-900 
                 dark:text-neutral-100 relative cursor-pointer select-none"
    >
      {/* 🌗 Theme Toggle */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // prevent triggering onProceed
          setTheme(theme === "dark" ? "light" : "dark");
        }}
        className="absolute top-6 right-6 bg-white/40 dark:bg-neutral-800/60 backdrop-blur-md 
                   p-3 rounded-full border border-neutral-300 dark:border-neutral-700 
                   hover:scale-110 transition-transform shadow-md"
      >
        {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
      </button>

      {/* 🅿️ Title with Enhanced Parallax */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          x: translateX,
          y: translateY,
          transformStyle: "preserve-3d",
        }}
        className="flex flex-col items-center justify-center"
      >
        <motion.h1
          initial={{ y: 40, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-7xl sm:text-8xl font-extrabold tracking-wide"
        >
          Portpolyo.
        </motion.h1>

        {/* ✨ Animated Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 1.3,
            repeat: Infinity,
            repeatDelay: 0.5,
            ease: "easeInOut",
          }}
          className="mt-8 text-lg font-medium text-neutral-700 dark:text-neutral-300"
        >
          Click to Proceed
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
