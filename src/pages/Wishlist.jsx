import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const Wishlist = () => {
  const { wishlist, toggleWishlist, addToCart, showToast, cart } = useStore();

  const handleMoveAllToCart = () => {
    wishlist.forEach((item) => {
      if (!cart.find((c) => c.id === item.id)) {
        addToCart(item);
      }
    });
    showToast('ITEMS MOVED TO BAG');
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    showToast('ADDED TO BAG');
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 bg-white">
        <span className="text-5xl sm:text-6xl mb-6">♡</span>
        <h2 className="text-lg sm:text-xl text-black mb-2 tracking-[0.2em] uppercase">YOUR WISHLIST IS EMPTY</h2>
        <p className="text-[#666] text-xs sm:text-sm mb-8 text-center tracking-wider">SAVE ITEMS YOU LOVE BY CLICKING THE HEART ICON</p>
        <Link
          to="/"
          className="border border-black text-black px-10 py-3 text-[10px] tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-all duration-300"
        >
          EXPLORE PRODUCTS
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 bg-white min-h-screen 3xl:max-w-full 3xl:px-16">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 sm:mb-14">
        <h1 className="text-xl sm:text-2xl text-black tracking-[0.2em] uppercase">
          WISHLIST <span className="text-[#999]">({wishlist.length})</span>
        </h1>
        <button
          onClick={handleMoveAllToCart}
          className="border border-black text-black px-6 py-2 text-[10px] tracking-[0.15em] uppercase hover:bg-black hover:text-white transition-all duration-300"
        >
          MOVE ALL TO BAG
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
        {wishlist.map((item) => (
          <div key={item.id} className="group">
            <div className="relative aspect-[3/4] overflow-hidden bg-[#f5f5f5] mb-4">
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {item.badge && (
                <span className="absolute top-3 left-3 bg-black text-white text-[9px] tracking-[0.15em] px-2 py-1 uppercase">
                  {item.badge}
                </span>
              )}
              <button
                onClick={() => toggleWishlist(item)}
                className="absolute top-3 right-3 w-8 h-8 bg-black text-white flex items-center justify-center hover:bg-[#333] transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              
              <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <button
                  onClick={() => handleAddToCart(item)}
                  className="w-full bg-black text-white py-3 text-[10px] tracking-[0.2em] uppercase hover:bg-[#333] transition-colors"
                >
                  ADD TO BAG
                </button>
              </div>
            </div>

            <div className="text-center px-2">
              <p className="text-[9px] text-[#999] tracking-[0.15em] uppercase mb-1">{item.category}</p>
              <h3 className="text-xs sm:text-sm text-black tracking-[0.1em] uppercase mb-2 truncate">{item.name}</h3>
              <div className="flex items-center justify-center gap-2">
                <span className="text-xs text-black tracking-wider">₹{item.price.toLocaleString()}</span>
                {item.oldPrice && (
                  <span className="text-[10px] text-[#999] line-through">₹{item.oldPrice.toLocaleString()}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
