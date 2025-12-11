import React from 'react';
import { Gamepad2, Trophy, Users, Phone, ShieldAlert } from 'lucide-react';
import { Page } from '../../types';

interface NavbarProps {
  currentPage: Page;
  setPage: (page: Page) => void;
  isAdmin: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, setPage, isAdmin }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: <Gamepad2 className="w-4 h-4 mr-2" /> },
    { id: 'register', label: 'Register', icon: <Users className="w-4 h-4 mr-2" /> },
    { id: 'match', label: 'Match Info', icon: <Trophy className="w-4 h-4 mr-2" /> },
    { id: 'contact', label: 'Contact', icon: <Phone className="w-4 h-4 mr-2" /> },
    { id: 'admin', label: 'Admin', icon: <ShieldAlert className="w-4 h-4 mr-2" /> },
  ];

  return (
    <nav className="hidden md:flex items-center justify-between px-8 py-4 bg-neon-surface border-b border-gray-800 sticky top-0 z-50">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => setPage('home')}>
        <div className="w-10 h-10 bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg flex items-center justify-center transform rotate-3">
           <Gamepad2 className="text-white w-6 h-6" />
        </div>
        <span className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
          FIREZONE
        </span>
      </div>

      <div className="flex items-center gap-6">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setPage(item.id as Page)}
            className={`
              flex items-center px-4 py-2 rounded-full transition-all duration-300
              ${currentPage === item.id 
                ? 'bg-neon-blue/10 text-neon-blue shadow-[0_0_10px_rgba(0,243,255,0.2)]' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'}
            `}
          >
            {item.icon}
            <span className="font-semibold">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};