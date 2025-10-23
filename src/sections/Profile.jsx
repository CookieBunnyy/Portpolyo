import { Eye, Star, FolderGit2, Download, Mail } from "lucide-react";

export default function Profile() {
  const tags = ["Photographer", "Gamer", "Video Editor", "Programmer"];

  return (
    <div
      className="text-left p-6 rounded-2xl bg-stone-200 dark:bg-neutral-800 
                 text-neutral-800 dark:text-neutral-100 h-full flex flex-col 
                 lg:flex-row gap-8 relative border border-stone-300/40 
                 dark:border-neutral-700 shadow-lg transition-colors duration-500"
    >
      {/* Left Section */}
      <div className="flex flex-col items-center lg:items-start gap-4 px-3">
        <h2 className="text-2xl font-bold mb-3">Profile</h2>

        <img
          src="/images/pic.jpg"
          alt="profile pic"
          className="w-32 h-32 rounded-full object-cover border-4 
                     border-stone-400 dark:border-neutral-700 shadow-lg"
        />

        <div>
          <h3 className="font-semibold text-lg">Rance Gabrielle Siroy</h3>

          <div className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-neutral-300">
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

        <div className="mt-6 flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-stone-300 dark:bg-neutral-700 
                            flex items-center justify-center text-2xl font-bold 
                            text-neutral-800 dark:text-neutral-100">
              92
            </div>
            <div className="text-sm">
              <div className="text-neutral-700 dark:text-neutral-300">Performance</div>
              <div className="text-neutral-500 dark:text-neutral-400">Score</div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-zinc-700 dark:text-neutral-300">
            <Eye className="text-green-600 dark:text-green-400" />
            <span>
              <strong className="text-neutral-800 dark:text-neutral-100">16</strong>
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-zinc-700 dark:text-neutral-300">
            <Star className="text-yellow-500 dark:text-yellow-400" />
            <span>
              <strong className="text-neutral-800 dark:text-neutral-100">4.8</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div
        className="flex flex-col justify-between lg:justify-start gap-6 
                   lg:border-l border-stone-400/50 dark:border-neutral-700 
                   lg:pl-8 relative flex-1"
      >
        {/* Bio + Tags */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Bio</h3>
          <p className="text-sm text-zinc-700 dark:text-neutral-300 leading-relaxed max-w-md mb-4">
            A passionate Computer Science student and creative developer who loves
            building beautiful, functional web experiences.
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs border border-green-500/60 
                           text-green-700 dark:text-green-400 rounded-full 
                           bg-green-200/40 dark:bg-green-900/20 
                           backdrop-blur-sm font-medium transition-colors duration-500"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Projects + Clients */}
        <div className="flex items-center gap-16 mt-4">
          {/* Projects */}
          <div className="flex items-center gap-2">
            <FolderGit2 className="text-green-600 dark:text-green-400" size={22} />
            <div className="text-sm">
              <div className="text-neutral-700 dark:text-neutral-300">Projects</div>
              <div className="text-lg font-semibold text-neutral-900 dark:text-white">
                2
              </div>
            </div>
          </div>

          {/* Clients */}
          <div className="flex items-center gap-2">
            <Mail className="text-green-600 dark:text-green-400" size={22} />
            <div className="text-sm">
              <div className="text-neutral-700 dark:text-neutral-300">Clients</div>
              <div className="text-lg font-semibold text-neutral-900 dark:text-white">
                5
              </div>
            </div>
          </div>
        </div>

        {/* Download CV Button - fixed bottom-right */}
        <div className="absolute bottom-1 right-2">
          <a
            href="/assets/Resume_Siroy.pdf"
            download
            className="flex items-center gap-2 bg-green-600 dark:bg-green-700 
                       hover:bg-green-700 dark:hover:bg-green-600 
                       text-white px-5 py-2 rounded-full text-sm font-medium 
                       shadow-md transition-all duration-300"
          >
            Download CV <Download size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
