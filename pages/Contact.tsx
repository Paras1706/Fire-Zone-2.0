import React from 'react';
import { NeonCard } from '../components/ui/NeonCard';
import { NeonButton } from '../components/ui/NeonButton';
import { Mail, MessageCircle, HelpCircle } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
       <div className="text-center mb-8">
         <h1 className="text-3xl font-display font-bold">Support Center</h1>
         <p className="text-gray-400 mt-2">Having trouble? We're here to help.</p>
       </div>

       <div className="grid md:grid-cols-2 gap-6">
         <NeonCard className="flex flex-col items-center text-center hover:border-neon-green transition-colors cursor-pointer group">
           <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
             <MessageCircle className="w-8 h-8 text-green-500" />
           </div>
           <h3 className="text-xl font-bold mb-2">WhatsApp Support</h3>
           <p className="text-gray-400 text-sm mb-6">
             Get instant replies for payment issues or room details.
           </p>
           <a 
             href="https://wa.me/917495001225" 
             target="_blank" 
             rel="noopener noreferrer"
             className="w-full"
           >
             <NeonButton fullWidth className="bg-green-600 hover:bg-green-500 text-white">
               Chat on WhatsApp
             </NeonButton>
           </a>
         </NeonCard>

         <NeonCard className="flex flex-col items-center text-center hover:border-neon-blue transition-colors cursor-pointer group">
           <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
             <Mail className="w-8 h-8 text-blue-500" />
           </div>
           <h3 className="text-xl font-bold mb-2">Email Support</h3>
           <p className="text-gray-400 text-sm mb-6">
             Send us detailed queries regarding partnership or bans.
           </p>
           <a href="mailto:fftournament365@gmail.com" className="w-full">
             <NeonButton variant="secondary" fullWidth>
               Send Email
             </NeonButton>
           </a>
         </NeonCard>
       </div>

       <NeonCard>
         <h3 className="font-bold flex items-center mb-4">
           <HelpCircle className="mr-2 text-neon-purple" /> FAQ
         </h3>
         <div className="space-y-4">
           <details className="group bg-gray-900/50 rounded-lg p-3 open:bg-gray-900 cursor-pointer">
             <summary className="font-medium list-none flex justify-between items-center text-sm">
               <span>I paid but didn't get verified?</span>
               <span className="transition group-open:rotate-180">▼</span>
             </summary>
             <p className="text-gray-400 text-sm mt-3 pl-2 border-l-2 border-neon-purple">
               Verification takes 10-30 minutes manually. If it takes longer, please contact us on WhatsApp with your payment screenshot.
             </p>
           </details>
           
           <details className="group bg-gray-900/50 rounded-lg p-3 open:bg-gray-900 cursor-pointer">
             <summary className="font-medium list-none flex justify-between items-center text-sm">
               <span>Where do I see the Room ID?</span>
               <span className="transition group-open:rotate-180">▼</span>
             </summary>
             <p className="text-gray-400 text-sm mt-3 pl-2 border-l-2 border-neon-purple">
               Go to the "Match Info" tab. The ID and Password will appear there 15 minutes before the match time for verified players.
             </p>
           </details>
         </div>
       </NeonCard>
    </div>
  );
};
