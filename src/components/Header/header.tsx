export const Header = ({ title }: { title: string }) => {
  return (
    <header>
      <h1 className='m-0 grid py-[10px] text-[35px] font-bold'>{title}</h1>
    </header>
  );
};
