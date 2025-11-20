import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  XMarkIcon, 
  DevicePhoneMobileIcon, 
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  SparklesIcon,
  ShieldCheckIcon,
  LockClosedIcon,
  UserIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { 
  EnvelopeIcon as EnvelopeSolid,
  DevicePhoneMobileIcon as PhoneSolid,
  SparklesIcon as SparklesSolid
} from '@heroicons/react/24/solid';
import OTPLogin from './OTPLogin.jsx'; // This will be our next file

// Import GoogleLogin and jwtDecode for social login
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Floating particles animation component
const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-gradient-to-br from-white/30 to-blue-200/20 rounded-full"
        animate={{
          x: [0, 120 + i * 20, -60, 0],
          y: [0, -80 - i * 15, 40, 0],
          opacity: [0.1, 0.8, 0.3, 0.1],
          scale: [0.8, 1.2, 0.9, 0.8],
        }}
        transition={{
          duration: 12 + i * 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          left: `${15 + i * 12}%`,
          top: `${25 + i * 8}%`,
        }}
      />
    ))}
  </div>
);

// Professional loading spinner
const LoadingSpinner = ({ size = "w-5 h-5" }) => (
  <motion.div
    className={`${size} border-2 border-current border-t-transparent rounded-full`}
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
  />
);

export default function SignInModal({ isOpen, onClose }) {
  const [activeView, setActiveView] = useState('default');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  
  // Prevent background scrolling
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.documentElement.classList.add('modal-open');
      document.body.classList.add('modal-open');
      document.body.style.top = `-${scrollY}px`;
      
      return () => {
        document.documentElement.classList.remove('modal-open');
        document.body.classList.remove('modal-open');
        document.body.style.top = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCloseModal = () => {
    setActiveView('default');
    setEmail('');
    setPassword('');
    setEmailError('');
    setIsLoading(false);
    onClose();
  };

  const handleCloseButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleCloseModal();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setIsLoading(true);
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log('🔍 Google user info:', decoded);

      const requestData = {
        provider: 'google',
        email: decoded.email,
        full_name: decoded.name || `${decoded.given_name || ''} ${decoded.family_name || ''}`.trim(),
        google_token: credentialResponse.credential
      };

      console.log('🔍 Sending Google login request:', requestData);

      const res = await fetch(`${API_URL}/auth/social`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestData),
      });

      const data = await res.json();
      console.log('🔍 Google login response:', data);
      
      if (res.ok) {
        localStorage.setItem('linkly_token', data.access_token);
        localStorage.setItem('linkly_user', JSON.stringify(data.user_info));
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        handleCloseModal();
        
        console.log('✅ Google login successful!');
      } else {
        console.error('❌ Google login failed:', data);
        alert(data.detail || 'Google login failed');
      }
    } catch (err) {
      console.error('🚨 Google login error:', err);
      alert('Google login error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailFormSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setEmailError('Please enter a valid email address');
      return;
    }
    if (!password || password.length < 1) {
      setEmailError('Password is required');
      return;
    }
    
    setIsLoading(true);
    setEmailError('');
    
    try {
      const requestData = {
        provider: 'email',
        email: email,
        password: password
      };

      console.log('🔍 Sending email login request:', requestData);

      const res = await fetch(`${API_URL}/auth/social`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestData),
      });

      const data = await res.json();
      console.log('🔍 Email login response:', data);
      
      if (res.ok) {
        localStorage.setItem('linkly_token', data.access_token);
        localStorage.setItem('linkly_user', JSON.stringify(data.user_info));
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        handleCloseModal();
        
        console.log('✅ Email login successful!');
      } else {
        console.error('❌ Email login failed:', data);
        setEmailError(data.detail || 'Login failed');
      }
    } catch (error) {
      console.error('🚨 Email login error:', error);
      setEmailError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneLoginSuccess = (token, userInfo) => {
    localStorage.setItem('linkly_token', token);
    localStorage.setItem('linkly_user', JSON.stringify(userInfo));
    handleCloseModal();
    console.log('✅ Phone login successful!');
  };

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isOpen) {
        handleCloseModal();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-gradient-to-br from-black/85 via-black/75 to-black/85 backdrop-blur-xl flex items-center justify-center z-[9999] p-4"
        onClick={handleBackdropClick}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50, rotateX: -15 }}
          animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50, rotateX: -15 }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 300,
            duration: 0.6,
          }}
          className="bg-white w-full max-w-lg max-h-[95vh] rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col relative"
          onClick={(e) => e.stopPropagation()}
          style={{
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Enhanced Header */}
          <div className="relative bg-gradient-to-br from-[#2563EB] via-[#3B6F7B] to-[#1E40AF] p-8 text-white overflow-hidden">
            <FloatingParticles />
            
            <button
              onClick={handleCloseButtonClick}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 z-[100] group border border-white/20 hover:border-white/40"
              aria-label="Close modal"
              type="button"
            >
              <XMarkIcon className="w-5 h-5 group-hover:scale-110 transition-transform text-white" />
            </button>

            <motion.div 
              className="text-center relative z-10"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <motion.div 
                className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/20 shadow-2xl"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", damping: 15 }}
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                  boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                }}
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative"
                >
                  {/* Changed to <img> tag */}
                  <img 
                    src="/images/logo.png" 
                    alt="LinklyMedia Logo" 
                    width={48} 
                    height={48}
                    className="object-contain drop-shadow-lg"
                    onError={(e) => {
                      // Fallback
                      const target = e.target;
                      target.style.display = 'none';
                      target.parentElement.innerHTML = `
                        <div class="text-3xl font-bold text-[#3B6F7B] flex items-center justify-center">
                          <span class="bg-gradient-to-r from-[#3B6F7B] to-[#2563EB] bg-clip-text text-transparent">L</span>
                        </div>
                      `;
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 border-2 border-white/30 rounded-2xl"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>
              </motion.div>
              
              <motion.h1 
                className="text-3xl font-bold mb-2 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text tracking-wide"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  letterSpacing: '0.02em',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }}
              >
                Welcome to{' '}
                <span className="bg-gradient-to-r from-yellow-200 via-white to-blue-200 bg-clip-text text-transparent font-black">
                  LinklyMedia
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-white/90 text-lg font-medium mb-4"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Your Premium Advertising Platform
              </motion.p>
              
              {/* ... (rest of the header JSX) ... */}
            </motion.div>
          </div>

          {/* Enhanced Content Area */}
          <div className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-50 to-white">
            <div className="p-8">
              <AnimatePresence mode="wait">
                {activeView === 'default' ? (
                  <motion.div
                    key="default"
                    initial={{ opacity: 0, x: 0 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="space-y-5"
                  >
                    {/* ... (All the buttons: Email, Google, Phone) ... */}
                    {/* Premium Email Button */}
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveView('email-form')}
                      className="group w-full bg-gradient-to-r from-[#3B6F7B] to-[#2563EB] text-white py-5 rounded-2xl font-semibold ... "
                    >
                      <EnvelopeSolid className="w-6 h-6 ..." />
                      <span className="text-lg">Continue with Email</span>
                    </motion.button>

                    {/* Premium Google Button */}
                    <motion.div
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="group w-full border-2 border-gray-200 bg-white ... rounded-2xl ..."
                    >
                      <div className="p-2">
                        <GoogleLogin
                          onSuccess={handleGoogleSuccess}
                          onError={() => {
                            console.log('❌ Google Login Failed');
                            alert('Google login failed. Please try again.');
                          }}
                          size="large"
                          theme="outline"
                          width={400}
                          text="continue_with"
                        />
                      </div>
                    </motion.div>
                    
                    {/* Premium Phone Button */}
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveView('phone')}
                      className="group w-full border-2 border-gray-200 bg-white ... py-5 rounded-2xl ..."
                    >
                      <PhoneSolid className="w-6 h-6 text-green-600 ..." />
                      <span className="text-lg">Continue with Phone</span>
                    </motion.button>
                    
                    {/* ... (Footer links) ... */}
                  </motion.div>
                ) : activeView === 'email-form' ? (
                  <motion.div
                    key="email-form"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* ... (Email form JSX) ... */}
                    <form onSubmit={handleEmailFormSubmit} className="space-y-5">
                      {/* ... (Email and Password inputs) ... */}
                       <motion.button
                          type="submit"
                          disabled={isLoading}
                          whileHover={{ scale: isLoading ? 1 : 1.02 }}
                          whileTap={{ scale: isLoading ? 1 : 0.98 }}
                          className="w-full bg-gradient-to-r from-[#3B6F7B] to-[#2563EB] text-white py-4 rounded-xl font-semibold ..."
                        >
                          {isLoading ? (
                            <>
                              <LoadingSpinner />
                              <span>Signing into LinklyMedia...</span>
                            </>
                          ) : (
                            <>
                              <EnvelopeSolid className="w-5 h-5" />
                              <span>Sign In to LinklyMedia</span>
                            </>
                          )}
                        </motion.button>
                    </form>
                  </motion.div>
                ) : activeView === 'phone' ? (
                  <motion.div
                    key="phone"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.4 }}
                  >
                    <OTPLogin
                      onSuccess={handlePhoneLoginSuccess}
                      onBack={() => setActiveView('default')}
                    />
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}