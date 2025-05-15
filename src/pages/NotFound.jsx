import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container-padded py-12 text-center">
      <div className="max-w-md mx-auto">
        <h1 className="text-6xl font-bold text-wedding-burgundy mb-6">404</h1>
        <h2 className="text-3xl font-serif font-bold mb-4">Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-wedding inline-block px-6 py-3">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;