"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Opening from "./components/Opening.jsx";
import Introduction from "./components/Introduction.jsx";
import App from "./App.jsx";

export default function Structure() {
  const [stage, setStage] = useState(
    localStorage.getItem("currentStage") || "opening"
  );

  useEffect(() => {
    localStorage.setItem("currentStage", stage);
  }, [stage]);

  return (
    <AnimatePresence mode="wait">
      {stage === "opening" && (
        <motion.div
          key="opening"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <Opening onProceed={() => setStage("intro")} />
        </motion.div>
      )}

      {stage === "intro" && (
        <motion.div
          key="intro"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <Introduction onProceed={() => setStage("app")} />
        </motion.div>
      )}

      {stage === "app" && (
        <motion.div
          key="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          
          <App setStage={setStage} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
