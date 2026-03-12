import { createContext, useContext, useState, useEffect } from 'react';

const StoreContext = createContext();

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

export const StoreProvider = ({ children }) => {
  // Initialize state from localStorage
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('kartik-cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('kartik-wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('kartik-user');
    return saved ? JSON.parse(saved) : null;
  });

  const [toast, setToast] = useState(null);

  // Active filter for product listing (ALL, MEN, WOMEN, OFFERS, etc.)
  const [activeFilter, setActiveFilter] = useState('ALL');

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('kartik-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('kartik-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('kartik-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('kartik-user');
    }
  }, [user]);

  // Cart functions
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`${product.name} added to cart!`);
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
    showToast('Item removed from cart');
  };

  const updateQty = (productId, qty) => {
    if (qty < 1) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, qty } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist functions
  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        showToast(`${product.name} removed from wishlist`);
        return prev.filter(item => item.id !== product.id);
      }
      showToast(`${product.name} added to wishlist!`);
      return [...prev, product];
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const moveAllToCart = () => {
    wishlist.forEach(item => {
      if (!cart.find(cartItem => cartItem.id === item.id)) {
        setCart(prev => [...prev, { ...item, qty: 1 }]);
      }
    });
    setWishlist([]);
    showToast('All items moved to cart!');
  };

  // Auth functions
  const login = (name, email) => {
    setUser({ name, email });
    showToast(`Welcome back, ${name}! 👋`);
  };

  const logout = () => {
    setUser(null);
    showToast('Logged out successfully');
  };

  // Toast function
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Calculated values
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const wishlistCount = wishlist.length;
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryFee = cartSubtotal >= 4500 ? 0 : 99;
  const gst = Math.round(cartSubtotal * 0.18);
  const cartTotal = cartSubtotal + deliveryFee + gst;

  const value = {
    // State
    cart,
    wishlist,
    user,
    toast,
    // Cart functions
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    // Wishlist functions
    toggleWishlist,
    isInWishlist,
    moveAllToCart,
    // Auth functions
    login,
    logout,
    // Toast
    showToast,
    // Calculated
    cartCount,
    wishlistCount,
    cartSubtotal,
    deliveryFee,
    gst,
    cartTotal,
    // Filter
    activeFilter,
    setActiveFilter,
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};
