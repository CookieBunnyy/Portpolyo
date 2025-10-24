"use client";
import { motion } from "framer-motion";
import ImageSwitcher from "./ImageSwitcher.jsx";
import ThemeToggle from "@/components/ThemeToggle";

export default function Introduction({ onProceed }) {
  const tags = ["Video Editor", "Photographer", "Gamer", "Student"];

  return (
    <motion.div
      onClick={onProceed}
      className={`h-screen flex flex-col lg:flex-row items-center justify-center 
        px-8 lg:px-16 gap-8 lg:gap-14
        bg-stone-100 dark:bg-neutral-900 text-neutral-900 dark:text-white
        cursor-pointer select-none relative overflow-hidden`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Global Theme Toggle (doesn't trigger onProceed) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-6 right-6 z-50"
      >
        <ThemeToggle />
      </div>

      {/* Center Container */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 w-full">
        {/* Image Section (moves on top in mobile, shrinks slightly) */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex justify-center items-center order-1 lg:order-2 w-full
                     max-w-[220px] sm:max-w-[260px] md:max-w-[300px] lg:max-w-[380px]"
        >
          <ImageSwitcher />
        </motion.div>

        {/* Text Section */}
        <motion.div
          className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left max-w-[550px] order-2 lg:order-1"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-4xl sm:text-6xl font-bold mb-4"
          >
            Hi, I'm{" "}
            <span className="text-green-500 dark:text-green-400">
              Rance Gabrielle Siroy
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="max-w-xl text-base sm:text-lg text-neutral-600 dark:text-neutral-300 
                       leading-relaxed mb-8"
          >
            Behind every great program is a person who believed they could turn logic
            into art. Even in a world of ones and zeros, creativity and passion remain
            the most powerful variables.
          </motion.p>

          {/* Tags */}
          <motion.div
            className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
          >
            {tags.map((tag, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="px-4 py-2 text-sm sm:text-base border border-green-500/60 
                           text-green-600 dark:text-green-400 rounded-full 
                           bg-green-100/30 dark:bg-green-900/20 
                           backdrop-blur-sm font-medium"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Click Indicator */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 0.5,
          ease: "easeInOut",
        }}
        className="absolute font-bold bottom-10 text-sm text-neutral-500 dark:text-neutral-400"
      >
        Click to Proceed ↓
      </motion.p>
    </motion.div>
  );
}
