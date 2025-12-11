import React, { useState } from 'react';
import { NeonCard } from '../components/ui/NeonCard';
import { useTournament } from '../context/TournamentContext';
import { Lock, Unlock, Calendar, MapPin, Swords, ShieldCheck, AlertCircle, LogIn } from 'lucide-react';
import { NeonButton } from '../components/ui/NeonButton';
import { NeonInput } from '../components/ui/NeonInput';

export const MatchInfo: React.FC = () => {
  const { matchDetails, players } = useTournament();
  
  // Local state for access control
  const [authUid, setAuthUid] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [currentPlayerName, setCurrentPlayerName] = useState('');

  const handleCheckAccess = (e: React.FormEvent) => {
    e.preventDefault();
    const player = players.find(p => p.uid === authUid || p.whatsapp === authUid);

    if (!player) {
      setAuthError('Player ID not found in registration list.');
      return;
    }

    if (!player.verified) {
      setAuthError('Your payment is still pending verification by Admin.');
      return;
    }

    setCurrentPlayerName(player.name);
    setIsAuthenticated(true);
    setAuthError('');
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-12 animate-fade-in px-4">
        <NeonCard glow className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-neon-blue/10 rounded-full flex items-center justify-center border border-neon-blue/30">
              <ShieldCheck className="w-10 h-10 text-neon-blue" />
            </div>
          </div>
          
          <h1 className="text-2xl font-display font-bold text-white mb-2">Restricted Access</h1>
          <p className="text-gray-400 mb-8 text-sm">
            The Match Lobby is exclusive to verified players. Please enter your registered UID or WhatsApp number to enter.
          </p>
          
          <form onSubmit={handleCheckAccess} className="space-y-4 text-left">
            <NeonInput 
              label="Free Fire UID / WhatsApp"
              placeholder="e.g. 123456789"
              value={authUid}
              onChange={(e) => setAuthUid(e.target.value)}
              icon={<LogIn className="w-5 h-5" />}
              error={authError}
            />
            
            <NeonButton fullWidth type="submit" className="mt-2">
              Verify Identity
            </NeonButton>
          </form>

          <p className="mt-6 text-xs text-gray-500">
            Not registered yet? <span className="text-neon-blue cursor-pointer hover:underline" onClick={() => window.scrollTo(0,0)}>Go to Registration</span>
          </p>
        </NeonCard>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="flex justify-between items-end border-b border-gray-800 pb-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-1">Match Lobby</h1>
          <p className="text-gray-400 text-sm">Welcome, <span className="text-neon-blue font-bold">{currentPlayerName}</span></p>
        </div>
        <button 
          onClick={() => setIsAuthenticated(false)}
          className="text-xs text-red-400 hover:text-red-300 underline"
        >
          Exit Lobby
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Col: Match Details */}
        <NeonCard className="relative overflow-hidden h-full flex flex-col justify-center">
           <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
             <Swords size={120} />
           </div>
           <h2 className="text-xl font-bold text-neon-purple mb-6 flex items-center">
             <MapPin className="mr-2" /> Mission Briefing
           </h2>
           <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between bg-gray-900/50 p-3 rounded-lg border border-gray-800">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                  <div className="text-xs text-gray-500 uppercase">Schedule</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-white">{matchDetails.date}</div>
                  <div className="text-sm text-neon-blue">{matchDetails.time}</div>
                </div>
              </div>

              <div className="flex items-center justify-between bg-gray-900/50 p-3 rounded-lg border border-gray-800">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                  <div className="text-xs text-gray-500 uppercase">Map & Mode</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-white">{matchDetails.map}</div>
                  <div className="text-sm text-neon-purple">{matchDetails.mode}</div>
                </div>
              </div>
           </div>
        </NeonCard>

        {/* Right Col: Credentials */}
        <NeonCard className={`flex flex-col justify-center text-center h-full border-2 ${matchDetails.isRoomVisible ? 'border-neon-green/50 shadow-[0_0_20px_rgba(10,255,10,0.1)]' : 'border-red-500/30'}`}>
          {!matchDetails.isRoomVisible ? (
            <div className="flex flex-col items-center py-8">
               <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
                 <Lock className="w-10 h-10 text-red-500" />
               </div>
               <h3 className="text-xl font-bold text-white mb-2">Credentials Locked</h3>
               <p className="text-gray-400 text-sm mb-6 px-4">
                 The Room ID and Password are currently hidden by the Admin. They will be released here approximately 15 minutes before the match starts.
               </p>
               <div className="bg-gray-800/50 p-4 rounded-xl w-full max-w-xs border border-gray-700">
                 <div className="flex justify-between text-xs mb-2 uppercase tracking-wide text-gray-500">
                   <span>Status</span>
                   <span className="text-yellow-500 font-bold">Standby</span>
                 </div>
                 <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                   <div className="bg-yellow-500 h-full w-2/3 animate-pulse"></div>
                 </div>
               </div>
            </div>
          ) : (
            <div className="flex flex-col items-center w-full animate-fade-in py-4">
               <div className="w-20 h-20 bg-neon-green/10 rounded-full flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(10,255,10,0.3)]">
                 <Unlock className="w-10 h-10 text-neon-green" />
               </div>
               <h3 className="text-xl font-bold text-white mb-2">Room Access Granted</h3>
               <p className="text-gray-400 text-xs mb-6">Use these credentials to join the custom room.</p>
               
               <div className="w-full space-y-4 px-4">
                 <div className="bg-black/40 p-4 rounded-lg border border-neon-blue/30 backdrop-blur-md">
                   <div className="text-xs text-neon-blue uppercase tracking-widest mb-1">Room ID</div>
                   <div className="text-3xl font-mono text-white font-bold select-all tracking-wider">{matchDetails.roomId}</div>
                 </div>
                 
                 <div className="bg-black/40 p-4 rounded-lg border border-neon-purple/30 backdrop-blur-md">
                   <div className="text-xs text-neon-purple uppercase tracking-widest mb-1">Password</div>
                   <div className="text-3xl font-mono text-white font-bold select-all tracking-wider">{matchDetails.roomPassword}</div>
                 </div>
               </div>
               
               <div className="mt-6 flex items-center text-xs text-green-400 bg-green-900/20 px-3 py-1 rounded-full border border-green-900/50">
                 <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                 Room is Live
               </div>
            </div>
          )}
        </NeonCard>
      </div>
    </div>
  );
};