"use client";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import Spline from "@splinetool/react-spline";

export default function Opening({ onProceed }) {
  const handleSplineClick = (e) => {
    e.stopPropagation(); 
  };

  return (
    <motion.div
      onClick={onProceed}
      className="h-screen flex flex-col lg:flex-row items-center justify-center 
                 bg-stone-100 dark:bg-neutral-900 text-neutral-900 dark:text-white 
                 relative overflow-hidden cursor-pointer select-none px-4 lg:px-0"
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
        className="flex flex-col text-left lg:w-auto space-y-2 mr-5 z-99999"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-lg sm:text-2xl font-medium mb-1">Welcome to</h1>
        <h2 className="text-6xl sm:text-8xl font-bold mb-5 text-green-500 dark:text-green-400 leading-none">
          Portpolyo.
        </h2>
         <h1 className="text-lg sm:text-xsm font-medium mb-1">Created by Rance Gabrielle G. Siroy</h1>
      </motion.div>

      
      <motion.div
        className="w-[350px] sm:w-[450px] lg:w-[650px] h-[350px] sm:h-[480px] lg:h-[800px] 
                   flex justify-start items-center -ml-15 lg:-ml-20 z-15"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2 }}
        onClick={handleSplineClick} 
        onPointerDown={handleSplineClick} 
      >
        <Spline scene="https://prod.spline.design/xYtP1aUfnpcSg-ud/scene.splinecode" />
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
                   text-neutral-600 dark:text-neutral-400 z-99999"
      >
        Click to proceed ↓
      </motion.p>
    </motion.div>
  );
}
