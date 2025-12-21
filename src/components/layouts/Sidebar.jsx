// File: src/components/layouts/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar({ open = false, onClose = () => {} }) {
  return (
    // Very small, self-contained off-canvas used for cart / filters
    <aside className={`${open ? 'translate-x-0' : 'translate-x-full'} fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50`} aria-hidden={!open}>
      <div className="p-4 flex items-center justify-between border-b">
        <h3 className="text-lg font-semibold">Your Cart</h3>
        <button onClick={onClose} aria-label="Close" className="p-2 rounded hover:bg-gray-100">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="p-4 overflow-y-auto h-[calc(100%-72px)]">
        <p className="text-sm text-gray-500">You have no items in your cart yet.</p>
        <div className="mt-6">
          <Link to="/products" className="block text-center px-4 py-2 bg-indigo-600 text-white rounded-md">Shop products</Link>
        </div>
      </div>
    </aside>
  );
}
