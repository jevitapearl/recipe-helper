import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DevicePhoneMobileIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function OTPLogin({ onSuccess, onBack }) {
  const [step, setStep] = useState('input');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  
  const inputRefs = useRef([]);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  // Countdown timer for resend OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const sendOTP = async () => {
    if (!phone || phone.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const res = await fetch(`${API_URL}/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          phone: phone.replace(/\D/g, ''), // Remove non-digits
          country_code: '+91' 
        })
      });
      
      const data = await res.json();
      if (res.ok) {
        console.log('OTP sent:', data.debug_otp); // For development
        setStep('verify');
        setCountdown(60); // 60 second countdown
        setOtp(['', '', '', '', '', '']); // Reset OTP
      } else {
        setError(data.detail || 'Failed to send OTP');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOTPChange = (index, value) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all digits are entered
    if (newOtp.every(digit => digit !== '')) {
      verifyOTP(newOtp.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const verifyOTP = async (otpString) => {
    const otpToVerify = otpString || otp.join('');
    if (otpToVerify.length !== 6) {
      setError('Please enter complete OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          phone: phone.replace(/\D/g, ''), 
          otp: otpToVerify, 
          country_code: '+91' 
        })
      });
      
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user_info));
        
        if (onSuccess) {
          onSuccess(data.access_token, data.user_info);
        } else {
          alert(`Welcome ${data.user_info.username || 'User'}!`);
        }
      } else {
        setError(data.detail || 'Invalid OTP. Please try again.');
        setOtp(['', '', '', '', '', '']); // Clear OTP on error
        inputRefs.current[0]?.focus();
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatPhoneDisplay = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  };

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {step === 'input' ? (
          <motion.div
            key="input"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-[#3B6F7B]/10 rounded-2xl flex items-center justify-center mx-auto">
                <DevicePhoneMobileIcon className="w-8 h-8 text-[#3B6F7B]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Enter Phone Number</h3>
              <p className="text-sm text-gray-600">We'll send you a verification code</p>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                  +91
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, ''); // Only digits
                    if (value.length <= 10) setPhone(value);
                  }}
                  placeholder="Enter 10-digit mobile number"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#3B6F7B] focus:outline-none text-black placeholder-gray-400 transition-colors"
                  maxLength={10}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={sendOTP}
                disabled={loading || phone.length !== 10}
                className="w-full bg-[#3B6F7B] text-white py-3 rounded-xl font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Send OTP'
                )}
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="verify"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            {onBack && (
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeftIcon className="w-4 h-4" />
                Back
              </button>
            )}

            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-[#3B6F7B]/10 rounded-2xl flex items-center justify-center mx-auto">
                <DevicePhoneMobileIcon className="w-8 h-8 text-[#3B6F7B]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Enter Verification Code</h3>
              <p className="text-sm text-gray-600">
                Code sent to {formatPhoneDisplay(phone)}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-center space-x-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={el => { inputRefs.current[index] = el; }}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOTPChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-slate-800 text-xl font-semibold border-2 border-gray-200 rounded-lg focus:border-[#3B6F7B] focus:outline-none transition-colors"
                    maxLength={1}
                    inputMode="numeric"
                  />
                ))}
              </div>

              <div className="text-center">
                {countdown > 0 ? (
                  <p className="text-sm text-gray-500">
                    Resend code in {countdown}s
                  </p>
                ) : (
                  <button
                    onClick={() => {
                      setStep('input');
                      setOtp(['', '', '', '', '', '']);
                      setError('');
                    }}
                    className="text-sm text-[#3B6F7B] hover:underline"
                  >
                    Resend OTP
                  </button>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => verifyOTP()}
                disabled={loading || otp.some(digit => digit === '')}
                className="w-full bg-[#3B6F7B] text-white py-3 rounded-xl font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Verify OTP'
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}