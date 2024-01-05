export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='mx-auto my-0 w-full max-w-6xl p-[20px] text-left leading-normal'>
      {children}
    </main>
  );
};
