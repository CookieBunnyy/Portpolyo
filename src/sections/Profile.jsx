import React, {  useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {FolderGit2, Mail, Download, Heart } from "lucide-react";
import CVResume from "../assets/CV_Resume.pdf";
import pic from "../assets/pic.jpg";
import alien from "../assets/alien.png";
import { useTrackView } from "../hooks/useTrackView";
import { getLikes, incrementLikes } from "../utils/supabase";


export default function Profile() {
  useTrackView("profile");
  const tags = ["Photographer", "Gamer", "Video Editor", "Programmer"];
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [likes, setLikes] = useState(0);
  const [isLiking, setIsLiking] = useState(false); // prevent multiple rapid clicks
  const [animateLike, setAnimateLike] = useState(false); // trigger animation


   

  const handleImageClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    // Switch image halfway through the spin
    setTimeout(() => setIsFlipped((prev) => !prev), 200);

    // Reset lock after animation
    setTimeout(() => setIsAnimating(false), 300);
  };

  useEffect(() => {
    async function fetchLikes() {
      try {
        const currentLikes = await getLikes();
        setLikes(currentLikes);
      } catch (err) {
        console.error("Failed to fetch likes:", err.message);
      }
    }
    fetchLikes();
  }, []);

  // Handle like button click
  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);
    setAnimateLike(true); // trigger animation

    try {
      const newLikes = await incrementLikes();
      setLikes(newLikes);
    } catch (err) {
      console.error("Failed to increment likes:", err.message);
    } finally {
      setTimeout(() => setIsLiking(false), 500);
      setTimeout(() => setAnimateLike(false), 300); // reset animation
    }
  };

  return (
    <section id="profile">
    <div
      className="text-left p-4 sm:p-6 rounded-2xl bg-stone-200 dark:bg-neutral-800 
                 text-neutral-800 dark:text-neutral-100 h-full flex flex-col 
                 lg:flex-row gap-6 sm:gap-8 relative border border-stone-300/40 
                 dark:border-neutral-700 shadow-lg transition-colors duration-500
                 overflow-y-auto"
    >
      {/* Left Section */}
      <div className="flex flex-col items-center lg:items-start gap-4 px-2 sm:px-3 shrink-0">
        <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Profile</h2>

        {/* Profile Picture with 3D Coin Flip Effect */}
        <div className="perspective-[1000px]">
          <motion.img
            src={isFlipped ? alien : pic}
            alt="profile pic"
            onClick={handleImageClick}
            animate={isAnimating ? { rotateY: 180 } : { rotateY: 0 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 
                       border-green-400 dark:border-green-500 shadow-lg cursor-pointer
                       hover:scale-105 transition-transform duration-300"
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          />
        </div>

        <div className="text-center lg:text-left">
          <h3 className="font-semibold text-base sm:text-lg">Rance Gabrielle Siroy</h3>

          <div className="mt-2 sm:mt-3 space-y-1 sm:space-y-2 text-xs sm:text-sm text-zinc-700 dark:text-neutral-300">
            <div>
              <span className="font-medium text-neutral-700 dark:text-neutral-200">
                Occupation:{" "}
              </span>
              <span>Student</span>
            </div>

            <div>
              <span className="font-medium text-neutral-700 dark:text-neutral-200">
                Date of Birth:{" "}
              </span>
              <span>August 7, 2004</span>
            </div>
          </div>
        </div>

        {/* Likes Section */}
        <motion.div
      className="flex items-center gap-2 cursor-pointer text-green-600 dark:text-green-400 text-sm select-none"
      onClick={handleLike}
      whileTap={{ scale: 0.9 }}
    >
      <AnimatePresence>
        <motion.div
          key={likes} // trigger re-animation on like change
          initial={{ scale: 1 }}
          animate={animateLike ? { scale: 1.5, rotate: 10 } : { scale: 1, rotate: 0 }}
transition={{ type: "spring", stiffness: 300, damping: 20 }}

        >
          <Heart size={20} fill={likes > 0 ? "currentColor" : "none"} strokeWidth={2} />
        </motion.div>
      </AnimatePresence>
      <span>{likes}</span>
    </motion.div>
       
      </div>
      {/* Right Section */}
      <div
        className="flex flex-col justify-between lg:justify-start gap-4 sm:gap-6 
                   lg:border-l border-stone-400/50 dark:border-neutral-700 
                   lg:pl-6 sm:pl-8 relative flex-1"
      >
        {/* Bio and Tags */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2">Bio</h3>
          <p className="text-xs sm:text-sm text-zinc-700 dark:text-neutral-300 leading-relaxed max-w-md mb-3 sm:mb-4">
            A passionate Computer Science student and creative developer who loves
            building beautiful, functional web experiences.
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs border border-green-500/60 
                           text-green-700 dark:text-green-400 rounded-full 
                           bg-green-200/40 dark:bg-green-900/20 
                           backdrop-blur-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Projects + Clients */}
        <div className="flex items-center justify-between sm:justify-start gap-8 sm:gap-16 mt-4 flex-wrap">
          {/* Projects */}
          <div className="flex items-center gap-2">
            <FolderGit2 className="text-green-600 dark:text-green-400" size={20} />
            <div className="text-xs sm:text-sm">
              <div className="text-neutral-700 dark:text-neutral-300">Projects</div>
              <div className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-white">
                2
              </div>
            </div>
          </div>

          {/* Clients */}
          <div className="flex items-center gap-2">
            <Mail className="text-green-600 dark:text-green-400" size={20} />
            <div className="text-xs sm:text-sm">
              <div className="text-neutral-700 dark:text-neutral-300">Clients</div>
              <div className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-white">
                5
              </div>
            </div>
          </div>
        </div>

        {/* Download CV Button */}
        <div className="mt-4 lg:mt-0 lg:absolute lg:bottom-2 lg:right-2 sm:bottom-3 sm:right-3">
          <a
      href={CVResume}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => window.umami?.track('Clicked Resume Download')}
      className="flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-lg"
>
  <Download size={18} /> Download CV
</a>
        </div>
      </div>
    </div>
    </section>
  );
  
}
