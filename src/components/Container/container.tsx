import { PropsWithChildren } from 'react';

export const Container: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className='mx-auto w-full max-w-6xl px-4 py-1 text-left leading-normal md:px-5 md:py-2'>
      {children}
    </main>
  );
};
