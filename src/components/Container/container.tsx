export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='mx-auto my-0 w-full max-w-6xl px-4 py-1 text-left leading-normal md:p-5'>
      {children}
    </main>
  );
};
