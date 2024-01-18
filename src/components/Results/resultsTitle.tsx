interface ResultsTitleProps {
  result: string | undefined;
}

export const ResultsTitle = ({ result }: ResultsTitleProps) => {
  return (
    <div className='flex h-7 flex-row items-center justify-center bg-sherpaBlue font-normal md:font-medium'>
      <p className='p-auto font-medium text-white'>{result} Plato</p>
    </div>
  );
};
