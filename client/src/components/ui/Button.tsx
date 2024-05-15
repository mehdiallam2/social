import { ButtonHTMLAttributes, forwardRef } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { clsx } from "clsx";

const buttonVariants = cva(["btn"], {
  variants: {
    variant: {
      primary: ["btn-primary"],
      secondary: ["btn-secondary"],
      dark: ["btn-dark"],
      light: ["btn-light"],
      danger: ["btn-danger"],
    },
    size: {
      small: ["btn-small"],
      large: ["bnt-large"],
    },
    display: {
      block: ["btn-block"],
      flex: ["btn-flex"],
    },
  },
  defaultVariants: {
    variant: "primary",
    display: "flex",
  },
});

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className, size, variant, display, ...props }: Props, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(buttonVariants({ className, variant, size, display }))}
        {...props}
      />
    );
  }
);

export default Button;
