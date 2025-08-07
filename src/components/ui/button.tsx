import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", disabled, ...props }, ref) => {
    const baseClass = "btn";
    const variantClass = `btn-${variant}`;
    const disabledClass = disabled ? "btn-disabled" : "";

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(baseClass, variantClass, disabledClass, className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
