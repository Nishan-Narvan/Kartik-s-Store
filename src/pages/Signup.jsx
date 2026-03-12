import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import AuthSuccessPopup from '../components/AuthSuccessPopup';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const { login } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!showSuccess) return;
    const redirectTimer = setTimeout(() => {
      navigate('/', { replace: true });
    }, 1800);

    return () => clearTimeout(redirectTimer);
  }, [showSuccess, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('PLEASE FILL THE FIELDS CORRECTLY');
      return;
    }

    if (!email.includes('@')) {
      setError('PLEASE FILL THE FIELDS CORRECTLY');
      return;
    }

    if (password.length < 6) {
      setError('PLEASE FILL THE FIELDS CORRECTLY');
      return;
    }

    if (password !== confirmPassword) {
      setError('PLEASE FILL THE FIELDS CORRECTLY');
      return;
    }

    login({ email, name });
    setShowSuccess(true);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate('/', { replace: true });
  };

  return (
    <>
      <AuthSuccessPopup
        isOpen={showSuccess}
        title="YOU'RE IN"
        message="ACCOUNT CREATED SUCCESSFULLY"
        buttonText="CONTINUE"
        onClose={handleSuccessClose}
      />
      <div className="min-h-[80vh] flex items-center justify-center px-6 py-16 bg-white">
        <div className="w-full max-w-sm">
          <div className="border border-[#e5e5e5] px-8 py-12 sm:px-12 sm:py-16">
          <div className="text-center mb-12">
            <h1 className="text-lg sm:text-xl text-black mb-2 tracking-[0.2em] uppercase">CREATE ACCOUNT</h1>
            <p className="text-[#999] text-xs tracking-wider uppercase">JOIN KARTIK TODAY</p>
          </div>

            <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="border border-black bg-white text-black px-4 py-3 text-[10px] tracking-wider uppercase">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-[#666] text-[10px] tracking-[0.15em] uppercase mb-2">
                FULL NAME
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white text-black border border-[#e5e5e5] p-4 focus:outline-none focus:border-black transition-colors text-sm"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-[#666] text-[10px] tracking-[0.15em] uppercase mb-2">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white text-black border border-[#e5e5e5] p-4 focus:outline-none focus:border-black transition-colors text-sm"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-[#666] text-[10px] tracking-[0.15em] uppercase mb-2">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white text-black border border-[#e5e5e5] p-4 focus:outline-none focus:border-black transition-colors text-sm"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-[#666] text-[10px] tracking-[0.15em] uppercase mb-2">
                CONFIRM PASSWORD
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-white text-black border border-[#e5e5e5] p-4 focus:outline-none focus:border-black transition-colors text-sm"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-4 text-[10px] tracking-[0.2em] uppercase hover:bg-[#333] transition-colors"
            >
              CREATE ACCOUNT
            </button>

            <div className="text-center">
              <p className="text-[#999] text-[10px] tracking-wider uppercase">
                ALREADY HAVE AN ACCOUNT?{' '}
                <Link to="/login" className="text-black hover:underline">
                  SIGN IN
                </Link>
              </p>
            </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
