export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='my-0 mx-auto text-left p-[20px] max-w-6xl w-full leading-normal'>
      {children}
    </main>
  );
};
