export const Footer = () => {
  return (
    <footer className='sticky mt-auto grid place-items-center bg-sherpaBlue'>
      <h1 className='text-[15px] font-semibold text-white'>
        <button
          type='button'
          className='m-3 '
        >
          Github:
          <a
            className='pl-1 hover:underline'
            href='https://github.com/AllmostHumann'
            target='_blank'
          >
            AllmostHuman
          </a>
        </button>
      </h1>
    </footer>
  );
};
