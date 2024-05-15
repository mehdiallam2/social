import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface ReactPortalProps {
  children: ReactNode;
  wrapperId: string;
}

const ReactPortal = ({ children, wrapperId }: ReactPortalProps) => {
  return createPortal(children, document.getElementById(wrapperId)!);
};

export default ReactPortal;
