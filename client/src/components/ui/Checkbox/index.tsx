import { InputHTMLAttributes, forwardRef } from "react";
import styles from "./index.module.css";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = forwardRef<HTMLInputElement, Props>(({ ...props }: Props, ref) => {
  return (
    <div className={styles.container}>
      <input ref={ref} type="checkbox" className={styles.checkbox} {...props} />

      <svg
        className={styles.icon}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--background)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 6 9 17l-5-5"></path>
      </svg>
    </div>
  );
});

export default Checkbox;
