import Logo from '../icons/logo';

const Loader = () => {
  return (
    <div className="flex w-full h-full items-center justify-center motion-safe:animate-ping">
      <Logo color="white" height="32" width="32" />
    </div>
  );
};

export default Loader;
