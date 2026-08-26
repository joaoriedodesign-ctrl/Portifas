import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

/**
 * Reference implementation for the project's Label/Button text style +
 * brand tokens. Covers default / hover / focus-visible / disabled, per the
 * "todos os estados relevantes" rule in the project checklist.
 *
 * Do not fork this into a one-off styled <button> elsewhere — extend the
 * variant prop instead, so every CTA in the site stays visually consistent.
 */
export function Button({
  variant = "primary",
  className = "",
  disabled,
  children,
  ...props
}: ButtonProps) {
  const base =
    "label-button inline-flex items-center justify-center rounded-md px-5 py-2.5 transition-colors disabled:cursor-not-allowed disabled:opacity-40";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-brand-primary text-text-inverse hover:bg-brand-primary-hover",
    secondary:
      "bg-transparent text-brand-secondary border border-border hover:border-border-strong hover:text-brand-secondary-hover",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
