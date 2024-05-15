import { InputHTMLAttributes, forwardRef } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { clsx } from "clsx";

const inputVariants = cva(["input"], {
  variants: {
    variant: {},
  },
  defaultVariants: {},
});

interface Props extends InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, variant, ...props }: Props, ref) => {
    return <input ref={ref} className={clsx(inputVariants({ className, variant }))} {...props} />;
  }
);

export default Input;
