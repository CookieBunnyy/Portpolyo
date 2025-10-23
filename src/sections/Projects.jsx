"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderGit2, FileText, Globe, Github } from "lucide-react";

export default function Projects() {
  const allProjects = [
    {
      title: "EasySched (Scheduler)",
      desc: "A desktop-like scheduling app built with Java Swing. Demonstrates OOP, calendar UI, and save/load features.",
      tags: ["Java", "Swing"],
      buttons: [
        { label: "View Docs", icon: <FileText size={16} />, link: "#docs" },
        { label: "Source", icon: <Github size={16} />, link: "#source" },
      ],
    },
    {
      title: "Nightmare Web",
      desc: "A website where you can explore random nightmare cards, uncover their dark lore, and shuffle the deck to reveal the nightmare destined for you.",
      tags: ["HTML", "JavaScript", "CSS"],
      buttons: [
        { label: "View Site", icon: <Globe size={16} />, link: "#site" },
        { label: "Source", icon: <Github size={16} />, link: "#source" },
      ],
    },
  ];

  const allTags = ["All", "Java", "Swing", "HTML", "JavaScript", "CSS"];
  const [selectedTag, setSelectedTag] = useState("All");

  const filteredProjects =
    selectedTag === "All"
      ? allProjects
      : allProjects.filter((proj) => proj.tags.includes(selectedTag));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="text-left p-6 rounded-2xl bg-stone-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 h-full backdrop-blur-md shadow-lg flex flex-col border border-stone-400/30 dark:border-neutral-700"
    >
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <FolderGit2 className="text-green-500" /> Projects
      </h2>

      {/* Tag Filter */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <label className="text-sm font-medium mr-3">Filter by Tag:</label>
        <select
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          className="bg-white/80 dark:bg-neutral-700 border border-stone-400/40 dark:border-neutral-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        >
          {allTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </motion.div>

      {/* Project List */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedTag}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 gap-5"
        >
          {filteredProjects.map((proj, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
              className="p-5 rounded-2xl bg-white/50 dark:bg-neutral-700/40 border border-stone-400/40 dark:border-neutral-600 hover:shadow-lg transition-shadow"
            >
              <h4 className="font-semibold text-lg mb-1 text-green-500">
                {proj.title}
              </h4>
              <p className="text-sm text-neutral-800 dark:text-neutral-200 mb-3">
                {proj.desc}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {proj.tags.map((tag, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="text-xs font-medium px-3 py-1 rounded-full bg-green-500/20 text-green-700 dark:bg-green-500/10 dark:text-green-400 border border-green-400/20"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3">
                {proj.buttons.map((btn, idx) => (
                  <motion.a
                    key={idx}
                    href={btn.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(34,197,94,0.2)" }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500/20 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-400/20 rounded-lg text-sm font-medium transition"
                  >
                    {btn.icon}
                    {btn.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
