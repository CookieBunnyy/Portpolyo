"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, Facebook, Send } from "lucide-react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [showForm, setShowForm] = useState(false);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");
  const formRef = useRef();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const socialContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const socialItem = {
    hidden: { opacity: 0, y: 0 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  // handle EmailJS submission
  const sendEmail = (e) => {
    e.preventDefault();
    setSending(true);
    setStatus("");

    emailjs
      .sendForm(
        "service_tctw1yo",      
        "template_p2inql9",     
        formRef.current,
        "9TsDbSwb7tMrBW_Sm"       
      )
      .then(
        () => {
          setStatus("✅ Message sent successfully!");
          formRef.current.reset();
        },
        (error) => {
          console.error(error);
          setStatus("❌ Failed to send message. Please try again.");
        }
      )
      .finally(() => setSending(false));
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="text-left p-5 rounded-2xl bg-stone-200 dark:bg-neutral-800 
            text-neutral-800 dark:text-neutral-100 h-full backdrop-blur-md 
            shadow-lg border border-stone-400/30 dark:border-neutral-700
            overflow-y-auto"
    >
      {/* Header */}
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-2xl font-bold mb-4 flex items-center gap-2"
      >
        <Mail className="text-green-500" /> Contact Me
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-neutral-800 dark:text-neutral-300 mb-6"
      >
        I’d love to connect and collaborate!
      </motion.p>

      <div className="flex flex-col gap-3">
        {/* Email Me Button */}
        <motion.button
          onClick={() => setShowForm(!showForm)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-between gap-3 w-full bg-neutral-200/40 
                     dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 
                     border border-stone-400/40 dark:border-neutral-700 backdrop-blur-md 
                     shadow-lg px-4 py-3 rounded-lg transition-all"
        >
          <div className="flex items-center gap-3">
            <Mail />
            <span>Email Me</span>
          </div>
          <motion.span
            animate={{ rotate: showForm ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-neutral-500"
          >
            ▼
          </motion.span>
        </motion.button>

        {/* Dropdown Email Form */}
        <AnimatePresence>
          {showForm && (
            <motion.form
              ref={formRef}
              onSubmit={sendEmail}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden bg-neutral-100 dark:bg-neutral-900/60 border 
                         border-stone-300/40 dark:border-neutral-700 rounded-lg p-3 
                         flex flex-col gap-2"
            >
              <label className="block text-sm mb-1 text-neutral-700 dark:text-neutral-300">
                Name
              </label>
              <input
                type="text"
                name="user_name"
                placeholder="Enter your name"
                required
                className="w-full px-3 py-2 rounded-md bg-neutral-200 dark:bg-neutral-800 
                           border border-stone-300/40 dark:border-neutral-700 
                           focus:ring-2 focus:ring-green-500 outline-none text-sm"
              />

              <label className="block text-sm mb-1 text-neutral-700 dark:text-neutral-300">
                Email
              </label>
              <input
                type="email"
                name="user_email"
                placeholder="Enter your email"
                required
                className="w-full px-3 py-2 rounded-md bg-neutral-200 dark:bg-neutral-800 
                           border border-stone-300/40 dark:border-neutral-700 
                           focus:ring-2 focus:ring-green-500 outline-none text-sm"
              />

              <label className="block text-sm mb-1 text-neutral-700 dark:text-neutral-300">
                Message
              </label>
              <textarea
                name="message"
                placeholder="Type your message..."
                required
                rows={4}
                className="w-full px-3 py-2 rounded-md bg-neutral-200 dark:bg-neutral-800 
                           border border-stone-300/40 dark:border-neutral-700 
                           focus:ring-2 focus:ring-green-500 outline-none text-sm resize-none"
              />

              {/* Send Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={sending}
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 
                           text-white px-4 py-2 rounded-md shadow-md transition-all 
                           disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <Send size={18} />
                {sending ? "Sending..." : "Send"}
              </motion.button>

              {/* Status Message */}
              {status && (
                <p className="text-sm mt-2 text-center text-neutral-700 dark:text-neutral-300">
                  {status}
                </p>
              )}
            </motion.form>
          )}
        </AnimatePresence>

        {/* Social Links */}
        <motion.div
          variants={socialContainer}
          initial="hidden"
          animate="visible"
          className={`flex ${
            showForm
              ? "flex-row justify-start gap-3 flex-wrap"
              : "flex-col gap-3"
          }`}
        >
          {[
            { name: "GitHub", icon: <Github />, link: "https://github.com/CookieBunnyy" },
            { name: "Facebook", icon: <Facebook />, link: "https://www.facebook.com/Gabbyy.io" },
          ].map((social) => (
            <motion.a
              key={social.name}
              variants={socialItem}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-neutral-200/40 dark:bg-neutral-700 
                         text-neutral-700 dark:text-neutral-200 border border-stone-400/40 
                         dark:border-neutral-700 backdrop-blur-md shadow-lg px-4 py-3 
                         rounded-lg transition-all"
            >
              {social.icon}
              <span className="whitespace-nowrap">{social.name}</span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
