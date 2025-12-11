import React, { useState } from 'react';
import { NeonCard } from '../components/ui/NeonCard';
import { NeonInput } from '../components/ui/NeonInput';
import { NeonButton } from '../components/ui/NeonButton';
import { useTournament } from '../context/TournamentContext';
import { Page } from '../types';
import { User, Smartphone, Mail, CreditCard, CheckCircle, QrCode } from 'lucide-react';
import { UPI_ID, PAYEE_NAME } from '../constants';

interface RegisterProps {
  setPage: (page: Page) => void;
}

export const Register: React.FC<RegisterProps> = ({ setPage }) => {
  const { registerPlayer, matchDetails } = useTournament();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    name: '',
    uid: '',
    whatsapp: '',
    email: '',
    paymentRef: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.paymentRef.length < 10) {
      alert("Please enter a valid reference number");
      return;
    }
    
    // Submit
    registerPlayer(formData);
    setStep(3);
  };

  return (
    <div className="max-w-xl mx-auto animate-fade-in">
      <h1 className="text-3xl font-display font-bold text-center mb-8 text-white">
        Registration <span className="text-neon-blue">Zone</span>
      </h1>

      {/* Step Indicator */}
      <div className="flex items-center justify-center mb-8">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-neon-blue text-black' : 'bg-gray-800 text-gray-400'}`}>1</div>
        <div className={`w-12 h-1 bg-gray-800 mx-2 ${step >= 2 ? 'bg-neon-blue' : ''}`}></div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-neon-blue text-black' : 'bg-gray-800 text-gray-400'}`}>2</div>
        <div className={`w-12 h-1 bg-gray-800 mx-2 ${step >= 3 ? 'bg-neon-blue' : ''}`}></div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-neon-green text-black' : 'bg-gray-800 text-gray-400'}`}>3</div>
      </div>

      <NeonCard glow>
        {step === 1 && (
          <form onSubmit={handleNext}>
            <h2 className="text-xl font-bold mb-6 text-center">Player Details</h2>
            <NeonInput
              label="In-Game Name"
              name="name"
              placeholder="e.g. SK Sabir Boss"
              value={formData.name}
              onChange={handleInputChange}
              required
              icon={<User className="w-5 h-5" />}
            />
            <NeonInput
              label="Free Fire UID"
              name="uid"
              placeholder="e.g. 123456789"
              value={formData.uid}
              onChange={handleInputChange}
              required
              type="number"
              icon={<Smartphone className="w-5 h-5" />}
            />
            <NeonInput
              label="WhatsApp Number"
              name="whatsapp"
              placeholder="e.g. 9876543210"
              value={formData.whatsapp}
              onChange={handleInputChange}
              required
              type="tel"
              icon={<PhoneIcon />}
            />
            <NeonInput
              label="Email Address"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleInputChange}
              required
              type="email"
              icon={<Mail className="w-5 h-5" />}
            />
            
            <div className="flex justify-between items-center mt-6 p-4 bg-neon-blue/10 rounded-lg border border-neon-blue/20">
              <span className="text-gray-300">Registration Fee:</span>
              <span className="text-2xl font-bold text-neon-blue">₹{matchDetails.entryFee}</span>
            </div>

            <NeonButton type="submit" fullWidth className="mt-6">
              Proceed to Payment
            </NeonButton>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handlePaymentSubmit}>
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold mb-2">Scan & Pay</h2>
              <p className="text-sm text-gray-400">Scan to pay with any UPI app</p>
            </div>

            <div className="flex flex-col items-center justify-center mb-6">
              <div className="p-4 bg-white rounded-xl mb-4">
                <img 
                  src="/assets/qr-code.png"
                  alt="Payment QR Code for Paras Khatri"
                  className="w-48 h-48"
                  onError={(e) => {
                    // Fallback to dynamic QR code if local image fails
                    const target = e.target as HTMLImageElement;
                    target.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${matchDetails.entryFee}&cu=INR`;
                  }}
                />
              </div>
              <div className="bg-gray-800 px-4 py-2 rounded-lg flex flex-col items-center">
                <span className="text-xs text-gray-400">UPI ID</span>
                <span className="font-mono text-neon-blue select-all">{UPI_ID}</span>
              </div>
              <div className="bg-gray-800 px-4 py-2 rounded-lg flex flex-col items-center mt-2">
                <span className="text-xs text-gray-400">Payee Name</span>
                <span className="font-mono text-neon-blue select-all">{PAYEE_NAME}</span>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-6">
              <NeonInput
                label="Transaction Reference No. (UTR)"
                name="paymentRef"
                placeholder="Enter 12-digit UTR number"
                value={formData.paymentRef}
                onChange={handleInputChange}
                required
                maxLength={12}
                minLength={12}
                icon={<CreditCard className="w-5 h-5" />}
              />
              <p className="text-xs text-yellow-500 mb-4">
                * Please enter the correct 12-digit reference number found in your payment app for verification.
              </p>

              <div className="flex gap-4">
                <NeonButton type="button" variant="secondary" onClick={() => setStep(1)}>
                  Back
                </NeonButton>
                <NeonButton type="submit" fullWidth>
                  Confirm Registration
                </NeonButton>
              </div>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Registered Successfully!</h2>
            <p className="text-gray-400 mb-8">
              Your details have been recorded. Our team will verify your payment and add you to the match list shortly. You will receive a WhatsApp message soon.
            </p>
            <div className="space-y-3">
              <NeonButton fullWidth onClick={() => setPage('match')}>
                View Match Info
              </NeonButton>
              <NeonButton variant="secondary" fullWidth onClick={() => setPage('home')}>
                Back to Home
              </NeonButton>
            </div>
          </div>
        )}
      </NeonCard>
    </div>
  );
};

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);
