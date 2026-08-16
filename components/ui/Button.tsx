import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "gold" | "outline" | "ghost" | "whatsapp";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2.5 font-semibold uppercase tracking-[0.14em] " +
  "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] " +
  "disabled:pointer-events-none disabled:opacity-50 select-none";

const variants: Record<Variant, string> = {
  gold:
    "bg-gold text-black hover:bg-gold-light shadow-[0_0_0_0_rgba(201,162,39,0)] " +
    "hover:shadow-[0_14px_40px_-12px_rgba(201,162,39,0.55)] hover:-translate-y-0.5",
  outline:
    "border border-gold/45 text-white hover:border-gold hover:bg-gold/10 hover:-translate-y-0.5",
  ghost: "text-muted hover:text-white",
  whatsapp:
    "bg-[#1f8f4e] text-white hover:bg-[#25a35a] hover:-translate-y-0.5 " +
    "hover:shadow-[0_14px_40px_-12px_rgba(37,163,90,0.6)]",
};

/* Hauteurs >= 44px sur toutes les tailles : cible tactile confortable. */
const sizes: Record<Size, string> = {
  sm: "h-11 px-5 text-[11px]",
  md: "h-12 px-7 text-xs",
  lg: "h-14 px-8 text-[13px]",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;
type LinkProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function Button({
  variant = "gold",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "gold",
  size = "md",
  className,
  children,
  ...props
}: LinkProps) {
  return (
    <a className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </a>
  );
}
