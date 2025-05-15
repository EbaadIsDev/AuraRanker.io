import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Trophy, Zap, MenuIcon, X } from 'lucide-react';
import CreateProfileModal from './CreateProfileModal';

interface NavbarProps {
  onProfileCreated: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onProfileCreated }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const navLinks = [
    { path: '/', label: 'Profiles', icon: <Sparkles size={18} /> },
    { path: '/leaderboard', label: 'Leaderboard', icon: <Trophy size={18} /> },
    { path: '/battle', label: 'Aura Battle', icon: <Zap size={18} /> },
  ];
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <>
      <nav className="bg-surface shadow-md py-4 sticky top-0 z-10 border-b border-primary/20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-primary rounded-full p-1.5">
                <Sparkles size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                AuraRanker.io
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-colors
                    ${isActive(link.path) 
                      ? 'bg-primary/20 text-white' 
                      : 'text-gray-300 hover:bg-surface-light'}
                  `}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
            
            {/* Create Profile Button */}
            <div className="hidden md:block">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:shadow-aura transition-all duration-300"
              >
                Create Profile
              </button>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg bg-surface-light"
              >
                {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
              </button>
            </div>
          </div>
          
          {/* Mobile navigation */}
          {isMenuOpen && (
            <div className="mt-4 md:hidden border-t border-primary/20 pt-4">
              <div className="flex flex-col space-y-2">
                {navLinks.map(link => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`
                      px-4 py-3 rounded-lg text-sm font-medium flex items-center space-x-2
                      ${isActive(link.path) 
                        ? 'bg-primary/20 text-white' 
                        : 'text-gray-300 hover:bg-surface-light'}
                    `}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                ))}
                
                <button
                  onClick={() => {
                    setIsModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="bg-primary hover:bg-primary/80 text-white px-4 py-3 rounded-lg text-sm font-medium shadow-sm mt-2 w-full flex justify-center"
                >
                  Create Profile
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
      
      <CreateProfileModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProfileCreated={onProfileCreated}
      />
    </>
  );
};

export default Navbar;