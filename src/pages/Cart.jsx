import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useStore } from '../context/StoreContext';
import OrderConfirmation from '../components/OrderConfirmation';

const Cart = () => {
  const {
    cart,
    removeFromCart,
    updateQty,
    clearCart,
    cartSubtotal,
    deliveryFee,
    gst,
    cartTotal,
  } = useStore();
  
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleCheckout = () => {
    setShowConfirmation(true);
  };

  const handleConfirmationClose = () => {
    clearCart();
    setShowConfirmation(false);
  };

  if (cart.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-240px)] px-4 bg-white">
        <div className="text-center">
          <span className="text-6xl sm:text-7xl mb-6 block">🛒</span>
          <h2 className="text-lg sm:text-xl text-black mb-3 tracking-[0.2em] uppercase">YOUR BAG IS EMPTY</h2>
          <p className="text-[#666] text-xs sm:text-sm mb-8 tracking-wider max-w-sm">LOOKS LIKE YOU HAVEN'T ADDED ANYTHING YET</p>
          <Link
            to="/"
            className="inline-block border border-black text-black px-10 py-3 text-[10px] tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-all duration-300"
          >
            CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <OrderConfirmation
        isOpen={showConfirmation}
        onClose={handleConfirmationClose}
      />
      <div className="w-full bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 min-h-[calc(100vh-240px)] 3xl:max-w-full 3xl:px-16">
          <h1 className="text-xl sm:text-2xl text-black mb-12 tracking-[0.2em] uppercase font-normal">
            SHOPPING BAG
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Cart Items - Takes 2 columns on desktop */}
            <div className="lg:col-span-2">
              <div className="border-b border-[#e5e5e5]">
                <div className="divide-y divide-[#e5e5e5]">
                  {cart.map((item) => (
                    <div key={item.id} className="py-8">
                      <div className="flex gap-6">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <img
                            src={item.img}
                            alt={item.name}
                            className="w-24 sm:w-32 aspect-3/4 object-cover"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 flex flex-col">
                          <div className="mb-6">
                            <p className="text-[9px] text-[#999] tracking-wider uppercase mb-1">{item.category}</p>
                            <h3 className="text-sm text-black tracking-widest uppercase mb-3">{item.name}</h3>
                            <p className="text-sm text-black font-normal">₹{item.price.toLocaleString()}</p>
                          </div>

                          {/* Quantity and Actions */}
                          <div className="flex flex-col sm:flex-row sm:items-center gap-6 mt-auto">
                            {/* Quantity Selector */}
                            <div className="flex items-center border border-[#e5e5e5] w-fit">
                              <button
                                onClick={() => updateQty(item.id, item.qty - 1)}
                                className="w-10 h-10 flex items-center justify-center text-[#666] hover:text-black transition-colors text-lg"
                              >
                                −
                              </button>
                              <span className="w-10 text-center text-black text-sm">{item.qty}</span>
                              <button
                                onClick={() => updateQty(item.id, item.qty + 1)}
                                className="w-10 h-10 flex items-center justify-center text-[#666] hover:text-black transition-colors text-lg"
                              >
                                +
                              </button>
                            </div>

                            {/* Remove and Total Price */}
                            <div className="flex items-center justify-between sm:gap-12">
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-[#999] hover:text-black text-[10px] tracking-wider uppercase transition-colors"
                              >
                                REMOVE
                              </button>
                              <span className="text-black text-sm font-normal">
                                ₹{(item.price * item.qty).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary - Sidebar */}
            <div className="lg:col-span-1">
              <div className="border border-[#e5e5e5] p-8">
                <h2 className="text-sm text-black mb-8 tracking-[0.2em] uppercase">ORDER SUMMARY</h2>

                <div className="space-y-4 mb-8 text-xs tracking-wider">
                  <div className="flex justify-between text-[#666]">
                    <span>SUBTOTAL</span>
                    <span className="text-black">₹{cartSubtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[#666]">
                    <span>DELIVERY</span>
                    <span className="text-black">{deliveryFee === 0 ? 'COMPLIMENTARY' : `₹${deliveryFee}`}</span>
                  </div>
                  {deliveryFee > 0 && (
                    <p className="text-[10px] text-[#999] mt-2">
                      ADD ₹{(4500 - cartSubtotal).toLocaleString()} MORE FOR COMPLIMENTARY DELIVERY
                    </p>
                  )}
                  <div className="flex justify-between text-[#666]">
                    <span>GST (18%)</span>
                    <span className="text-black">₹{gst.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-[#e5e5e5] pt-4 mt-4">
                    <div className="flex justify-between">
                      <span className="text-black text-sm uppercase">TOTAL</span>
                      <span className="text-black text-sm">₹{cartTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-black text-white py-4 text-[10px] tracking-[0.2em] uppercase hover:bg-[#333] transition-colors duration-200"
                >
                  CHECKOUT
                </button>

                <Link
                  to="/"
                  className="block text-center text-[#999] hover:text-black text-[10px] tracking-wider uppercase mt-6 transition-colors"
                >
                  CONTINUE SHOPPING
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
