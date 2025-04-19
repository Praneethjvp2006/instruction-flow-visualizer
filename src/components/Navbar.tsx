
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="bg-custom-black text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center mb-4 sm:mb-0">
          <h1 className="text-xl font-bold text-custom-teal">Instruction Flow Visualizer</h1>
        </div>
        
        <div className="flex space-x-2 sm:space-x-6">
          <NavLink to="/" active={isActive("/")}>
            Simulation
          </NavLink>
          <NavLink to="/settings" active={isActive("/settings")}>
            Settings
          </NavLink>
          <NavLink to="/statistics" active={isActive("/statistics")}>
            Statistics
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, active, children }) => {
  return (
    <Link 
      to={to} 
      className={`px-3 py-2 rounded-md transition-colors duration-200 ${
        active 
          ? "bg-custom-teal text-white" 
          : "text-gray-300 hover:bg-custom-darkteal hover:text-white"
      }`}
    >
      {children}
    </Link>
  );
};

export default Navbar;
