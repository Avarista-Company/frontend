const Spinner = ({ className = '' }) => (
  <div className={`flex justify-center items-center ${className}`}>
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
  </div>
);

const Skeleton = ({ height = 'h-6', width = 'w-full', className = '' }) => (
  <div className={`bg-neutral-200 rounded ${height} ${width} animate-pulse ${className}`}></div>
);

export { Spinner, Skeleton };
