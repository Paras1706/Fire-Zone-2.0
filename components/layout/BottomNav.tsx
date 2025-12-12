import React from 'react';
import { Gamepad2, Trophy, Users, Phone, ShieldAlert } from 'lucide-react';
import { Page } from '../../types';

interface BottomNavProps {
  currentPage: Page;
  setPage: (page: Page) => void;
  isAdmin: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentPage, setPage, isAdmin }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: <Gamepad2 size={24} /> },
    { id: 'register', label: 'Join', icon: <Users size={24} /> },
    { id: 'match', label: 'Match', icon: <Trophy size={24} /> },
    { id: 'contact', label: 'Help', icon: <Phone size={24} /> },
    { id: 'admin', label: 'Admin', icon: <ShieldAlert size={24} /> },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-neon-surface border-t border-gray-800 z-50">
      <div className="flex justify-around items-center px-2 py-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setPage(item.id as Page)}
            className={`
              flex flex-col items-center justify-center w-full py-1
              transition-colors duration-200
              ${currentPage === item.id ? 'text-neon-blue' : 'text-gray-500'}
            `}
          >
            <div className={`
              mb-1 transition-transform duration-200
              ${currentPage === item.id ? 'transform scale-110 drop-shadow-[0_0_8px_rgba(0,243,255,0.5)]' : ''}
            `}>
              {item.icon}
            </div>
            <span className="text-[10px] font-medium uppercase tracking-wide">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};