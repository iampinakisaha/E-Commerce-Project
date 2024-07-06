const LoadingSpinner = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center  ">
      <div
        className="spinner-border animate-spin inline-block w-10 h-10 border-4 rounded-full border-t-transparent border-slate-800"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
