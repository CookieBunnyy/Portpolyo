import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, FolderGit2, Mail } from "lucide-react";
import { Card, CardHeader } from "@components/ui/card";
import "./index.css";
import ThemeToggle from "@/components/ThemeToggle";
import Profile from "@/sections/Profile";
import About from "@/sections/About";
import Projects from "@/sections/Projects";
import Contact from "@/sections/Contact";
import { getPageViews } from "./utils/umami";

// Rotating Text Component
function RotatingPhrases() {
  const phrases = [
    "Let's create something amazing together.",
    "Want to make a project? Let’s talk!",
    "Got an idea? I’d love to hear it.",
    "Reach out and let’s collaborate!",
  ];
  

  const [index, setIndex] = useState(0);
  
  


  useEffect(() => {
  const interval = setInterval(() => {
    setIndex((prev) => (prev + 1) % phrases.length);
  }, 3000);
  return () => clearInterval(interval);
}, []);

  return (
    <div className="mt-1 h-5 flex justify-center text-sm text-center text-neutral-700 dark:text-neutral-300">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          {phrases[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  const [expanded, setExpanded] = useState(null);
  const [profileViews, setProfileViews] = useState(0);

  useEffect(() => {
  // Only fetch if deployed (production)
  if (import.meta.env.MODE === "production") {
    const fetchProfileViews = async () => {
      try {
        const count = await getPageViews("/profile");
        setProfileViews(count);
      } catch (err) {
        console.error("Error fetching profile views:", err);
        setProfileViews(0); // fallback
      }
    };
    fetchProfileViews();
  } else {
    // Optional: mock value when developing locally
    setProfileViews(0);
  }
}, []);

  const expandedSizes = {
    profile: "max-w-4xl min-h-[70vh]",
    about: "max-w-7xl min-h-[90vh]",
    projects: "max-w-6xl min-h-[70vh]",
    contact: "max-w-4xl min-h-[96vh]",
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-stone-300 via-stone-300/80 to-stone-400/60 dark:from-neutral-800 dark:via-neutral-900 dark:to-neutral-900 text-neutral-900 dark:text-white flex flex-col items-center p-6 relative overflow-y-auto transition-colors duration-500">
      {/* Title */}
      <div className="absolute top-6 left-6 text-3xl font-bold text-green-500 dark:text-green-400">
        <h1>Portpolyo.</h1>
      </div>

      {/* Global Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 flex items-center justify-center gap-8 
                   bg-stone-200/80 dark:bg-neutral-800/60 backdrop-blur-md px-8 py-4 
                   rounded-2xl shadow-lg border border-stone-400/30 dark:border-neutral-700 
                   transition-all z-40"
      >
        {[
          { id: "home", icon: <Home size={22} />, label: "Home" },
          { id: "about", icon: <User size={22} />, label: "About" },
          { id: "projects", icon: <FolderGit2 size={22} />, label: "Projects" },
          { id: "contact", icon: <Mail size={22} />, label: "Contact" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => {
              if (item.id === "home") setExpanded(null);
              else setExpanded(item.id);
            }}
            className={`flex flex-col items-center transition-all duration-300 
              ${
                expanded === item.id || (item.id === "home" && expanded === null)
                  ? "text-green-500 scale-110"
                  : "text-neutral-700 dark:text-stone-300 hover:text-green-400 dark:hover:text-green-400"
              }`}
          >
            {item.icon}
            <span className="text-[10px] mt-1 hidden sm:block">{item.label}</span>
          </button>
        ))}
      </motion.nav>

      {/* Main Content */}
      <div className="pt-24 w-full flex justify-center items-center">
        <AnimatePresence mode="wait">
          {!expanded && (
            <motion.div
              key="grid"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="w-full max-w-5xl h-[80vh] grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-6"
            >
              <motion.div
  variants={cardVariants}
  className="lg:col-span-1 lg:row-span-2"
>
  <Card
    onClick={() => setExpanded("profile")}
    className="h-full rounded-3xl p-6 bg-stone-200 dark:bg-neutral-800 text-neutral-100 cursor-pointer hover:scale-[1.02] transition-transform flex flex-col items-start justify-start shadow-xl border border-stone-400/30 dark:border-neutral-700"
  >
    {/* Profile Picture */}
    <motion.img
      src="/images/pic.jpg"
      alt="profile pic"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-32 h-32 rounded-full object-cover border-3 border-green-00 dark:border-green-500 shadow-lg mb-1 self-center"
    />

    {/*Intro*/}
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="text-left w-full"
    >
      <h3 className="text-l font-semibold mb-2 text-neutral-800 dark:text-neutral-200">
        Name: Rance Gabrielle Siroy
      </h3>


      <p className="text-xs text-neutral-800 dark:text-neutral-300 leading-relaxed mb-4 max-w-xs">
        A passionate Computer Science student and creative developer who loves
        building beautiful, functional web experiences.
      </p>


      
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {["Photographer", "Gamer", "Video Editor", "Programmer"].map(
          (tag, index) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="text-xs font-medium px-3 py-1 rounded-full bg-green-500/20 text-green-600 dark:bg-green-500/10 dark:text-green-400 border border-green-400/20"
            >
              {tag}
            </motion.span>
          )
        )}
      </div>
    </motion.div>

    {/* Details */}
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="w-full text-left text-sm text-neutral-800 dark:text-neutral-300 space-y-1 mb-4"
    >
      <p>
        <span className="font-semibold text-neutral-800 dark:text-white">
          Occupation:
        </span>{" "}
        Student
      </p>
      <p>
        <span className="font-semibold text-neutral-800 dark:text-white">
          Date of Birth:
        </span>{" "}
        July 25, 2003
      </p>
    </motion.div>

    {/* Stats */}
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="w-full mt-auto border-t border-neutral-700 pt-4"
    >
      <div className="flex justify-between items-center text-sm mb-2">
        <span className="font-semibold text-neutral-800 dark:text-white">
          Performance
        </span>
        <span className="text-green-400 font-medium">40%</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-neutral-700 rounded-full overflow-hidden mb-3">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "40%" }}
          transition={{ delay: 0.7, duration: 1 }}
          className="h-full bg-green-500 rounded-full"
        ></motion.div>
      </div>

      {/* Profile Views and Ratings */}
       <div className="flex justify-between items-center text-neutral-800 dark:text-neutral-400 text-sm">
      <div className="flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 text-green-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
        <span>{profileViews} visits</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-yellow-400 text-base">★</span>
        <span>4.8</span>
      </div>
    </div>
    </motion.div>
  </Card>
</motion.div>


              {/* About Card */}
<motion.div variants={cardVariants} className="lg:col-span-2 lg:row-span-1">
  <Card
    onClick={() => setExpanded("about")}
     className="relative h-full rounded-3xl p-6 bg-stone-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 cursor-pointer hover:scale-[1.02] transition-transform overflow-hidden shadow-lg border border-stone-400/30 dark:border-neutral-700">
    <CardHeader className="text-l font-semibold text-left mb-2">
      About
    </CardHeader>

    {/* Bio Preview */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
      viewport={{ once: true }}
      className="relative text-sm leading-relaxed text-justify text-stone-800 dark:text-stone-200 max-h-28 overflow-hidden pr-2"
    >
      <p>
        I’m{" "}
        <span className="font-semibold text-green-500">
          Rance Gabrielle G. Siroy
        </span>
        , born on{" "}
        <span className="font-semibold text-green-500">July 25, 2003</span> — a{" "}
        <span className="font-semibold text-green-500">
          Computer Science
        </span>{" "}
        student and aspiring front-end developer with a deep passion for
        creating meaningful and engaging digital experiences. I love building
        responsive, accessible, and visually appealing websites that blend
        creativity with functionality. Aside from coding, I’m also into{" "}
        <span className="font-semibold text-green-500">photo editing</span>,{" "}
        <span className="font-semibold text-green-500">video editing</span>, and{" "}
        <span className="font-semibold text-green-500">graphic design</span>,
        which help me bring a creative edge to my projects. I enjoy crafting designs that feel alive — where every color, layout, and animation has purpose.
        
      </p>
      
      {/* Fade-out effect */}
      <div className="absolute bottom-0 left-0 w-full h-12 bg-linear-to-t from-stone-200 to-transparent dark:bg-linear-to-t dark:from-neutral-800 dark:to-transparent pointer-events-none"></div>
    </motion.div>

    {/* See More Indicator */}
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="absolute bottom-4 right-6 text-sm text-stone-800 dark:text-stone-200 hover:text-stone-500 font-medium flex items-center gap-1"
    >
      <span>See More</span>
      <motion.span
        animate={{ x: [0, 4, 0] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
      >
        →
      </motion.span>
    </motion.div>
  </Card>
</motion.div>


             {/* Projects Card */}
<motion.div variants={cardVariants} className="lg:col-span-1 lg:row-span-1">
  <Card
    onClick={() => setExpanded("projects")}
    className="h-full rounded-3xl p- bg-stone-200 dark:bg-neutral-800 dark:text-neutral-100 text-neutral-800 cursor-pointer hover:scale-[1.02] transition-transform border-stone-400/30 dark:border-neutral-700 flex flex-col justify-between"
  >
    {/* Header with Project Count */}
    <div className="flex justify-between items-center ">
      <CardHeader className="text-l font-semibold text-left ">Projects</CardHeader>
      <span className="text-sm font-medium bg-green-500/20 text-green-600 dark:text-green-400 dark:bg-green-500/10 px-3 py-1 rounded-full">
        2 Projects
      </span>
    </div>

    {/* Project List */}
    <div className="space-y-3 text-sm ">
      <div className="p-2 rounded-xl bg-white/50 dark:bg-neutral-700/40 hover:bg-white/70 dark:hover:bg-neutral-700/60 transition border border-stone-400/30 dark:border-neutral-700 shadow-lg">
        <p className="font-semibold text-green-600 dark:text-green-400">EasySched (Scheduler)</p>
        <p className="text-neutral-700 dark:text-neutral-300 text-xs">
          A desktop-like scheduling app built with Java Swing. Demonstrates OOP, calendar UI, and save/load features.
        </p>
      </div>

      <div className="p-2 rounded-xl bg-white/50 dark:bg-neutral-700/40 hover:bg-white/70 dark:hover:bg-neutral-700/60 transition border border-stone-400/30 dark:border-neutral-700 shadow-lg">
        <p className="font-semibold text-green-600 dark:text-green-400">Nightmare Web</p>
        <p className="text-neutral-700 dark:text-neutral-300 text-xs">
          A website where you can explore random nightmare cards, uncover their dark lore, and shuffle the deck to reveal the nightmare destined for you.
        </p>
        
      </div>
      
    </div>
    
  </Card>
</motion.div>


        {/* Contact Card */}
              <motion.div variants={cardVariants} className="lg:col-span-1  lg:row-span-1 lg:col-start-3">
                <Card
                  onClick={() => setExpanded("contact")}
                  className="relative h-full rounded-3xl p-5 bg-stone-200 dark:bg-neutral-800 
                             text-neutral-800 dark:text-neutral-100 cursor-pointer hover:scale-[1.02] 
                             transition-transform border-stone-400/30 dark:border-neutral-700 
                             overflow-hidden flex flex-col justify-between group "
                >
                  <CardHeader className="text-l font-semibold text-left">Contact Me</CardHeader>

                  {/* Mail Icon */}
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="flex justify-center mt-8 relative"
                  >
                    <Mail className="w-30 h-30 text-green-500 transition-transform duration-300 stroke-1" />
                  </motion.div>

                  {/* "Click to Proceed" Overlay */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute rounded-3xl bg-neutral-200/80 dark:bg-neutral-800/80 
                               inset-0 flex items-center justify-center text-2xl font-semibold 
                               text-neutral-800 dark:text-neutral-100 opacity-0 group-hover:opacity-100 
                               transition-opacity duration-500"
                  >
                    Let's Connect
                  </motion.div>

                  {/* Rotating Phrases */}
                  <RotatingPhrases />

                  {/* Faint Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-stone-300/20 via-transparent 
                                  to-transparent dark:from-neutral-700/20 pointer-events-none"></div>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expanded Section */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5 }}
              className="absolute  inset-0 z-30 flex flex-col items-center justify-center overflow-visible pt-19"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className={`w-full p-15 ${
                  expandedSizes[expanded] || "max-w-7xl min-h-[60vh]"
                }`}
              >
                {expanded === "profile" && <Profile />}
                {expanded === "about" && <About />}
                {expanded === "projects" && <Projects />}
                {expanded === "contact" && <Contact />}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}