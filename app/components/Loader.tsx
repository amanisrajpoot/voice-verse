import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spinSlow" />
    </div>
  );
};

export default Loader;
