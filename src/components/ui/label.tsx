"use client"

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/lib/utils";

export interface LabelProps extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  variant?: "default" | "secondary" | "error";
  size?: "sm" | "md" | "lg";
}

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, variant = "default", size = "md", ...props }, ref) => {
  // Compose semantic class names based on variant and size
  const variantClass = `label-${variant}`;
  const sizeClass = `label-size-${size}`;
  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn("label", variantClass, sizeClass, className)}
      {...props}
    />
  );
});

Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
