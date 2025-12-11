import React, { useState } from 'react';
import { useTournament } from '../context/TournamentContext';
import { NeonCard } from '../components/ui/NeonCard';
import { NeonInput } from '../components/ui/NeonInput';
import { NeonButton } from '../components/ui/NeonButton';
import { Lock, Save, Trash2, Check, Download, Send, DollarSign, Users, UserCheck } from 'lucide-react';
import { ADMIN_PASSWORD } from '../constants';

export const Admin: React.FC = () => {
  const { 
    isAdmin, loginAdmin, logoutAdmin, 
    players, verifyPlayer, deletePlayer, deletePlayers,
    matchDetails, updateMatchDetails 
  } = useTournament();
  
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [selectedPlayerIds, setSelectedPlayerIds] = useState<string[]>([]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginAdmin(password)) {
      setError('Invalid Password');
    } else {
      setError('');
      setPassword('');
    }
  };

  const exportToCSV = () => {
    const headers = ['Name', 'UID', 'WhatsApp', 'Email', 'Payment Ref', 'Verified', 'Date'];
    const rows = players.map(p => [
      p.name, p.uid, p.whatsapp, p.email, p.paymentRef, p.verified ? 'Yes' : 'No', p.registrationDate
    ]);
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "firezone_players.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleWhatsAppBlast = () => {
    alert(`Simulating sending WhatsApp messages to ${players.length} players...`);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedPlayerIds(players.map(p => p.id));
    } else {
      setSelectedPlayerIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedPlayerIds(prev => 
      prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    if (selectedPlayerIds.length === 0) return;
    // Direct delete without confirmation dialog to ensure "activation" feeling
    deletePlayers(selectedPlayerIds);
    setSelectedPlayerIds([]);
  };

  // Stats
  const totalRevenue = players.filter(p => p.verified).length * parseInt(matchDetails.entryFee);
  const verifiedCount = players.filter(p => p.verified).length;

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto mt-20 animate-fade-in">
        <NeonCard className="text-center" glow>
          <Lock className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-2">Restricted Access</h2>
          <p className="text-gray-400 mb-8">Please enter the administrator password to manage the tournament.</p>
          <form onSubmit={handleLogin}>
            <NeonInput
              label="Admin Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              error={error}
            />
            <NeonButton fullWidth type="submit" className="mt-4">Unlock Dashboard</NeonButton>
          </form>
        </NeonCard>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div className="flex justify-between items-center bg-gray-900/50 p-4 rounded-lg border border-gray-800">
        <div>
           <h1 className="text-2xl font-display font-bold text-white">Admin Dashboard</h1>
           <p className="text-sm text-gray-400">Welcome back, Commander.</p>
        </div>
        <NeonButton variant="secondary" onClick={logoutAdmin} className="text-sm px-4 py-2">Logout</NeonButton>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <NeonCard className="flex items-center p-4">
          <div className="p-3 rounded-full bg-blue-500/20 mr-4">
            <Users className="w-8 h-8 text-blue-500" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Total Registrations</p>
            <p className="text-2xl font-bold">{players.length}</p>
          </div>
        </NeonCard>
        
        <NeonCard className="flex items-center p-4">
          <div className="p-3 rounded-full bg-green-500/20 mr-4">
            <UserCheck className="w-8 h-8 text-green-500" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Verified Players</p>
            <p className="text-2xl font-bold">{verifiedCount}</p>
          </div>
        </NeonCard>

        <NeonCard className="flex items-center p-4">
          <div className="p-3 rounded-full bg-yellow-500/20 mr-4">
            <DollarSign className="w-8 h-8 text-yellow-500" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Total Revenue</p>
            <p className="text-2xl font-bold">₹{totalRevenue}</p>
          </div>
        </NeonCard>
      </div>

      {/* Match Control */}
      <NeonCard glow>
        <h2 className="text-xl font-bold mb-6 text-neon-blue border-b border-gray-800 pb-2">Match Configuration</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <NeonInput
              label="Prize Pool"
              value={matchDetails.prizePool}
              onChange={(e) => updateMatchDetails({ prizePool: e.target.value })}
              placeholder="e.g. 50000"
            />
            <NeonInput
              label="Entry Fee"
              value={matchDetails.entryFee}
              onChange={(e) => updateMatchDetails({ entryFee: e.target.value })}
              placeholder="e.g. 100"
            />
          </div>
          <div className="space-y-4">
            <NeonInput
              label="Room ID"
              value={matchDetails.roomId}
              onChange={(e) => updateMatchDetails({ roomId: e.target.value })}
              placeholder="e.g. 1234567"
            />
            <NeonInput
              label="Room Password"
              value={matchDetails.roomPassword}
              onChange={(e) => updateMatchDetails({ roomPassword: e.target.value })}
              placeholder="e.g. 1234"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="space-y-4">
            <NeonInput
              label="Match Date"
              value={matchDetails.date}
              onChange={(e) => updateMatchDetails({ date: e.target.value })}
              type="date"
            />
          </div>
          <div className="space-y-4">
            <NeonInput
              label="Match Time"
              value={matchDetails.time}
              onChange={(e) => updateMatchDetails({ time: e.target.value })}
            />
          </div>
        </div>
        
        <div className="mt-8 bg-gray-800/50 p-4 rounded-lg flex items-center justify-between">
          <div>
             <h3 className="font-bold text-white">Room Visibility</h3>
             <p className="text-xs text-gray-400">Toggle this to allow verified players to see the Room ID/Password.</p>
          </div>
          <label className="flex items-center cursor-pointer relative">
            <input 
              type="checkbox" 
              checked={matchDetails.isRoomVisible}
              onChange={(e) => updateMatchDetails({ isRoomVisible: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-14 h-7 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-neon-green"></div>
          </label>
        </div>
      </NeonCard>

      {/* Players Management */}
      <NeonCard>
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-neon-purple">Player Management</h2>
            {selectedPlayerIds.length > 0 && (
               <span className="bg-neon-blue/20 text-neon-blue text-xs px-2 py-1 rounded-full border border-neon-blue/30">
                 {selectedPlayerIds.length} Selected
               </span>
            )}
          </div>
          <div className="flex gap-2 w-full md:w-auto flex-wrap">
            {selectedPlayerIds.length > 0 && (
               <NeonButton variant="danger" onClick={handleBulkDelete} className="flex-1 flex items-center justify-center text-xs animate-pulse">
                 <Trash2 className="w-4 h-4 mr-1" /> Delete Selected
               </NeonButton>
            )}
            <NeonButton variant="secondary" onClick={exportToCSV} className="flex-1 flex items-center justify-center text-xs">
              <Download className="w-4 h-4 mr-1" /> Export CSV
            </NeonButton>
            <NeonButton variant="primary" onClick={handleWhatsAppBlast} className="flex-1 flex items-center justify-center text-xs bg-green-600 hover:bg-green-500 border-none text-white">
              <Send className="w-4 h-4 mr-1" /> Blast WA
            </NeonButton>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-800">
          <table className="w-full text-left border-collapse bg-gray-900/30">
            <thead>
              <tr className="bg-gray-900 text-gray-400 text-xs uppercase tracking-wider">
                <th className="p-4 w-10 text-center">
                  <input 
                    type="checkbox" 
                    onChange={handleSelectAll}
                    checked={players.length > 0 && selectedPlayerIds.length === players.length}
                    className="w-4 h-4 rounded border-gray-700 bg-gray-800 text-neon-blue focus:ring-neon-blue cursor-pointer accent-neon-blue"
                  />
                </th>
                <th className="p-4">Player</th>
                <th className="p-4">UID / WhatsApp</th>
                <th className="p-4">Payment Ref</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 text-sm">
              {players.map(player => (
                <tr key={player.id} className={`hover:bg-white/5 transition ${selectedPlayerIds.includes(player.id) ? 'bg-neon-blue/5' : ''}`}>
                  <td className="p-4 text-center">
                    <input 
                      type="checkbox" 
                      onChange={() => handleSelectOne(player.id)}
                      checked={selectedPlayerIds.includes(player.id)}
                      className="w-4 h-4 rounded border-gray-700 bg-gray-800 text-neon-blue focus:ring-neon-blue cursor-pointer accent-neon-blue"
                    />
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-white">{player.name}</div>
                    <div className="text-xs text-gray-500">{player.email}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-mono text-neon-blue">{player.uid}</div>
                    <div className="text-xs text-gray-400">{player.whatsapp}</div>
                  </td>
                  <td className="p-4 font-mono text-yellow-500">{player.paymentRef}</td>
                  <td className="p-4">
                    {player.verified ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/30 text-green-400 border border-green-800">
                         Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-900/30 text-red-400 border border-red-800">
                         Pending
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      {!player.verified && (
                        <button 
                          onClick={() => verifyPlayer(player.id)}
                          className="p-2 bg-green-500/10 text-green-500 rounded hover:bg-green-500 hover:text-white transition-colors"
                          title="Verify Payment"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      <button 
                        onClick={() => deletePlayer(player.id)}
                        className="p-2 bg-red-500/10 text-red-500 rounded hover:bg-red-500 hover:text-white transition-colors"
                        title="Delete Player"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {players.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-500">
                    No players registered yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </NeonCard>
    </div>
  );
};