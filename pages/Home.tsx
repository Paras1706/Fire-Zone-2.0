import React from 'react';
import { NeonCard } from '../components/ui/NeonCard';
import { NeonButton } from '../components/ui/NeonButton';
import { Trophy, Clock, ShieldCheck, Sword, DollarSign } from 'lucide-react';
import { useTournament } from '../context/TournamentContext';
import { Page } from '../types';

interface HomeProps {
  setPage: (page: Page) => void;
}

export const Home: React.FC<HomeProps> = ({ setPage }) => {
  const { matchDetails } = useTournament();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden border border-neon-blue/20 shadow-[0_0_40px_rgba(0,243,255,0.1)]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neon-dark/90 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2070" 
          alt="Esports Tournament Banner" 
          className="w-full h-64 md:h-96 object-cover transform hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-20 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-white to-neon-purple drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">
            ULTIMATE SHOWDOWN
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-6 max-w-2xl">
            Join the battle in FireZone. Prove your skills, defeat your enemies, and claim the grand prize.
          </p>
          <NeonButton onClick={() => setPage('register')} className="px-12 py-4 text-lg">
            Register Now
          </NeonButton>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <NeonCard className="flex flex-col items-center justify-center text-center" glow>
          <Trophy className="w-8 h-8 text-yellow-400 mb-2" />
          <span className="text-gray-400 text-xs uppercase tracking-wider">Prize Pool</span>
          <span className="text-2xl font-display font-bold text-yellow-400">₹{matchDetails.prizePool}</span>
        </NeonCard>
        
        <NeonCard className="flex flex-col items-center justify-center text-center">
          <DollarSign className="w-8 h-8 text-green-400 mb-2" />
          <span className="text-gray-400 text-xs uppercase tracking-wider">Entry Fee</span>
          <span className="text-2xl font-display font-bold text-green-400">₹{matchDetails.entryFee}</span>
        </NeonCard>

        <NeonCard className="flex flex-col items-center justify-center text-center">
          <Clock className="w-8 h-8 text-neon-blue mb-2" />
          <span className="text-gray-400 text-xs uppercase tracking-wider">Time</span>
          <span className="text-xl font-display font-bold text-neon-blue">{matchDetails.time}</span>
        </NeonCard>

        <NeonCard className="flex flex-col items-center justify-center text-center">
          <Sword className="w-8 h-8 text-neon-purple mb-2" />
          <span className="text-gray-400 text-xs uppercase tracking-wider">Mode</span>
          <span className="text-xl font-display font-bold text-neon-purple">{matchDetails.mode}</span>
        </NeonCard>
      </div>

      {/* Rules Section */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-display font-bold flex items-center text-neon-blue">
            <ShieldCheck className="mr-3" /> Fair Play & Rules
          </h2>
          <div className="bg-neon-surface/50 border-l-4 border-neon-blue p-4 rounded-r-lg">
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-neon-blue mr-2">•</span>
                Hackers will be permanently banned & disqualified.
              </li>
              <li className="flex items-start">
                <span className="text-neon-blue mr-2">•</span>
                Emulators are strictly not allowed. Mobile only.
              </li>
              <li className="flex items-start">
                <span className="text-neon-blue mr-2">•</span>
                Team up is prohibited in Solo matches.
              </li>
              <li className="flex items-start">
                <span className="text-neon-blue mr-2">•</span>
                Screenshots of payment & victory are mandatory.
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-display font-bold flex items-center text-neon-purple">
            <Clock className="mr-3" /> Match Schedule
          </h2>
          <NeonCard className="h-full">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <span className="text-gray-400">Date</span>
                <span className="font-bold">{matchDetails.date}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <span className="text-gray-400">Map</span>
                <span className="font-bold">{matchDetails.map}</span>
              </div>
            </div>
          </NeonCard>
        </div>
      </div>
    </div>
  );
};