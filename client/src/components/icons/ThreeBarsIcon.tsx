import { SVGProps } from "react";

interface ThreeBarsIconProps extends SVGProps<SVGSVGElement> {}

const ThreeBarsIcon = ({ ...props }: ThreeBarsIconProps) => {
  return (
    <svg aria-label="Settings" fill="currentColor" role="img" viewBox="0 0 24 24" {...props}>
      <title>Settings</title>
      <line
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        x1="3"
        x2="21"
        y1="4"
        y2="4"
      ></line>
      <line
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        x1="3"
        x2="21"
        y1="12"
        y2="12"
      ></line>
      <line
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        x1="3"
        x2="21"
        y1="20"
        y2="20"
      ></line>
    </svg>
  );
};

export default ThreeBarsIcon;
