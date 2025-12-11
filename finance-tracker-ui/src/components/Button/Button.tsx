import React, { type ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger"; // added danger
  fullWidth?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  ...props
}) => {
  const baseClasses =
    "font-medium py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]";

  const variantClasses = {
    primary:
      "bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white",
    secondary: "bg-gray-600 hover:bg-gray-500 text-white",
    danger:
      "bg-[var(--color-danger)] hover:bg-[var(--color-danger-hover)] text-white", // new danger
  };

  const widthClass = fullWidth ? "w-full" : "sm:w-auto";

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
