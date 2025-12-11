import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Player, MatchDetails } from '../types';
import { INITIAL_MATCH_DETAILS, ADMIN_PASSWORD } from '../constants';

interface TournamentContextType {
  players: Player[];
  matchDetails: MatchDetails;
  registerPlayer: (player: Omit<Player, 'id' | 'registrationDate' | 'verified'>) => void;
  updateMatchDetails: (details: Partial<MatchDetails>) => void;
  verifyPlayer: (playerId: string) => void;
  deletePlayer: (playerId: string) => void;
  deletePlayers: (playerIds: string[]) => void;
  isAdmin: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
}

const TournamentContext = createContext<TournamentContextType | undefined>(undefined);

export const TournamentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Simulating database with local state
  const [players, setPlayers] = useState<Player[]>(() => {
    const saved = localStorage.getItem('firezone_players');
    return saved ? JSON.parse(saved) : [];
  });

  const [matchDetails, setMatchDetails] = useState<MatchDetails>(() => {
    const saved = localStorage.getItem('firezone_match');
    return saved ? JSON.parse(saved) : INITIAL_MATCH_DETAILS;
  });

  const [isAdmin, setIsAdmin] = useState(false);

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('firezone_players', JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    localStorage.setItem('firezone_match', JSON.stringify(matchDetails));
  }, [matchDetails]);

  const registerPlayer = (data: Omit<Player, 'id' | 'registrationDate' | 'verified'>) => {
    const newPlayer: Player = {
      ...data,
      id: crypto.randomUUID(),
      registrationDate: new Date().toISOString(),
      verified: false, // Default to unverified until admin checks payment
    };
    setPlayers(prev => [...prev, newPlayer]);
  };

  const updateMatchDetails = (details: Partial<MatchDetails>) => {
    setMatchDetails(prev => ({ ...prev, ...details }));
  };

  const verifyPlayer = (playerId: string) => {
    setPlayers(prev => prev.map(p => p.id === playerId ? { ...p, verified: true } : p));
  };

  const deletePlayer = (playerId: string) => {
    setPlayers(prev => prev.filter(p => p.id !== playerId));
  };

  const deletePlayers = (playerIds: string[]) => {
    setPlayers(prev => prev.filter(p => !playerIds.includes(p.id)));
  };

  const loginAdmin = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => setIsAdmin(false);

  return (
    <TournamentContext.Provider value={{
      players,
      matchDetails,
      registerPlayer,
      updateMatchDetails,
      verifyPlayer,
      deletePlayer,
      deletePlayers,
      isAdmin,
      loginAdmin,
      logoutAdmin
    }}>
      {children}
    </TournamentContext.Provider>
  );
};

export const useTournament = () => {
  const context = useContext(TournamentContext);
  if (!context) {
    throw new Error('useTournament must be used within a TournamentProvider');
  }
  return context;
};