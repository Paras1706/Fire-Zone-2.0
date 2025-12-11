export interface Player {
  id: string;
  name: string;
  uid: string;
  whatsapp: string;
  email: string;
  paymentRef: string;
  registrationDate: string;
  verified: boolean;
}

export interface MatchDetails {
  id: string;
  map: string;
  mode: string;
  time: string;
  date: string;
  roomId: string;
  roomPassword: string;
  prizePool: string;
  entryFee: string;
  isRoomVisible: boolean; // if true, verified players can see credentials
}

export type Page = 'home' | 'register' | 'match' | 'contact' | 'admin';
