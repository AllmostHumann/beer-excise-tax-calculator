interface CSVReaderWrapperProps {
  children: React.ReactNode;
}

export const CSVReaderWrapper: React.FC<CSVReaderWrapperProps> = ({
  children,
}) => {
  return (
    <div className='mb-[10px] flex flex-row justify-center'>{children}</div>
  );
};
