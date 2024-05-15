import { ButtonHTMLAttributes } from "react";
import classes from "./index.module.css";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

interface ShinyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

function ShinyButton({ className, children, ...props }: ShinyButtonProps) {
  return (
    <motion.button
      className={cn(classes.button, className)}
      initial={{ "--x": "100%", scale: 1 }}
      animate={{ "--x": "-100%" }}
      whileTap={{ scale: 0.97 }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 1,
        type: "spring",
        stiffness: 20,
        damping: 15,
        mass: 2,
        scale: {
          type: "spring",
          stiffness: 10,
          damping: 5,
          mass: 0.1,
        },
      }}
      {...props}
    >
      <span className={classes.content}>{children}</span>
      <span className={classes.overlay}></span>
    </motion.button>
  );
}

export default ShinyButton;
