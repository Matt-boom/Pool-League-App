import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export const Navigation: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 text-gray-900 hover:text-gray-600">
            <Home className="w-6 h-6" />
            <span className="font-semibold">League Manager</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};