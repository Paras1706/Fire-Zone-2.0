import { MatchDetails } from './types';

export const INITIAL_MATCH_DETAILS: MatchDetails = {
  id: 'FF-EVT-2024-001',
  map: 'Bermuda',
  mode: 'Solo Battle Royale',
  time: '20:00 PM',
  date: '2024-11-15',
  roomId: 'Waiting...',
  roomPassword: 'Waiting...',
  prizePool: '1200',
  entryFee: '49',
  isRoomVisible: false
};

// Load sensitive data from environment variables
export const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'Paras@1318';
export const UPI_ID = import.meta.env.VITE_UPI_ID || 'paraskhatri383-1@okicici';
export const PAYEE_NAME = import.meta.env.VITE_PAYEE_NAME || 'Paras Khatri';