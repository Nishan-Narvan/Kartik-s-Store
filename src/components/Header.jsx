import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { useState } from 'react';

const Header = () => {
  const { cartCount, wishlistCount, user, logout, activeFilter, setActiveFilter } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navFilters = [
    { name: 'ALL', filter: 'ALL' },
    { name: "MEN'S", filter: 'MEN' },
    { name: "WOMEN'S", filter: 'WOMEN' },
    { name: 'JEWELLERY', filter: 'JEWELLERY' },
    { name: 'OFFERS', filter: 'OFFERS' },
  ];

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Main Header */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white border-b border-[#e5e5e5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 3xl:max-w-full 3xl:px-16">
          <div className="flex items-center justify-between h-10 md:h-10">
            {/* Logo */}
            <Link to="/" onClick={() => setActiveFilter('ALL')} className="flex items-center">
              <span className="text-sm sm:text-base md:text-lg tracking-[0.3em] text-black uppercase font-normal p-2 ml-3 sm:ml-4 md:ml-6">
                KARTIK'S STORE
              </span>
            </Link>

            {/* Action Icons */}
            <div className="flex items-center gap-4 sm:gap-5">
              {/* Account */}
              {user ? (
                <div className="relative group">
                  <button className="p-1.5 text-black hover:opacity-60 transition-opacity">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-[#e5e5e5] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-lg">
                    <div className="p-3 border-b border-[#e5e5e5]">
                      <p className="text-black text-xs uppercase tracking-wider">{user.name}</p>
                      <p className="text-[#666] text-[10px]">{user.email}</p>
                    </div>
                    <button
                      onClick={logout}
                      className="w-full text-left px-3 py-2 text-[#666] hover:bg-[#f5f5f5] hover:text-black text-xs uppercase tracking-wider transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="p-1.5 text-black hover:opacity-60 transition-opacity">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </Link>
              )}

              {/* Wishlist */}
              <Link to="/wishlist" className="p-1.5 text-black hover:opacity-60 transition-opacity relative">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] w-4 h-4 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link to="/cart" className="p-1.5 text-black hover:opacity-60 transition-opacity relative">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 text-black lg:hidden"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Bar - Filter Links */}
        <nav className="hidden lg:block border-t border-[#e5e5e5] bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 3xl:max-w-full 3xl:px-16">
            <ul className="flex items-center justify-center gap-12 h-10">
              {navFilters.map((item) => (
                <li key={item.filter}>
                  <button
                    onClick={() => handleFilterClick(item.filter)}
                    className={`text-[11px] tracking-[0.2em] uppercase transition-colors ${
                      activeFilter === item.filter
                        ? 'text-black'
                        : 'text-[#999] hover:text-black'
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 bg-white animate-slideIn shadow-xl">
            <div className="p-6 border-b border-[#e5e5e5]">
              <span className="text-sm tracking-[0.3em] text-black uppercase">
                KARTIK
              </span>
            </div>
            <ul className="px-6 py-4">
              {navFilters.map((item) => (
                <li key={item.filter}>
                  <button
                    onClick={() => handleFilterClick(item.filter)}
                    className={`block w-full text-left py-3 text-xs tracking-[0.15em] border-b border-[#e5e5e5] uppercase ${
                      activeFilter === item.filter
                        ? 'text-black'
                        : 'text-[#666] hover:text-black'
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
