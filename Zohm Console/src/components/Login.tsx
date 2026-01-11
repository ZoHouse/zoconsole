import { useState, useRef, useEffect } from 'react';
import { Phone, ArrowRight, Lock, CheckCircle2, AlertCircle } from 'lucide-react';

interface LoginProps {
  onLoginSuccess: () => void;
}

export function Login({ onLoginSuccess }: LoginProps) {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Format phone number as user types
  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 10) {
      return cleaned;
    }
    return cleaned.slice(0, 10);
  };

  // Handle phone number submission
  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (phoneNumber.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call to send OTP
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
      setResendTimer(30);
      // Focus first OTP input
      setTimeout(() => otpInputRefs.current[0]?.focus(), 100);
    }, 1500);
  };

  // Handle OTP input
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value[0];
    }

    if (!/^\d*$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all 6 digits are entered
    if (index === 5 && value && newOtp.every(digit => digit !== '')) {
      handleOtpSubmit(newOtp.join(''));
    }
  };

  // Handle OTP backspace
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  // Handle OTP paste
  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = [...otp];
    
    pastedData.split('').forEach((digit, index) => {
      if (index < 6) {
        newOtp[index] = digit;
      }
    });
    
    setOtp(newOtp);
    
    // Focus last filled input or first empty
    const lastFilledIndex = Math.min(pastedData.length - 1, 5);
    otpInputRefs.current[lastFilledIndex]?.focus();

    // Auto-submit if complete
    if (pastedData.length === 6) {
      handleOtpSubmit(pastedData);
    }
  };

  // Handle OTP verification
  const handleOtpSubmit = async (otpValue?: string) => {
    const otpToVerify = otpValue || otp.join('');
    
    if (otpToVerify.length !== 6) {
      setError('Please enter the complete 6-digit OTP');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call to verify OTP
    setTimeout(() => {
      setIsLoading(false);
      
      // For demo purposes, accept any 6-digit OTP
      // In production, verify against backend
      if (otpToVerify.length === 6) {
        onLoginSuccess();
      } else {
        setError('Invalid OTP. Please try again.');
        setOtp(['', '', '', '', '', '']);
        otpInputRefs.current[0]?.focus();
      }
    }, 1500);
  };

  // Handle resend OTP
  const handleResendOtp = () => {
    if (resendTimer > 0) return;
    
    setIsLoading(true);
    setOtp(['', '', '', '', '', '']);
    setError('');
    
    // Simulate API call to resend OTP
    setTimeout(() => {
      setIsLoading(false);
      setResendTimer(30);
      otpInputRefs.current[0]?.focus();
    }, 1000);
  };

  // Countdown timer for resend
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  // Handle back to phone number
  const handleBack = () => {
    setStep('phone');
    setOtp(['', '', '', '', '', '']);
    setError('');
    setResendTimer(0);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#9ae600]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#06b6d4]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            <span className="text-white">Zo House</span>
            <span className="text-[#9ae600]"> Console</span>
          </h1>
          <p className="text-[#9f9fa9] text-sm">Property Management Platform</p>
        </div>

        {/* Main Card */}
        <div className="bg-[#09090b] border border-[#27272a] rounded-2xl p-6 sm:p-8 shadow-2xl">
          {step === 'phone' ? (
            // Phone Number Step
            <div>
              <div className="flex items-center justify-center w-16 h-16 bg-[#9ae600]/10 border border-[#9ae600]/30 rounded-2xl mb-6 mx-auto">
                <Phone className="w-8 h-8 text-[#9ae600]" />
              </div>
              
              <h2 className="text-2xl font-semibold text-center mb-2">Welcome Back</h2>
              <p className="text-[#9f9fa9] text-center mb-8 text-sm">
                Enter your phone number to receive a verification code
              </p>

              <form onSubmit={handlePhoneSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-[#d4d4d8]">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9f9fa9] text-sm font-medium">
                      +91
                    </div>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
                      placeholder="9876543210"
                      className="w-full pl-14 pr-4 py-3.5 bg-[#18181b] border border-[#27272a] rounded-xl text-white placeholder:text-[#71717b] focus:outline-none focus:border-[#9ae600] transition-colors text-lg"
                      maxLength={10}
                      autoFocus
                      disabled={isLoading}
                    />
                  </div>
                  {error && (
                    <div className="flex items-center gap-2 mt-3 text-[#fb2c36] text-sm">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading || phoneNumber.length !== 10}
                  className="w-full py-3.5 bg-[#9ae600] text-black rounded-xl font-semibold hover:bg-[#8bd500] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                      <span>Sending OTP...</span>
                    </div>
                  ) : (
                    <>
                      <span>Continue</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-[#27272a] text-center">
                <p className="text-xs text-[#71717b]">
                  By continuing, you agree to Zo World's Terms of Service and Privacy Policy
                </p>
              </div>
            </div>
          ) : (
            // OTP Verification Step
            <div>
              <div className="flex items-center justify-center w-16 h-16 bg-[#06b6d4]/10 border border-[#06b6d4]/30 rounded-2xl mb-6 mx-auto">
                <Lock className="w-8 h-8 text-[#06b6d4]" />
              </div>
              
              <h2 className="text-2xl font-semibold text-center mb-2">Enter Verification Code</h2>
              <p className="text-[#9f9fa9] text-center mb-8 text-sm">
                We've sent a 6-digit code to<br />
                <span className="text-white font-medium">+91 {phoneNumber}</span>
              </p>

              <div className="space-y-6">
                {/* OTP Input */}
                <div>
                  <div className="flex gap-2 sm:gap-3 justify-center mb-4">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (otpInputRefs.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        onPaste={index === 0 ? handleOtpPaste : undefined}
                        className="w-12 h-14 sm:w-14 sm:h-16 bg-[#18181b] border border-[#27272a] rounded-xl text-white text-center text-xl sm:text-2xl font-semibold focus:outline-none focus:border-[#06b6d4] transition-all"
                        maxLength={1}
                        disabled={isLoading}
                      />
                    ))}
                  </div>
                  
                  {error && (
                    <div className="flex items-center gap-2 text-[#fb2c36] text-sm justify-center">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}
                </div>

                {/* Resend OTP */}
                <div className="text-center">
                  {resendTimer > 0 ? (
                    <p className="text-sm text-[#9f9fa9]">
                      Resend code in <span className="text-[#06b6d4] font-medium">{resendTimer}s</span>
                    </p>
                  ) : (
                    <button
                      onClick={handleResendOtp}
                      disabled={isLoading}
                      className="text-sm text-[#06b6d4] hover:text-[#0891b2] font-medium transition-colors disabled:opacity-50"
                    >
                      Resend Code
                    </button>
                  )}
                </div>

                {/* Verify Button */}
                <button
                  onClick={() => handleOtpSubmit()}
                  disabled={isLoading || otp.some(digit => !digit)}
                  className="w-full py-3.5 bg-[#06b6d4] text-white rounded-xl font-semibold hover:bg-[#0891b2] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Verifying...</span>
                    </div>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Verify & Continue</span>
                    </>
                  )}
                </button>

                {/* Back Button */}
                <button
                  onClick={handleBack}
                  disabled={isLoading}
                  className="w-full py-3 text-[#9f9fa9] hover:text-white transition-colors text-sm disabled:opacity-50"
                >
                  Change Phone Number
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-[#71717b]">
            Need help?{' '}
            <a href="#" className="text-[#9ae600] hover:underline">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
