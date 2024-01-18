interface CSVReaderWrapperProps {
  children: React.ReactNode;
}

export const CSVReaderWrapper = ({ children }: CSVReaderWrapperProps) => {
  return (
    <div className='mb-[10px] flex flex-row justify-center'>{children}</div>
  );
};
