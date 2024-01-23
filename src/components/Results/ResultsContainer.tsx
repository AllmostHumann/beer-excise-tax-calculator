interface ResultsContainerProps {
  children: React.ReactNode;
}

export const ResultsContainer: React.FC<ResultsContainerProps> = ({
  children,
}) => {
  return (
    <div className='grid grid-cols-[1fr_1fr] gap-1 md:mx-5 md:grid-cols-[1fr_1fr_1fr_1fr_1fr]'>
      {children}
    </div>
  );
};
