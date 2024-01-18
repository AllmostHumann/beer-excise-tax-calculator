interface ResultsWrapperProps {
  children: React.ReactNode;
}

export const ResultsWrapper = ({ children }: ResultsWrapperProps) => {
  return (
    <div className='flex flex-col rounded-md border-[1px] border-solid border-sherpaBlue'>
      {children}
    </div>
  );
};
