import { useRef, useState, useEffect } from 'react';
import { products } from '../data/products';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';

const bannerImages = [
  '/assets/images/banners/1.png',
  '/assets/images/banners/2.jpg',
  '/assets/images/banners/3.jpg',
  '/assets/images/banners/4.jpg',
  '/assets/images/banners/5.jpg',
  '/assets/images/banners/6.jpg',
  '/assets/images/banners/7.jpg',
];

const saleBannerImage = '/assets/images/banners/2.jpg';

const Home = () => {
  const { activeFilter } = useStore();
  const productsRef = useRef(null);
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Define which categories belong to Men/Women
  const menCategories = ['Clothes', 'Jackets', 'Sports', 'Watches', 'Footwear', 'Shorts', 'Belt'];
  const womenCategories = ['Party Wear', 'Jewellery', 'Perfume'];
  
  // Filter products based on activeFilter from header nav
  const getFilteredProducts = () => {
    switch (activeFilter) {
      case 'MEN':
        return products.filter(p => menCategories.includes(p.category));
      case 'WOMEN':
        return products.filter(p => womenCategories.includes(p.category));
      case 'JEWELLERY':
        return products.filter(p => p.category === 'Jewellery');
      case 'OFFERS':
        return products.filter(p => p.badge && (p.badge.includes('OFF') || p.badge === 'HOT' || p.badge === 'SALE'));
      default:
        return products;
    }
  };

  const filteredProducts = getFilteredProducts();
  
  // Featured & New Arrivals (always from all products)
  const featuredProducts = products.filter(p => p.trending).slice(0, 4);
  const newArrivals = products.filter(p => p.newArrival).slice(0, 4);

  // Products to display (show all by default)
  const displayProducts = filteredProducts;

  // Get filter title
  const getFilterTitle = () => {
    switch (activeFilter) {
      case 'MEN': return "MEN'S COLLECTION";
      case 'WOMEN': return "WOMEN'S COLLECTION";
      case 'JEWELLERY': return 'JEWELLERY';
      case 'OFFERS': return 'SPECIAL OFFERS';
      default: return 'ALL PRODUCTS';
    }
  };

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner Carousel - pure carousel, no overlay text */}
      <section className="w-full overflow-hidden pt-8 sm:pt-14 md:pt-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 3xl:max-w-full 3xl:px-16">
          <div className="relative h-[42vh] sm:h-[54vh] md:h-[66vh] lg:h-[78vh] overflow-hidden rounded-sm">
            <img
              src={bannerImages[currentBanner]}
              alt={`Banner ${currentBanner + 1}`}
              className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700"
              style={{ zIndex: 1 }}
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
              {bannerImages.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-2 h-2 rounded-full ${idx === currentBanner ? 'bg-white' : 'bg-white/40'} transition-colors`}
                  onClick={() => setCurrentBanner(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-center pt-6 sm:pt-8">
            <button
              onClick={scrollToProducts}
              className="border border-black bg-white px-10 sm:px-14 py-3 text-[10px] sm:text-xs tracking-[0.3em] uppercase text-black transition-all duration-300 hover:bg-black hover:text-white"
            >
              SHOP NOW
            </button>
          </div>
        </div>
      </section>

      {/* Featured Section - Only show on ALL filter */}
      {activeFilter === 'ALL' && (
        <section className="w-full py-20 md:py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 3xl:max-w-full 3xl:px-16">
            <div className="text-center mb-12 sm:mb-16">
              <p className="text-[10px] tracking-[0.4em] text-[#999] uppercase mb-4">CURATED SELECTION</p>
              <h2 className="text-lg sm:text-xl md:text-2xl text-black tracking-[0.2em] uppercase">FEATURED</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Banner Section - Only show on ALL filter */}
      {activeFilter === 'ALL' && (
        <section className="relative w-full h-[45vh] sm:h-[55vh] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${saleBannerImage})` }}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative h-full flex items-center justify-center text-center px-6">
            <div>
              <p className="text-[10px] tracking-[0.4em] text-white/80 uppercase mb-6">LIMITED TIME</p>
              <h2 className="text-xl sm:text-2xl md:text-4xl text-white mb-8 tracking-[0.15em] uppercase">
                UP TO 50% OFF
              </h2>
              <button 
                onClick={scrollToProducts}
                className="border border-white text-white px-12 py-4 text-[10px] tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-300"
              >
                SHOP SALE
              </button>
            </div>
          </div>
        </section>
      )}

      {/* New Arrivals - Only show on ALL filter */}
      {activeFilter === 'ALL' && (
        <section className="w-full py-20 md:py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 3xl:max-w-full 3xl:px-16">
            <div className="text-center mb-12 sm:mb-16">
              <p className="text-[10px] tracking-[0.4em] text-[#999] uppercase mb-4">JUST IN</p>
              <h2 className="text-lg sm:text-xl md:text-2xl text-black tracking-[0.2em] uppercase">NEW ARRIVALS</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products Section */}
      <section ref={productsRef} className="w-full py-20 md:py-24 border-t border-[#e5e5e5]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 3xl:max-w-full 3xl:px-16">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-[10px] tracking-[0.4em] text-[#999] uppercase mb-4">BROWSE</p>
            <h2 className="text-lg sm:text-xl md:text-2xl text-black tracking-[0.2em] uppercase">{getFilterTitle()}</h2>
          </div>

          {/* Products Count */}
          <div className="text-center mb-12 sm:mb-14">
            <p className="text-[#999] text-[10px] tracking-[0.2em] uppercase">
              {displayProducts.length === filteredProducts.length 
                ? `${filteredProducts.length} ITEMS`
                : `SHOWING ${displayProducts.length} OF ${filteredProducts.length} ITEMS`
              }
            </p>
          </div>
          
          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
              {displayProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-[#999] text-sm tracking-wider uppercase">NO PRODUCTS FOUND</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
