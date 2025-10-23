import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const MotionDiv = motion.div;

function Card({ className, onClick, ...props }) {
  return (
    <MotionDiv
      whileHover={{ scale: 1 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      data-slot="card"
      className={cn(
        "relative flex flex-col gap-6 rounded-3xl border py-6 px-6 shadow-lg select-none cursor-pointer",
        "bg-neutral-200 dark:bg-neutral-800 backdrop-blur-lg border-neutral-300 dark:border-neutral-700",
        "hover:shadow-2xl  transition-all duration-300 ease-out",
        className
      )}
      {...props}
    >
     
      {props.children}
    </MotionDiv>
  );
}

function CardHeader({ className, ...props }) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "grid auto-rows-min items-start gap-3 text-center z-10 relative",
        className
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "text-2xl sm:text-3xl font-bold tracking-wide leading-none",
        "bg-neutral-200 dark:bg-neutral-800 bg-clip-text text-transparent",
        className
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        "text-neutral-700 dark:text-neutral-400 text-sm sm:text-base z-10 relative",
        className
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-4 sm:px-6 text-center z-10 relative", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex justify-center items-center px-6 pt-4 border-t border-neutral-200 dark:border-neutral-700 mt-auto z-10 relative",
        className
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
