import { motion } from "framer-motion";
import {
  Brush,
  PenTool,
  Figma,
  Code2,
  FileCode2,
  TerminalSquare,
  Globe,
  Palette,
} from "lucide-react";

export default function About() {
  const skillSet = [
    { name: "Adobe Photoshop", icon: <Brush size={16} /> },
    { name: "Adobe Illustrator", icon: <PenTool size={16} /> },
    { name: "Figma", icon: <Figma size={16} /> },
    { name: "Visual Studio Code", icon: <Code2 size={16} /> },
    { name: "Lucide Chart", icon: <Palette size={16} /> },
  ];

  const languages = [
    { name: "Python", icon: <TerminalSquare size={16} /> },
    { name: "JavaScript", icon: <FileCode2 size={16} /> },
    { name: "Java", icon: <Code2 size={16} /> },
    { name: "HTML", icon: <Globe size={16} /> },
    { name: "CSS", icon: <Palette size={16} /> },
    { name: "Tailwind CSS", icon: <Palette size={16} /> },
    { name: "ReactJS", icon: <FileCode2 size={16} /> },
  ];

  return (
    <div className="p-10 sm:p-8 lg:p-10 rounded-2xl bg-stone-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 h-full flex flex-col backdrop-blur-md shadow-lg border border-stone-400/30 dark:border-neutral-700 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-3">About</h2>

      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
        className="mb-5 leading-relaxed text-justify text-zinc-800 dark:text-zinc-200"
      >
        I'm{" "}
        <span className="font-semibold text-green-600 dark:text-green-400 transition-colors duration-600">
          Rance Gabrielle G. Siroy
        </span>
        , born on{" "}
        <span className="font-semibold text-green-600 dark:text-green-400 transition-colors duration-600">
          July 25, 2003
        </span>{" "}
        — a{" "}
        <span className="font-semibold text-green-600 dark:text-green-400 transition-colors duration-600">
          Computer Science
        </span>{" "}
        student in {" "}
        <span className="font-semibold text-green-600 dark:text-green-400 transition-colors duration-600">
        Cavite State University - Bacoor City Campus 
        </span> {" "}
        and aspiring front-end developer with a deep passion for
        creating meaningful and engaging digital experiences. I love building
        responsive, accessible, and visually appealing websites that blend
        creativity with functionality. Aside from coding, I’m also into{" "}
        <span className="font-semibold text-green-600 dark:text-green-400 transition-colors duration-600">
          photo editing
        </span>
        ,{" "}
        <span className="font-semibold text-green-600 dark:text-green-400 transition-colors duration-600">
          video editing
        </span>
        , and{" "}
        <span className="font-semibold text-green-600 dark:text-green-400 transition-colors duration-600">
          graphic design
        </span>
        , which help me bring a creative edge to my projects. I enjoy crafting
        designs that feel alive — where every color, layout, and animation has
        purpose. My journey into{" "}
        <span className="font-semibold text-green-600 dark:text-green-400 transition-colors duration-600">
          Computer Science
        </span>{" "}
        began with a simple curiosity: how things work behind the screen. That
        curiosity grew into a passion for web and app development,
        problem-solving, and logical thinking. My main languages are{" "}
        <span className="font-semibold text-green-600 dark:text-green-400 transition-colors duration-600">
          Python
        </span>
        ,{" "}
        <span className="font-semibold text-green-600 dark:text-green-400 transition-colors duration-600">
          JavaScript
        </span>
        ,{" "}
        <span className="font-semibold text-green-600 dark:text-green-400 transition-colors duration-600">
          HTML
        </span>
        ,{" "}
        <span className="font-semibold text-green-600 dark:text-green-400 transition-colors duration-600">
          CSS
        </span>
        ,{" "}
        <span className="font-semibold text-green-600 dark:text-green-400 transition-colors duration-600">
          Java
        </span>
        , and{" "}
        <span className="font-semibold text-green-600 dark:text-green-400 transition-colors duration-600">
          React
        </span>
        , and I’m always exploring new technologies to improve my craft and stay
        up-to-date in the tech world. For me, coding isn’t just a skill — it’s a
        creative outlet, a way to express ideas, and a path toward building a
        future where innovation meets imagination.
      </motion.p>

      
       <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        viewport={{ once: true }}
        className="mb-6"
      >
        <h3 className="text-xl font-semibold mb-3 text-neutral-800 dark:text-neutral-100">
          Design & Tools
        </h3>
        <div className="flex flex-wrap gap-3">
          {skillSet.map((skill, i) => (
            <motion.span
              key={i}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm bg-green-600 dark:bg-green-700 
                         text-neutral-200 border border-stone-300/50 
                         dark:border-neutral-600 shadow-sm"
            >
              {skill.icon}
              {skill.name}
            </motion.span>
          ))}
        </div>
      </motion.div>

   
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h3 className="text-xl font-semibold mb-3 text-neutral-800 dark:text-neutral-100">
          Programming Languages
        </h3>
        <div className="flex flex-wrap gap-3">
          {languages.map((lang, i) => (
            <motion.span
              key={i}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm bg-green-600 dark:bg-green-700 
                         text-neutral-200 border border-stone-300/50 
                         dark:border-neutral-600 shadow-sm"
            >
              {lang.icon}
              {lang.name}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}