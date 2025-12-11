interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={`h-full rounded-lg p-6 border-2 border-[var(--color-dark-surface)] ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
};

export default Card;
