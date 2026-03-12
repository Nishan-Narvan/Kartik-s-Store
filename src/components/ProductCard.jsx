import { useStore } from '../context/StoreContext';

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, showToast } = useStore();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    showToast('ADDED TO BAG');
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(product);
  };

  const inWishlist = isInWishlist(product.id);

  return (
    <div className="group w-full max-w-none">
      {/* Image Container */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#f5f5f5] mb-6">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-102"
        />
        
        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-black text-white text-[9px] tracking-[0.15em] px-2 py-1 uppercase">
            {product.badge}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 w-8 h-8 bg-white flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
        >
          <svg
            className="w-4 h-4"
            fill={inWishlist ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Quick Add */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAddToCart}
            className="w-full bg-black text-white py-3 text-[10px] tracking-[0.2em] uppercase hover:bg-[#333] transition-colors"
          >
            ADD TO BAG
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="text-center px-2">
        <p className="text-[9px] text-[#999] tracking-[0.15em] uppercase mb-1">{product.category}</p>
        <h3 className="text-xs sm:text-sm text-black tracking-[0.1em] uppercase mb-2 truncate">{product.name}</h3>
        <div className="flex items-center justify-center gap-2">
          <span className="text-xs text-black tracking-wider">
            ₹{product.price.toLocaleString()}
          </span>
          {product.oldPrice && (
            <span className="text-[10px] text-[#999] line-through">
              ₹{product.oldPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
