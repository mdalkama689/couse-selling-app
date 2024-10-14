import React from "react";
import { Link } from "react-router-dom";

const Denied = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center max-w-md">
        <h1 className="text-4xl font-bold text-red-500 mb-4">Access Denied</h1>
        <p className="text-lg text-gray-300 mb-6">
          You don't have permission to view this page.
        </p>
        <Link to="/">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Go to Homepage
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Denied;
