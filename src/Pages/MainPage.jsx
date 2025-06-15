import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();

 const productCategories = [
  {
    id: 1,
    name: 'Shoes',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Elevate every step with our premium footwear collection, combining innovative comfort with trendsetting designs.'
  },
  {
    id: 2,
    name: 'Watches',
    imageUrl: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Precision meets elegance in our curated timepiece collection for every occasion and lifestyle.'
  },
  {
    id: 3,
    name: 'Phones',
    imageUrl: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Next-generation smartphones featuring revolutionary technology and sleek, modern designs.'
  },
  {
    id: 4,
    name: 'Clothing',
    imageUrl: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Contemporary apparel designed for comfort, durability, and effortless style in every season.'
  }
];

  const handleItemClick = (itemName) => {
    navigate(`/item/${itemName.toLowerCase()}`);
  };

  const ItemCard = ({ item }) => (
    <div className="group flex flex-col bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div
        className="h-60 overflow-hidden cursor-pointer relative"
        onClick={() => handleItemClick(item.name)}
      >
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{item.description}</p>
        <button
          onClick={() => handleItemClick(item.name)}
          className="mt-auto w-full py-3 px-4 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm group-hover:shadow-md"
        >
          View Collection
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center bg-gray-50">
      {/* Hero Section */}
 {/* Hero Section - 2x2 Grid Design */}
<section className="w-full min-h-screen bg-gray-50 overflow-hidden">
  {/* Grid Layout */}
  <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-2 lg:grid-rows-2 gap-0 h-full">
    {/* Top Left - Text Content */}
    <div className="bg-gradient-to-br from-indigo-900 to-violet-800 p-8 sm:p-12 md:p-16 flex flex-col justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMC41Ij48cGF0aCBkPSJNMC41IDBoMzltLTM5IDM5aDM5TTAgMzkuNUgzOSIvPjwvc3ZnPg==')]"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 rounded-full blur-3xl"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-lg">
        <div className="inline-flex items-center px-4 py-2 mb-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
          <span className="text-sm font-medium text-white">New Arrivals</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
          <span className="block mb-2">Elevate Your</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-indigo-300">Everyday Style</span>
        </h1>
        
        <p className="text-lg text-gray-200 mb-8 leading-relaxed">
          Discover our premium collections crafted for those who appreciate quality and timeless design.
        </p>
        
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => handleItemClick('shoes')}
            className="px-6 py-3 bg-white text-indigo-800 font-medium rounded-lg hover:bg-gray-100 transition-all"
          >
            Shop Collection
          </button>
          <button
            onClick={() => navigate('/about')}
            className="px-6 py-3 border-2 border-white/30 text-white font-medium rounded-lg hover:border-white/60 hover:bg-white/10 transition-all"
          >
            Our Story
          </button>
        </div>
      </div>
    </div>

    {/* Top Right - Product Image */}
    <div className="bg-gray-100 relative overflow-hidden group">
      <img
        src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80"
        alt="Premium Shoes"
        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute bottom-8 left-8">
        <span className="inline-block px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg text-gray-900 font-medium shadow-sm">
          Spring Collection
        </span>
      </div>
    </div>

    {/* Bottom Left - Secondary Product Image */}
    <div className="bg-gray-200 relative overflow-hidden group order-last lg:order-none">
      <img
        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1099&q=80"
        alt="Luxury Watch"
        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute bottom-8 left-8">
        <span className="inline-block px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg text-gray-900 font-medium shadow-sm">
          Timeless Pieces
        </span>
      </div>
    </div>

    {/* Bottom Right - Stats/Features */}
    <div className="bg-white p-8 sm:p-12 md:p-16 flex flex-col justify-center">
      <div className="max-w-lg">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
          Why Choose Elite Horizon
        </h2>
        
        <div className="space-y-6">
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-indigo-100 p-2 rounded-lg mr-4">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Premium Quality</h3>
              <p className="text-gray-600 mt-1">Materials selected for durability and comfort</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-indigo-100 p-2 rounded-lg mr-4">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Fast Shipping</h3>
              <p className="text-gray-600 mt-1">Get your order in 2-3 business days</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-indigo-100 p-2 rounded-lg mr-4">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Secure Payment</h3>
              <p className="text-gray-600 mt-1">100% secure checkout process</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
      {/* Intro Section */}
 

      {/* Category Grid */}
    {/* Modern Product Categories Section */}
<section className="w-full bg-gradient-to-b from-white to-gray-50 py-16 sm:py-24">
  <div className="container mx-auto px-4 sm:px-6">
    {/* Section Header (optional) */}
    <div className="text-center mb-12 sm:mb-16">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
        Shop Our Collections
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Discover products crafted for quality and style
      </p>
    </div>

    {/* Enhanced Grid Layout */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
      {productCategories.map((item) => (
        <div 
          key={item.id} 
          className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
        >
          {/* Image Container */}
          <div className="relative h-60 sm:h-72 overflow-hidden">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          {/* Content Container */}
          <div className="p-5 sm:p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-1.5">
              {item.name}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {item.description}
            </p>
            <button
              onClick={() => handleItemClick(item.name)}
              className="w-full flex items-center justify-between text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <span>View Collection</span>
              <svg 
                className="w-4 h-4 ml-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

          {/* Floating Badge (optional) */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-medium shadow-sm">
            New
          </div>
        </div>
      ))}
    </div>

    {/* View All Button (optional) */}
     
  </div>
</section>
    {/* Modern CTA Section */}
{/* Medium CTA Banner */}
<section className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 py-14 sm:py-16">
  <div className="container mx-auto px-4">
    <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      {/* Text Content */}
      <div className="text-center md:text-left">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Ready to Get Started?
        </h2>
        <p className="text-indigo-100 sm:text-lg">
          Create your free account and unlock exclusive benefits
        </p>
      </div>

      {/* CTA Button */}
      <button
        onClick={() => navigate('/signup')}
        className="shrink-0 px-8 py-3.5 bg-white text-indigo-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-md hover:shadow-lg whitespace-nowrap"
      >
        Create Account
        <svg 
          className="w-4 h-4 ml-2 inline" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </div>
  </div>
</section>
    </div>
  );
};

export default MainPage;