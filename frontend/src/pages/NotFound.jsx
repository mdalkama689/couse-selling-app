import React from 'react';

const NotFound = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-2">Oops! Page Not Found</p>
        <p className="mb-6">The page you are looking for does not exist.</p>
        <a
          href="/"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 transition"
        >
          Go to Homepage
        </a>
      </div>
    </div>
  );
};

export default NotFound;
