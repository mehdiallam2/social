import { ImgHTMLAttributes, forwardRef } from "react";
import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";

import { Link } from "react-router-dom";
import "./index.css";

const avatarVariants = cva("avatar", {
  variants: {
    variant: {
      circle: "circle",
      rounded: "rounded",
    },
    size: {
      small: "small",
      medium: "medium",
      large: "large",
    },
    defaultVariants: {
      variant: "circle",
      size: "medium",
    },
  },
});

interface Props extends ImgHTMLAttributes<HTMLImageElement>, VariantProps<typeof avatarVariants> {
  to?: string;
}

const Avatar = forwardRef<HTMLImageElement, Props>(
  ({ className, variant, size, to, ...props }: Props, ref) => {
    if (to) {
      return (
        <Link to={to} className={clsx(avatarVariants({ variant, size }))}>
          <img
            ref={ref}
            className={clsx(avatarVariants({ variant, size }), className)}
            {...props}
          />
        </Link>
      );
    }
    return (
      <img ref={ref} className={clsx(avatarVariants({ variant, size }), className)} {...props} />
    );
  }
);

export default Avatar;
