import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import AuthSuccessPopup from '../components/AuthSuccessPopup';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

    if (!email || !password) {
      setError('PLEASE FILL THE FIELDS CORRECTLY');
      return;
    }

    if (!email.includes('@')) {
      setError('PLEASE FILL THE FIELDS CORRECTLY');
      return;
    }

    login({ email, name: email.split('@')[0] });
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
        message="WELCOME BACK"
        buttonText="CONTINUE"
        onClose={handleSuccessClose}
      />
      <div className="min-h-[80vh] flex items-center justify-center px-6 py-16 bg-white">
        <div className="w-full max-w-sm">
          <div className="border border-[#e5e5e5] px-8 py-12 sm:px-12 sm:py-16">
          <div className="text-center mb-12 m-2 p-7">
            <h1 className="text-lg sm:text-xl text-black mb-2 tracking-[0.2em] uppercase">WELCOME BACK</h1>
            <p className="text-[#999] text-xs tracking-wider uppercase">SIGN IN TO YOUR ACCOUNT</p>
          </div>

            <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="border border-black bg-white text-black px-4 py-3 text-[10px] tracking-wider uppercase">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-[#666] text-[10px] tracking-[0.15em] uppercase mb-2 p-6 ml-3">
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

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-black" />
                <span className="text-[#666] text-[10px] tracking-wider uppercase">REMEMBER ME</span>
              </label>
              <a href="#" className="text-black text-[10px] tracking-wider uppercase hover:underline">
                FORGOT PASSWORD?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-4 text-[10px] tracking-[0.2em] uppercase hover:bg-[#333] transition-colors"
            >
              SIGN IN
            </button>

            <div className="text-center">
              <p className="text-[#999] text-[10px] tracking-wider uppercase">
                DON'T HAVE AN ACCOUNT?{' '}
                <Link to="/signup" className="text-black hover:underline">
                  CREATE ONE
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

export default Login;
