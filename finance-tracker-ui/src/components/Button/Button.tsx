type ButtonProps = {
  type: "primary" | "secondary";
  label: string;
  onClick?: () => void;
  buttonType?: "button" | "submit" | "reset";
};

function Button({
  type,
  label,
  onClick,
  buttonType = "button",
}: Readonly<ButtonProps>) {
  const baseClasses = "px-5 py-2.5 rounded-lg w-full font-medium transition";

  const variants = {
    primary:
      "bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-dark-text)]",
    secondary:
      "bg-transparent border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--color-dark-text)]",
  };

  return (
    <button
      type={buttonType}
      onClick={onClick}
      className={`${baseClasses} ${variants[type]}`}
    >
      {label}
    </button>
  );
}

export default Button;
