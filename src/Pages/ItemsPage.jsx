import  { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProducts } from '../../firebaseService';
import { useCart } from '../Componenets/CartContext';
import { FiShoppingCart, FiStar, FiChevronRight, FiHome, FiFilter, FiPackage , FiInfo ,FiPlus ,FiHeart} from 'react-icons/fi';

const ItemsPage = () => {
  const { category } = useParams();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Subcategories for each main category
  const subCategories = {
    'shoes': ['All', 'Sneakers', 'Boots', 'Sandals', 'Formal'],
    'watches': ['All', 'Smart', 'Analog', 'Digital', 'Luxury'],
    'phones': ['All', 'Smartphones', 'Accessories', 'Cases'],
    'clothing': ['All', 'Men', 'Women', 'Kids']
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        const filtered = data.filter(
          product => product.category?.toLowerCase() === category.toLowerCase()
        );
        setItems(filtered);
        setFilteredItems(filtered);
        setActiveFilter('All'); // Reset filter when category changes
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [category]);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    if (filter === 'All') {
      setFilteredItems(items);
    } else {
      const filtered = items.filter(item => 
        item.subcategory?.toLowerCase() === filter.toLowerCase()
      );
      setFilteredItems(filtered);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);
    // Visual feedback
    const button = e.target.closest('button');
    if (button) {
      button.classList.add('animate-ping');
      setTimeout(() => button.classList.remove('animate-ping'), 500);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] bg-[#222831] min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00ADB5]"></div>
        <p className="mt-4 text-[#EEEEEE]">Loading {category} collection...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
     <div className="text-center py-20 bg-gradient-to-br from-gray-900 to-gray-800 px-4">
  {/* Animated icon container */}
  <div className="mx-auto w-28 h-28 bg-gray-700/50 rounded-full flex items-center justify-center mb-6 relative">
    <div className="absolute inset-0 border-2 border-dashed border-indigo-400/30 rounded-full animate-spin-slow"></div>
    <FiShoppingCart className="text-indigo-400 text-4xl" />
  </div>

  {/* Text content */}
  <h3 className="text-2xl font-semibold text-white mb-2">
    No {category} available
  </h3>
  <p className="text-gray-400 max-w-md mx-auto">
    We're currently restocking these items. Check back soon or browse similar products.
  </p>

  {/* Action buttons */}
  <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
    <button 
      onClick={() => navigate('/')}
      className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center mx-auto shadow-md hover:shadow-indigo-500/20"
    >
      <FiHome className="mr-2" />
      Back to Home
    </button>
    <button 
      onClick={() => navigate('/products')}
      className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700/50 transition-colors flex items-center justify-center mx-auto"
    >
      <FiGrid className="mr-2" />
      Browse Products
    </button>
  </div>

  {/* Optional countdown timer */}
  <div className="mt-8 inline-flex items-center px-4 py-2 bg-gray-800 rounded-full text-sm text-gray-400">
    <FiClock className="mr-2" />
    New stock arriving in: 
    <span className="ml-1 font-medium text-indigo-400">3-5 days</span>
  </div>
</div>
    );
  }

  return (
<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    {/* Header Section */}
    <div className="mb-12">
      <nav className="flex items-center text-sm text-gray-600 mb-6">
        <button 
          onClick={() => navigate('/')} 
          className="hover:text-teal-600 flex items-center transition-colors"
        >
          <FiHome className="mr-2" /> Home
        </button>
        <FiChevronRight className="mx-2 text-gray-400" />
        <span className="font-medium text-teal-600 capitalize">{category}</span>
      </nav>
      
      <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            <span className="bg-gradient-to-r from-teal-600 to-cyan-500 bg-clip-text text-transparent">
              {category} Collection
            </span>
          </h1>
          <div className="flex items-center text-gray-500">
            <FiInfo className="mr-2 text-teal-500" />
            <span>
              {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
              {activeFilter !== 'All' && ` in ${activeFilter}`}
            </span>
          </div>
        </div>
      </div>
    </div>

    {/* Filter Chips */}
    <div className="mb-12">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center text-gray-700">
          <FiFilter className="mr-2 text-teal-500" />
          <span className="font-medium">Filters:</span>
        </div>
        {(subCategories[category.toLowerCase()] || ['All']).map((filter) => (
          <button
            key={filter}
            onClick={() => handleFilterClick(filter)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeFilter === filter
                ? 'bg-gradient-to-r from-teal-600 to-cyan-500 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>

    {/* Product Grid */}
    {filteredItems.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredItems.map((item) => (
          <div 
            key={item.id} 
            className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-200 hover:border-teal-100"
            onClick={() => handleProductClick(item.id)}
          >
            <div className="relative h-72 overflow-hidden">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col items-start gap-2">
                {item.isNew && (
                  <span className="bg-teal-600 text-white text-xs px-3 py-1 rounded-full font-medium shadow-md">
                    New
                  </span>
                )}
                {item.isBestSeller && (
                  <span className="bg-amber-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-md">
                    Bestseller
                  </span>
                )}
              </div>

              {/* Quick Actions */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                  className="p-2 bg-white/90 text-gray-800 rounded-full hover:bg-teal-600 hover:text-white transition-colors shadow-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(e, item);
                  }}
                >
                  <FiShoppingCart className="w-4 h-4" />
                </button>
                <button className="p-2 bg-white/90 text-gray-800 rounded-full hover:bg-teal-600 hover:text-white transition-colors shadow-md">
                  <FiHeart className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{item.name}</h3>
                {item.rating && (
                  <div className="flex items-center bg-gray-100 px-2 py-1 rounded text-xs">
                    <FiStar className="text-amber-400 mr-1" />
                    <span className="font-medium">{item.rating}</span>
                  </div>
                )}
              </div>
              <p className="text-gray-500 text-sm mb-4 capitalize">{item.subcategory || item.category}</p>
              
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xl font-bold text-gray-900">${item.price}</span>
                  {item.originalPrice && (
                    <span className="text-sm text-gray-400 line-through ml-2">${item.originalPrice}</span>
                  )}
                </div>
                <button 
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-500 text-white text-sm rounded-lg hover:shadow-lg transition-all"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(e, item);
                  }}
                >
                  <FiPlus className="mr-2" />
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-20">
        <div className="mx-auto w-24 h-24 bg-gradient-to-r from-teal-100 to-cyan-100 rounded-full flex items-center justify-center mb-6">
          <FiPackage className="text-teal-600 text-3xl" />
        </div>
        <h3 className="text-2xl font-medium text-gray-900 mb-2">No items found</h3>
        <p className="text-gray-500 mb-6">We couldn't find any products matching your criteria</p>
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => handleFilterClick('All')}
            className="px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all"
          >
            Reset Filters
          </button>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    )}

    {/* Floating CTA */}
    {filteredItems.length > 0 && (
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => navigate('/cart')}
          className="p-4 bg-gradient-to-r from-teal-600 to-cyan-500 text-white rounded-full shadow-xl hover:shadow-2xl transition-all flex items-center"
        >
          <FiShoppingCart className="w-6 h-6" />
          <span className="ml-2 font-medium">View Cart</span>
        </button>
      </div>
    )}
  </div>
</div>
  );
};

export default ItemsPage;