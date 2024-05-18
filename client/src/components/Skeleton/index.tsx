import { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";
import styles from "./index.module.css";

interface Props extends HTMLAttributes<HTMLDivElement> {}

const Skeleton = ({ className, ...props }: Props) => {
  return <div className={cn(styles.skeleton, className)} {...props} />;
};

export default Skeleton;
