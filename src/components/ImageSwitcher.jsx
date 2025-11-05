"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import pic1 from "@/assets/pic.jpg";
import pic2 from "@/assets/pic2.jpg";
import pic3 from "@/assets/pic3.jpg";

export default function ImageSwitcher() {
  const images = [pic1, pic2, pic3];
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
      setDirection((prev) => !prev);
    }, 10000);
    return () => clearInterval(interval);
  }, [paused]);

  const current = images[index];
  const next = images[(index + 1) % images.length];

  return (
    <div
      className="relative w-[350px] h-[400px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* backcard */}
      <AnimatePresence mode="sync">
        <motion.img
          key={`bg-${index}`}
          src={next}
          alt="background"
          className="absolute top-0 left-0 w-[300px] h-[350px] object-cover rounded-2xl shadow-md border border-zinc-300 dark:border-zinc-700"
          initial={{
            opacity: 0,
            scale: 1.05,
            filter: "blur(3px)",
          }}
          animate={{
            x: direction ? 30 : -28,
            y: direction ? 30 : -25,
            opacity: 0.8,
            scale: 1,
            filter: "blur(2px)",
          }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: "blur(6px)",
            transition: { duration: 1.2, ease: "easeInOut" },
          }}
          transition={{
            duration: 1.6,
            ease: "easeInOut",
          }}
        />
      </AnimatePresence>

      {/* forecard */}
      <AnimatePresence mode="wait">
        <motion.img
          key={`front-${index}`}
          src={current}
          alt="foreground"
          className="absolute top-0 left-0 w-[300px] h-[350px] object-cover rounded-2xl"
          initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
          animate={{
            opacity: 1,
            scale: paused ? 1.15 : 1.1,
            filter: "blur(0px)",
          }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(3px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </AnimatePresence>
    </div>
  );
}
