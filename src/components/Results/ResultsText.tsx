interface ResultTextProps {
  children: string[];
}

export const ResultText: React.FC<ResultTextProps> = ({
  children,
}: ResultTextProps) => {
  return (
    <p className='pl-1 font-medium text-black md:font-semibold'>{children}</p>
  );
};
