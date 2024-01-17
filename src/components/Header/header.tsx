export const Header = ({ title }: { title: string }) => {
  return (
    <header>
      <h1 className='m-0 grid py-[10px] text-[30px] font-bold md:text-[30px]'>
        {title}
      </h1>
    </header>
  );
};
