interface Props  {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

function Card({ children, className = "", onClick }: Props) {
  return (
    <div onClick={onClick} className={`rounded-lg border border-border bg-bg p-4 transition-all duration-200 hover:bg-secondary hover:border-blue-400 hover:shadow-md ${className}`}>
      {children}
    </div>
  );
}

export default Card;