export const Header = ({ title }: { title: string }) => {
  return (
    <header className='bg-sherpaBlue grid place-items-center'>
      <h1 className='my-1 text-[15px] font-semibold text-white md:text-[20px]'>
        {title}
      </h1>
    </header>
  );
};
