interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className='grid place-items-center bg-sherpaBlue'>
      <h1 className='my-1 text-[15px] font-semibold text-white md:text-[20px]'>
        {title}
      </h1>
    </header>
  );
};
