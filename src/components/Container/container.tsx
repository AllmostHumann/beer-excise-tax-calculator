export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='mx-auto w-full max-w-6xl px-4 py-1 text-left leading-normal md:px-5 md:py-2'>
      {children}
    </main>
  );
};
