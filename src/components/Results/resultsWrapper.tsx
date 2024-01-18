interface ResultsWrapperProps {
  children: React.ReactNode;
  key: string | undefined;
}

export const ResultsWrapper = ({ key, children }: ResultsWrapperProps) => {
  return (
    <div
      key={key}
      className='flex flex-col rounded-md border-[1px] border-solid border-sherpaBlue'
    >
      {children}
    </div>
  );
};
