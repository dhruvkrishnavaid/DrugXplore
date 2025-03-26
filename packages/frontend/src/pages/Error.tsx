const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-white gap-4">
      <img src="/2395604.jpg" alt="404" className="w-full max-w-4xl" />
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-bold text-8xl">404</h1>
        <span className="text-lg">Page not found</span>
      </div>
      <button
        onClick={() => history.back()}
        className="px-4 py-2 mt-4 font-bold text-white rounded cursor-pointer hover:bg-primary bg-secondary transition-colors duration-300"
      >
        Go back
      </button>
    </div>
  );
};

export default Error;
