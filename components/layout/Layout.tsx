import React from 'react';
import { Navbar } from './Navbar';
import { BottomNav } from './BottomNav';
import { Page } from '../../types';
import { useTournament } from '../../context/TournamentContext';
import { Gamepad2 } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  setPage: (page: Page) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentPage, setPage }) => {
  const { isAdmin } = useTournament();

  return (
    <div className="min-h-screen bg-neon-dark text-white flex flex-col pb-16 md:pb-0">
      {/* Mobile Top AppBar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-neon-surface border-b border-gray-800 sticky top-0 z-40">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg flex items-center justify-center">
             <Gamepad2 className="text-white w-5 h-5" />
           </div>
           <span className="text-xl font-display font-bold text-white">FIREZONE</span>
        </div>
      </div>

      <Navbar currentPage={currentPage} setPage={setPage} isAdmin={isAdmin} />
      
      <main className="flex-grow container mx-auto px-4 py-6 md:py-8 max-w-6xl">
        {children}
      </main>

      <BottomNav currentPage={currentPage} setPage={setPage} isAdmin={isAdmin} />
    </div>
  );
};
