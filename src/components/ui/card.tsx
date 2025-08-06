import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // Base: arrondi, bordure grise claire, fond blanc, texte gris foncé
      "group rounded-2xl border border-gray-200 bg-white text-gray-800 shadow-sm",
      // Hover : ombre plus marquée
      "hover:shadow-lg transition-shadow duration-300 ease-in-out",
      // Dark mode: fond gris très foncé, texte clair, bordure gris foncé
      "dark:bg-zinc-900 dark:text-white dark:border-zinc-700",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // Flex vertical, espacement entre éléments, padding confortable
      "flex flex-col gap-2 px-6 py-4 border-b border-gray-200",
      // Dark mode bordure plus sombre
      "dark:border-zinc-700",
      className
    )}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      // Texte plus grand, semi-bold, hauteur de ligne serrée, espacement entre lettres
      "text-xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      // Petit texte, couleur atténuée pour description
      "text-sm text-gray-500",
      // Dark mode gris plus clair mais toujours discret
      "dark:text-gray-400",
      className
    )}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // Padding généreux pour contenu, texte un peu plus petit
      "p-6 text-sm",
      className
    )}
    {...props}
  />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // Flex pour aligner les éléments à droite, padding confortable, bordure en haut
      "flex items-center justify-end px-6 py-4 border-t border-gray-200",
      // Dark mode bordure sombre
      "dark:border-zinc-700",
      className
    )}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
