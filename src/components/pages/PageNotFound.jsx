

// File: src/pages/PageNotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-indigo-600">404</h1>
        <p className="mt-4 text-xl text-gray-700">Sorry — we couldn't find that page.</p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center px-5 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Go back home</Link>
        </div>
      </div>
    </div>
  );
}
