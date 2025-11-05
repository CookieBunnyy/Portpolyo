"use client";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";

export default function Opening({ onProceed }) {
  return (
    <motion.div
      onClick={onProceed}
      className="h-screen flex flex-col items-center justify-center 
                 bg-stone-100 dark:bg-neutral-900 text-neutral-900 dark:text-white 
                 relative overflow-hidden cursor-pointer select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-6 right-6 z-50"
      >
        <ThemeToggle />
      </div>

 
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-xl sm:text-xl font-regular">Welcome to</h1>
        <h2 className="text-6xl sm:text-8xl font-bold text-green-500 dark:text-green-400 ">
          Portpolyo.
        </h2>
      </motion.div>


      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 0.5,
          ease: "easeInOut",
        }}
        className="absolute bottom-10 text-sm sm:text-base font-medium 
                   text-neutral-600 dark:text-neutral-400"
      >
        Click to Proceed ↓
      </motion.p>
    </motion.div>
  );
}
