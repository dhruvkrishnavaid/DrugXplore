const Error = () => {
  return (
    <div className="bg-white flex flex-col gap-4 items-center justify-center w-full min-h-screen">
      <img src="/2395604.jpg" alt="404" className="max-w-4xl w-full" />
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-bold text-8xl">404</h1>
        <span className="text-lg">Page not found</span>
      </div>
      <button
        onClick={() => history.back()}
        className="hover:bg-primary bg-secondary transition-colors duration-300 text-white font-bold py-2 cursor-pointer px-4 rounded mt-4"
      >
        Go back
      </button>
    </div>
  );
};

export default Error;
