interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={`h-full rounded-lg p-6 bg-[var(--color-dark-surface)] shadow-lg${
        className || ""
      }`}
    >
      {children}
    </div>
  );
};

export default Card;
