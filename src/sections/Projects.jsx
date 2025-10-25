"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderGit2, FileText, Globe, Github, LayoutGrid, Rows3 } from "lucide-react";
import ESDocs from "../assets/ES_DOCS.pdf";

export default function Projects() {
  const allProjects = [
    {
      title: "EasySched (Scheduler)",
      desc: "A desktop-like scheduling app built with Java Swing. Demonstrates OOP, calendar UI, and save/load features.",
      tags: ["Java", "Swing"],
      buttons: [
        { label: "View Docs", icon: <FileText size={16} />, link: ESDocs },
        { label: "Source", icon: <Github size={16} />, link: "https://github.com/CookieBunnyy/EasySched-Scheduler-" },
      ],
    },
    {
      title: "Nightmare Web",
      desc: "A website where you can explore random nightmare cards, uncover their dark lore, and shuffle the deck to reveal the nightmare destined for you.",
      tags: ["HTML", "JavaScript", "CSS"],
      buttons: [
        { label: "View Site", icon: <Globe size={16} />, link: "https://cookiebunnyy.github.io/Nightmare-Web/Main.html" },
        { label: "Source", icon: <Github size={16} />, link: "https://github.com/CookieBunnyy/Nightmare-Web" },
      ],
    },
    {
      title: "Student Dashboard",
      desc: "A student management dashboard that is been created for school purposes.",
      tags: ["HTML", "JavaScript", "CSS", "Python"],
      buttons: [
        { label: "Source", icon: <Github size={16} />, link: "https://github.com/CookieBunnyy/student-dashboard" },
      ],
    },
    {
      title: "Finova",
      desc: "A financial system that tracks financial transactions, savings and budgets.",
      tags: ["Typescript", "NextJS", "TailwindCSS", "Springboot"],
      buttons: [
        { label: "Source", icon: <Github size={16} />, link: "https://github.com/CookieBunnyy/financialsystem" },
      ],
    },
  ];

  const allTags = ["All", "Java", "Swing", "HTML", "JavaScript", "CSS", "Typescript", "NextJS", "TailwindCSS", "Springboot", "Python"];
  const [selectedTag, setSelectedTag] = useState("All");
  const [layout, setLayout] = useState("grid"); // grid | list | compact

  const filteredProjects =
    selectedTag === "All"
      ? allProjects
      : allProjects.filter((proj) => proj.tags.includes(selectedTag));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="text-left p-4 sm:p-10 rounded-2xl bg-stone-200 dark:bg-neutral-800 
     text-neutral-800 dark:text-neutral-100 h-full backdrop-blur-md shadow-lg 
     flex flex-col border border-stone-400/30 dark:border-neutral-700 overflow-y-auto"

    >
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <FolderGit2 className="text-green-500" /> Projects
      </h2>

      {/* Filters and Layout Options */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        {/* Tag Filter */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3"
        >
          <label className="text-sm font-medium">Filter by Tag:</label>
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

        {/* Layout Selector */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLayout("grid")}
            className={`p-2 rounded-md transition ${layout === "grid"
              ? "bg-green-500 text-white"
              : "bg-neutral-300 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
              }`}
          >
            <LayoutGrid size={18} />
          </button>
          <button
            onClick={() => setLayout("list")}
            className={`p-1 rounded-md transition ${layout === "list"
              ? "bg-green-500 text-white"
              : "bg-neutral-300 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
              }`}
          >
            <Rows3 size={24} />
          </button>
        </div>
      </div>

      {/* Project List */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${selectedTag}-${layout}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className={`grid gap-5 ${layout === "grid"
            ? "grid-cols-1 sm:grid-cols-2"
            : "grid-cols-1"
            }`}
        >
          {filteredProjects.map((proj, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className={`p-2 rounded-2xl bg-white/50 dark:bg-neutral-700/40 border border-stone-400/40 dark:border-neutral-600 hover:shadow-lg transition-all ${layout === "list"
                ? "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                : ""
                }`}
            >
              <div className="flex-1">
                <h4 className="font-semibold text-l p-1 mb-1 text-green-500">
                  {proj.title}
                </h4>
                <p className="text-xs text-neutral-800 dark:text-neutral-200 mb-2 p-1">
                  {proj.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-1 p-1">
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
              </div>

              {/* Buttons */}
<div
  className={`flex flex-wrap p-1 gap-3 ${
    layout === "list" ? "justify-start mt-25" : ""
  }`}
>
  {proj.buttons.map((btn, idx) => (
    <motion.a
      key={idx}
  href={btn.link}
  target="_blank"
  rel="noopener noreferrer"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => window.umami?.track(`Clicked ${proj.title} - ${btn.label}`)}
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
