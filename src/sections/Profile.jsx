import { Eye, Star, FolderGit2, Download, Mail } from "lucide-react";
import CVResume from "../assets/CV_Resume.pdf";

export default function Profile() {
  const tags = ["Photographer", "Gamer", "Video Editor", "Programmer"];

  return (
    <div
      className="text-left p-4 sm:p-6 rounded-2xl bg-stone-200 dark:bg-neutral-800 
                 text-neutral-800 dark:text-neutral-100 h-full flex flex-col 
                 lg:flex-row gap-6 sm:gap-8 relative border border-stone-300/40 
                 dark:border-neutral-700 shadow-lg transition-colors duration-500
                 overflow-y-auto"
    >
      {/* Left Section */}
      <div className="flex flex-col items-center lg:items-start gap-4 px-2 sm:px-3 flex-shrink-0">
        <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Profile</h2>

        <img
          src="/images/pic.jpg"
          alt="profile pic"
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 
                     border-stone-400 dark:border-neutral-700 shadow-lg"
        />

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

        <div className="mt-5 sm:mt-6 flex flex-wrap justify-center lg:justify-start items-center gap-4 sm:gap-6">
          {/* Performance */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-stone-300 dark:bg-neutral-700 
                            flex items-center justify-center text-lg sm:text-2xl font-bold 
                            text-neutral-800 dark:text-neutral-100">
              92
            </div>
            <div className="text-xs sm:text-sm">
              <div className="text-neutral-700 dark:text-neutral-300">Performance</div>
              <div className="text-neutral-500 dark:text-neutral-400">Score</div>
            </div>
          </div>

          {/* Views */}
          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-zinc-700 dark:text-neutral-300">
            <Eye className="text-green-600 dark:text-green-400" size={18} />
            <strong className="text-neutral-800 dark:text-neutral-100">16</strong>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-zinc-700 dark:text-neutral-300">
            <Star className="text-yellow-500 dark:text-yellow-400" size={18} />
            <strong className="text-neutral-800 dark:text-neutral-100">4.8</strong>
          </div>
        </div>
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
    download
    className="flex items-center justify-center gap-1 sm:gap-2 bg-green-600 dark:bg-green-700 
               hover:bg-green-700 dark:hover:bg-green-600 
               text-white px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium 
               shadow-md transition-all duration-300 w-full lg:w-auto"
  >
    Download CV <Download size={14} className="sm:w-4 sm:h-4" />
  </a>
</div>
      </div>
    </div>
  );
}
