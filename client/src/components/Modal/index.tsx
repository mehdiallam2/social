import { HTMLAttributes, ReactNode, useEffect } from "react";
import styles from "./index.module.css";

import Backdrop from "../Backdrop";
import { cn } from "@/utils/cn";
import ReactPortal from "../ReactPortal";
import { createPortal } from "react-dom";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  isOpen: boolean;
  handleClose: () => void;
}

const Modal = ({ children, isOpen, handleClose }: Props) => {
  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", closeOnEscapeKey);
    return () => window.removeEventListener("keydown", closeOnEscapeKey);
  }, [handleClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <Backdrop isOpen={isOpen} onClick={handleClose}>
      <div
        className={cn(styles.modal, isOpen && styles.open)}
        role="dialog"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </Backdrop>,
    document.getElementById("portal-root")!
  );
};

export default Modal;
