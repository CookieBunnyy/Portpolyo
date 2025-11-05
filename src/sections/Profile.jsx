import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate, scale } from "framer-motion";
import { FolderGit2, Download, Heart } from "lucide-react";
import CVResume from "../assets/CV_Resume.pdf";
import pic from "../assets/pic.jpg";
import alien from "../assets/alien.png";
import { useTrackView } from "../hooks/useTrackView";
import { supabase } from "../utils/supabase";
import {
  getLikes,
  hasLiked,
  toggleLike,
  getVisitorId,
  getProjectsCount,
  getCVDownloads,
  incrementCVDownloads,
} from "../utils/supabase";

export default function Profile() {
  useTrackView("profile");

  const tags = ["Photographer", "Gamer", "Video Editor", "Programmer"];
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [likes, setLikes] = useState(0);
  const [isLiking, setIsLiking] = useState(false);
  const [animateLike, setAnimateLike] = useState(false);
  const [liked, setLiked] = useState(false);
  const [projects, setProjects] = useState(0);
  const [downloads, setDownloads] = useState(0);
  

 
  const downloadValue = useMotionValue(0);
  const roundedDownloads = useTransform(downloadValue, (latest) => Math.round(latest));

  const visitorId = getVisitorId();

 
  useEffect(() => {
    async function fetchData() {
      const [totalLikes, alreadyLiked, projectCount, cvDownloads] = await Promise.all([
        getLikes(1),
        hasLiked(1, visitorId),
        getProjectsCount(),
        getCVDownloads(),
      ]);

      setLikes(totalLikes);
      setLiked(alreadyLiked);
      setProjects(projectCount);
      setDownloads(cvDownloads);
      downloadValue.set(cvDownloads); 
    }

    fetchData();

   
    const channel = supabase
      .channel("cv_downloads_changes")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "cv_downloads" },
        (payload) => {
          const newCount = payload.new.count;
          setDownloads(newCount);
          animate(downloadValue, newCount, { duration: 0.5, ease: "easeOut" });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [visitorId, downloadValue]);

  
  const handleImageClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => setIsFlipped((prev) => !prev), 200);
    setTimeout(() => setIsAnimating(false), 300);
  };

 
  const handleLike = async () => {
    if (isLiking || liked) return;
    setIsLiking(true);
    setAnimateLike(true);

    const totalLikes = await toggleLike(1, visitorId);
    setLikes(totalLikes);
    setLiked(true);

    setTimeout(() => setAnimateLike(false), 300);
    setTimeout(() => setIsLiking(false), 500);
  };

  
  const handleDownload = async () => {
    await incrementCVDownloads();
    window.umami?.track("Clicked Resume Download");

   
    const link = document.createElement("a");
    link.href = CVResume;
    link.download = "CV_Resume.pdf";
    link.click();
  };
const [showNote, setShowNote] = useState(false);
useEffect(() => {
 
  setShowNote(true);
  const timer = setTimeout(() => setShowNote(false), 2000);
  return () => clearTimeout(timer);
}, []);
  
  return (
    
    <section id="profile">

      
      <div
        className="text-left p-4 sm:p-6 rounded-2xl bg-stone-200 dark:bg-neutral-800 
                      text-neutral-800 dark:text-neutral-100 h-full flex flex-col 
                      lg:flex-row gap-6 sm:gap-8 relative border border-stone-300/40 
                      dark:border-neutral-700 shadow-lg transition-colors duration-500
                      overflow-y-auto"
      >
        
        <div className="flex flex-col items-center lg:items-start gap-4 px-2 sm:px-3 shrink-0">
          <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Profile</h2>

         
        <div className="relative perspective-[1000px] flex justify-center z-50">
  
  <AnimatePresence>
    {showNote && (
      <motion.div
        initial={{ opacity: 0, y: 5, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 5, scale: 0.9 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="absolute -top-18 bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900
                   text-[10px] sm:text-[11px] px-3.5 py-1 w-44 rounded-2xl shadow-md whitespace-wrap
                   z-9999"
      >
        refresh mo lang ang site para makita yung updated CV Downloads kasi tinatamad na ako at reminder sa like is di mo na maunlike if niliked mo na hehehehe😉😎👌
        
        <div className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-0 h-0 
                        border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent 
                        border-t-[6px] border-t-neutral-800 dark:border-t-neutral-200"></div>
      </motion.div>
    )}
  </AnimatePresence>


  <motion.img
    src={isFlipped ? alien : pic}
    alt="profile pic"
    onClick={handleImageClick}
    onMouseEnter={() => setShowNote(true)}
    onMouseLeave={() => setShowNote(false)}
    animate={isAnimating ? { rotateY: 180 } : { rotateY: 0 }}
    transition={{ duration: 0.1, ease: "easeInOut" }}
    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 
               border-green-400 dark:border-green-500 shadow-lg cursor-pointer
               hover:scale-105 transition-transform duration-300 relative z-10"
    style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
  />
</div>
          <div className="text-center lg:text-left">
            <h3 className="font-semibold text-base sm:text-lg">Rance Gabrielle Siroy</h3>
            <div className="mt-2 sm:mt-3 space-y-1 sm:space-y-2 text-xs sm:text-sm text-zinc-700 dark:text-neutral-300">
              <div>
                <span className="font-medium text-neutral-700 dark:text-neutral-200">Occupation: </span>
                <span>Student</span>
              </div>
              <div>
                <span className="font-medium text-neutral-700 dark:text-neutral-200">Date of Birth: </span>
                <span>August 7, 2004</span>
              </div>
            </div>
          </div>

          
          <motion.div
            className="flex items-center gap-2 cursor-pointer text-green-600 dark:text-green-400 text-sm select-none"
            onClick={handleLike}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence>
              <motion.div
                key={liked}
                animate={animateLike ? { scale: 1.5, rotate: 10 } : { scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Heart size={20} fill={liked ? "currentColor" : "none"} strokeWidth={2} />
              </motion.div>
            </AnimatePresence>
            <span>{likes}</span>
          </motion.div>
        </div>

        
        <div
          className="flex flex-col justify-between lg:justify-start gap-4 sm:gap-6 
                        lg:border-l border-stone-400/50 dark:border-neutral-700 
                        lg:pl-6 sm:pl-8 relative flex-1"
        >
          
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Bio</h3>
            <p className="text-xs sm:text-sm text-zinc-700 dark:text-neutral-300 leading-relaxed max-w-md mb-3 sm:mb-4">
              A passionate Computer Science student and creative developer who loves
              building beautiful, functional web experiences.
            </p>
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

          
          <div className="flex items-center justify-between sm:justify-start gap-8 sm:gap-16 mt-4 flex-wrap">
           
            <div className="flex items-center gap-2">
              <FolderGit2 className="text-green-600 dark:text-green-400" size={20} />
              <div className="text-xs sm:text-sm">
                <div className="text-neutral-700 dark:text-neutral-300">Projects</div>
                <div className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-white">
                  {projects}
                </div>
              </div>
            </div>

            
            <div className="flex items-center gap-2">
              <Download className="text-green-600 dark:text-green-400" size={20} />
              <div className="text-xs sm:text-sm">
                <div className="text-neutral-700 dark:text-neutral-300">CV Downloads</div>
                <motion.div
                  className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-white"
                >
                  {roundedDownloads}
                </motion.div>
              </div>
            </div>
          </div>

          
          <div className="mt-4 lg:mt-0 lg:absolute lg:bottom-2 lg:right-2 sm:bottom-3 sm:right-3">
            <motion.button
              onClick={handleDownload}
              whileHover={{scale: 1.02}}
              className="flex items-center gap-2 px-4 py-2 bg-green-500/20 
                         hover:bg-green-400/60 transition-all rounded-lg"
            >
              <Download size={18} /> Download CV
            </motion.button>
          </div>
        </div>
        
      </div>

     
    </section>
    
  );
}
