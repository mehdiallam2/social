import { cn } from "@/utils/cn";
import styles from "./index.module.css";
import { HTMLAttributes } from "react";

interface BackdropProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
}

const Backdrop = ({ isOpen, ...props }: BackdropProps) => {
  return <div className={cn(styles.backdrop, styles.open)} {...props}></div>;
};

export default Backdrop;
