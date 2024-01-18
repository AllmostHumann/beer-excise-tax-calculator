interface ResultFieldProps {
  key?: string;
  children: React.ReactNode;
  className?: string;
}

export const ResultField = ({ key, children }: ResultFieldProps) => {
  return (
    <div
      key={key}
      className='flex flex-row bg-silverChalice pl-1 font-normal text-black md:font-medium'
    >
      {children}
    </div>
  );
};
