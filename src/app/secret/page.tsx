'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Key, Unlock, Eye, EyeOff, Heart, CheckCircle2 } from 'lucide-react';
import { SECRET_PASSWORD } from '@/config/content';

export default function SecretPage() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Custom reasons why we love them for secret page
  const reasons = [
    "The way your eyes wrinkle when you laugh at my silly jokes.",
    "Your endless kindness and how you care for everyone around you.",
    "The way you say my name when you are happy.",
    "How safe and complete I feel when I am holding your hand.",
    "Your beautiful mind and the dreams you share with me.",
    "Because you make the mundane moments feel like a grand adventure."
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase().trim() === SECRET_PASSWORD.toLowerCase()) {
      setIsAuthenticated(true);
      setErrorMsg('');
      localStorage.setItem('secret_unlocked', 'true');
    } else {
      setErrorMsg('❌ The password does not align. Try again, my love.');
    }
  };

  useEffect(() => {
    const isUnlocked = localStorage.getItem('secret_unlocked') === 'true';
    if (isUnlocked) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsAuthenticated(true);
    }
  }, []);

  const handleLockOut = () => {
    localStorage.removeItem('secret_unlocked');
    setIsAuthenticated(false);
    setPassword('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 relative z-10 flex flex-col items-center min-h-[75vh] justify-center">
      
      {!isAuthenticated ? (
        /* Password Screen */
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel border-[#d4a373]/25 bg-[#fdfbf7] rounded-3xl p-8 sm:p-12 max-w-md w-full text-center shadow-md relative"
        >
          {/* Top key logo */}
          <div className="w-16 h-16 rounded-full bg-[#faf6f0] border border-[#d4a373]/25 flex items-center justify-center text-[#e07a5f] mx-auto mb-6">
            <Key className="w-6 h-6 animate-pulse" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-serif text-[#3d342d] mb-2">
            The Secret Room
          </h1>
          <p className="text-[#6d5e53] text-xs sm:text-sm mb-8 leading-relaxed">
            Enter the secret keyword to unlock this room. (Hint: It is a common promise about the length of our love).
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter secret word..."
                className="w-full bg-[#faf6f0] border border-[#d4a373]/30 rounded-xl py-3 px-4 text-sm text-[#3d342d] focus:outline-none focus:border-[#e07a5f]/50 transition-colors pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-[#8c7a6b] hover:text-[#e07a5f] transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {errorMsg && (
              <p className="text-xs text-rose-500 font-semibold">{errorMsg}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#e07a5f] hover:bg-[#cb654b] text-[#2d141c] rounded-xl text-xs uppercase tracking-wider font-bold transition-all duration-200 shadow-md cursor-pointer"
            >
              🔓 Unlock Chamber
            </button>
          </form>
          
          <span className="text-[10px] text-[#8c7a6b] mt-6 block select-none">
            Hint: &quot;foreverand...&quot;
          </span>

        </motion.div>
      ) : (
        /* Secret Content Screen */
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-panel border-[#d4a373]/25 bg-[#fdfbf7] rounded-3xl p-8 sm:p-12 w-full max-w-2xl shadow-md relative overflow-hidden"
        >
          {/* Top header */}
          <div className="flex justify-between items-center border-b border-[#d4a373]/15 pb-4 mb-8">
            <div className="flex items-center gap-2">
              <Unlock className="w-5 h-5 text-[#e07a5f]" />
              <h2 className="text-lg font-bold text-[#3d342d] font-serif">The Secret Room</h2>
            </div>
            
            <button
              onClick={handleLockOut}
              className="text-[10px] uppercase font-bold tracking-wider py-1.5 px-3 rounded-lg border border-[#d4a373]/20 hover:border-red-500/30 text-[#8c7a6b] hover:text-red-500 transition-all cursor-pointer bg-transparent"
            >
              Lock Room
            </button>
          </div>

          <div className="text-center mb-8">
            <div className="inline-flex p-3 bg-[#e07a5f]/10 rounded-full text-[#e07a5f] mb-3 animate-bounce">
              <Heart className="w-7 h-7 fill-[#e07a5f]" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#3d342d] font-serif mb-1">
              Why I Love You
            </h3>
            <p className="text-xs text-[#6d5e53]">
              A private scroll containing reasons why you are the best thing in my life.
            </p>
          </div>

          {/* Reasons List */}
          <div className="space-y-4 max-w-md mx-auto">
            {reasons.map((reason, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-3 p-3.5 rounded-xl border border-[#d4a373]/15 bg-[#faf6f0]/40"
              >
                <CheckCircle2 className="w-4 h-4 text-[#e07a5f] flex-shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-[#3d342d] leading-relaxed">
                  {reason}
                </p>
              </motion.div>
            ))}
          </div>

        </motion.div>
      )}

    </div>
  );
}
