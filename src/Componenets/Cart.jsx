import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { FiShoppingCart, FiTrash2, FiPlus, FiMinus, FiArrowLeft, FiShoppingBag ,FiCreditCard  } from 'react-icons/fi';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [user, setUser] = useState(null);
  const [authChecking, setAuthChecking] = useState(true);
  const navigate = useNavigate();
  const [loadingRemoveIds, setLoadingRemoveIds] = useState([]);
  const [loadingQuantityIds, setLoadingQuantityIds] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthChecking(false);
      if (!currentUser) {
        navigate('/login', { state: { from: '/cart' } });
      }
    });
    return unsubscribe;
  }, [navigate]);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const handleQuantityUpdate = async (item, amount) => {
    if (!user) return;
    
    const newQty = item.quantity + amount;
    if (newQty < 1) return;

    setLoadingQuantityIds((prev) => [...prev, item.id]);
    try {
      await updateQuantity(item.id, amount);
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      setLoadingQuantityIds((prev) => prev.filter((id) => id !== item.id));
    }
  };

  const handleRemove = async (id) => {
    if (!user) return;
    
    setLoadingRemoveIds((prev) => [...prev, id]);
    try {
      await removeFromCart(id);
    } catch (error) {
      console.error('Error removing item:', error);
    } finally {
      setLoadingRemoveIds((prev) => prev.filter((itemId) => itemId !== id));
    }
  };

  const isProcessing = loadingRemoveIds.length > 0 || loadingQuantityIds.length > 0;

  if (authChecking) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#222831]">
        <div className="text-center">
          <div className="inline-block h-12 w-12 border-4 border-[#00ADB5] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-[#EEEEEE]">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#222831]">
        <div className="text-center">
          <div className="inline-block h-12 w-12 border-4 border-[#00ADB5] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-[#EEEEEE]">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto">
    {/* Header */}
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-teal-600 hover:text-teal-700 transition-colors"
      >
        <FiArrowLeft className="mr-2" />
        Continue Shopping
      </button>
      <h1 className="text-3xl font-bold text-gray-900">Your Shopping Cart</h1>
      <div className="hidden sm:block w-24"></div> {/* Spacer for alignment */}
    </div>

    {cartItems.length === 0 ? (
      <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="mx-auto w-24 h-24 bg-teal-50 rounded-full flex items-center justify-center mb-6">
          <FiShoppingCart className="text-teal-600 text-3xl" />
        </div>
        <h3 className="text-2xl font-medium text-gray-900 mb-3">Your cart is empty</h3>
        <p className="text-gray-600 mb-6">Start adding items to see them here</p>
        <Link 
          to="/" 
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all"
        >
          <FiShoppingBag className="mr-2" />
          Browse Products
        </Link>
      </div>
    ) : (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200"
            >
              <div className="p-5 flex flex-col sm:flex-row gap-5">
                {/* Product Image */}
                <div className="w-full sm:w-40 h-40 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain p-4"
                  />
                </div>
                
                {/* Product Info */}
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-gray-500 text-sm capitalize">{item.category}</p>
                    </div>
                    <p className="text-xl font-bold text-teal-600">${item.price}</p>
                  </div>
                  
                  {/* Quantity Controls */}
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                      <button
                        onClick={() => handleQuantityUpdate(item, -1)}
                        disabled={loadingQuantityIds.includes(item.id) || loadingRemoveIds.includes(item.id)}
                        className={`p-2 px-4 ${
                          loadingQuantityIds.includes(item.id) 
                            ? 'bg-gray-100 text-gray-400' 
                            : 'bg-white hover:bg-gray-100 text-gray-700'
                        } transition-colors`}
                      >
                        {loadingQuantityIds.includes(item.id) ? (
                          <span className="inline-block h-4 w-4 border-2 border-teal-600 border-t-transparent rounded-full animate-spin"></span>
                        ) : (
                          <FiMinus />
                        )}
                      </button>
                      <span className="px-4 py-2 bg-white text-gray-900 font-medium border-x border-gray-300">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityUpdate(item, 1)}
                        disabled={loadingQuantityIds.includes(item.id) || loadingRemoveIds.includes(item.id)}
                        className={`p-2 px-4 ${
                          loadingQuantityIds.includes(item.id) 
                            ? 'bg-gray-100 text-gray-400' 
                            : 'bg-white hover:bg-gray-100 text-gray-700'
                        } transition-colors`}
                      >
                        <FiPlus />
                      </button>
                    </div>
                    
                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemove(item.id)}
                      disabled={loadingRemoveIds.includes(item.id) || loadingQuantityIds.includes(item.id)}
                      className={`flex items-center px-4 py-2 rounded-lg ${
                        loadingRemoveIds.includes(item.id)
                          ? 'bg-gray-100 text-gray-400'
                          : 'text-red-600 hover:bg-red-50'
                      } transition-colors`}
                    >
                      {loadingRemoveIds.includes(item.id) ? (
                        <>
                          <span className="inline-block h-4 w-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin mr-2"></span>
                          Removing
                        </>
                      ) : (
                        <>
                          <FiTrash2 className="mr-2" />
                          Remove
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">
              Order Summary
            </h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({calculateItemCount()} items):</span>
                <span className="text-gray-900 font-medium">
                  ${calculateTotal().toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping:</span>
                <span className="text-gray-900 font-medium">FREE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Tax:</span>
                <span className="text-gray-900 font-medium">${(calculateTotal() * 0.08).toFixed(2)}</span>
              </div>
            </div>
            
            <div className="py-4 border-t border-b border-gray-200 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-teal-600">
                  ${(calculateTotal() * 1.08).toFixed(2)}
                </span>
              </div>
            </div>
            
            <button
              className={`w-full py-4 px-6 rounded-lg font-bold transition-all flex items-center justify-center ${
                cartItems.length === 0 || isProcessing
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-teal-600 to-cyan-500 hover:from-teal-700 hover:to-cyan-600 text-white shadow-md hover:shadow-lg'
              }`}
              disabled={cartItems.length === 0 || isProcessing}
              onClick={() => navigate('/checkout')}
            >
              {isProcessing ? (
                <>
                  <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                  Processing...
                </>
              ) : (
                <>
                  <FiCreditCard className="mr-3" />
                  Proceed to Checkout
                </>
              )}
            </button>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or checkout with</span>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button className="p-2 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <span className="text-sm font-medium">Google Pay</span>
                </button>
                <button className="p-2 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <span className="text-sm font-medium">Apple Pay</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
</div>
  );
};

export default Cart;