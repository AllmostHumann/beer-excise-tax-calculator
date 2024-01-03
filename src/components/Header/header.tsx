export const Header = ({ title }: { title: string }) => {
  return (
    <header>
      <h1 className='m-0 grid py-[10px] font-bold text-[35px]'>{title}</h1>
    </header>
  );
};
