import { useEffect, useState } from 'react';

const AuthSuccessPopup = ({ isOpen, title, message, buttonText, onClose }) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    setIsVisible(isOpen);
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/30"
        onClick={() => {
          setIsVisible(false);
          onClose();
        }}
      />

      <div className="relative bg-white border border-[#e5e5e5] p-12 sm:p-16 max-w-sm w-full animate-fadeIn">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 border-2 border-black rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h2 className="text-center text-lg sm:text-xl text-black mb-4 tracking-[0.15em] uppercase font-normal">
          {title}
        </h2>

        <p className="text-center text-[#666] text-xs sm:text-sm tracking-wider mb-8 uppercase">
          {message}
        </p>

        <button
          onClick={() => {
            setIsVisible(false);
            onClose();
          }}
          className="w-full border border-black bg-white px-6 py-3 text-[10px] tracking-[0.2em] uppercase text-black transition-all duration-300 hover:bg-black hover:text-white"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default AuthSuccessPopup;