import React, { useState } from 'react';
import { ShoppingBag, Star, CheckCircle, ArrowRight, Sun, Moon, Sparkles, Heart, Smartphone, Tablet, Monitor, Edit3, Plus, X, Search, ShieldCheck, CreditCard } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LandingPageTab({ data }) {
  if (!data) return null;
  const { landingPageData, branding } = data;

  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const [deviceFrame, setDeviceFrame] = useState('desktop'); // 'desktop', 'tablet', 'mobile'
  const [likedItems, setLikedItems] = useState({});
  const [toastMessage, setToastMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Editable copy state
  const [heroTitle, setHeroTitle] = useState(landingPageData.heroHeading);
  const [ctaText, setCtaText] = useState(landingPageData.ctaPrimary);
  const [isEditing, setIsEditing] = useState(false);

  // Products list
  const [productsList, setProductsList] = useState(landingPageData.products);

  const handleAddToCart = (product) => {
    setCartItems(prev => [...prev, product]);
    setToastMessage(`Added "${product.name || product}" to basket!`);

    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.7 }
    });

    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleRemoveFromCart = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => {
      const priceNum = parseFloat((item.price || '$12.00').replace(/[^0-9.]/g, '')) || 12;
      return acc + priceNum;
    }, 0);
  };

  const toggleLike = (idx) => {
    setLikedItems(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const filteredProducts = productsList.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Real-Time Control Bar */}
      <div className="glass-panel p-4 flex flex-wrap items-center justify-between gap-4 border border-indigo-500/30">
        {/* Device Viewport Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 mr-1 hidden sm:inline">Viewport:</span>
          <button
            onClick={() => setDeviceFrame('desktop')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
              deviceFrame === 'desktop' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-4 h-4" />
            <span className="hidden sm:inline">Desktop</span>
          </button>

          <button
            onClick={() => setDeviceFrame('tablet')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
              deviceFrame === 'tablet' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Tablet className="w-4 h-4" />
            <span className="hidden sm:inline">Tablet</span>
          </button>

          <button
            onClick={() => setDeviceFrame('mobile')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
              deviceFrame === 'mobile' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span className="hidden sm:inline">Mobile</span>
          </button>
        </div>

        {/* Live Edit & Cart Triggers */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-3.5 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition ${
              isEditing ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold' : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Save Edits' : 'Live Copy Editor'}</span>
          </button>

          <button
            onClick={() => setIsLightMode(!isLightMode)}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-2 transition"
          >
            {isLightMode ? <Moon className="w-3.5 h-3.5 text-indigo-400" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
            <span>{isLightMode ? 'Dark Mode' : 'Light Mode'}</span>
          </button>

          {/* Cart Trigger Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-500/20 hover:scale-105 transition"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Basket ({cartItems.length})</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 bg-emerald-600 text-white rounded-2xl shadow-2xl font-bold text-xs flex items-center gap-2 animate-bounce">
          <CheckCircle className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* SLIDE-OUT SHOPPING CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-slate-950 border-l border-slate-800 p-6 flex flex-col justify-between shadow-2xl animate-fadeIn">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-amber-400" />
                  <h3 className="font-bold text-lg text-white">Your Order Basket</h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {cartItems.length === 0 ? (
                <div className="py-12 text-center text-slate-500 text-xs">
                  Your basket is empty. Add items from the landing page!
                </div>
              ) : (
                <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                  {cartItems.map((item, idx) => (
                    <div key={idx} className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-xs text-white">{item.name || item}</h4>
                        <p className="text-amber-400 font-extrabold text-xs">{item.price || '$12.00'}</p>
                      </div>
                      <button
                        onClick={() => handleRemoveFromCart(idx)}
                        className="text-xs text-rose-400 hover:text-rose-300"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            <div className="border-t border-slate-800 pt-4 space-y-3">
              <div className="flex justify-between items-center text-sm font-bold text-white">
                <span>Subtotal:</span>
                <span className="text-amber-400 font-mono">${calculateSubtotal().toFixed(2)}</span>
              </div>
              <button
                onClick={() => {
                  alert('Thank you for testing! Real-time order checkout simulation completed.');
                  setIsCartOpen(false);
                }}
                disabled={cartItems.length === 0}
                className="w-full py-3.5 gradient-btn text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20"
              >
                <CreditCard className="w-4 h-4" />
                <span>Complete Checkout (${calculateSubtotal().toFixed(2)})</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REAL-TIME BROWSER FRAME MOCKUP */}
      <div className={`mx-auto transition-all duration-500 browser-frame ${
        deviceFrame === 'mobile' ? 'max-w-[390px] border-[10px] border-slate-800 rounded-[38px]' :
        deviceFrame === 'tablet' ? 'max-w-[768px] border-[6px] border-slate-800 rounded-[24px]' :
        'w-full'
      }`}>
        {/* Browser Chrome Bar */}
        <div className="browser-header">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
          </div>
          <div className="px-4 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center gap-2 max-w-sm w-full mx-auto justify-center">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>https://{branding.brandName.toLowerCase().replace(/[^a-z0-9]/g, '')}.app</span>
          </div>
          <div className="w-12" />
        </div>

        {/* RENDERED STARTUP WEBSITE CANVAS */}
        <div className={`transition-all overflow-hidden ${
          isLightMode ? 'bg-slate-50 text-slate-900' : 'bg-slate-950 text-slate-100'
        }`}>
          {/* Nav */}
          <nav className={`px-6 py-4 border-b flex items-center justify-between ${
            isLightMode ? 'bg-white/90 border-slate-200' : 'bg-slate-900/90 border-slate-800'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 text-white font-extrabold text-xl flex items-center justify-center shadow-lg">
                {branding.brandName.toLowerCase().includes('bakery') ? '🥐' : '⚡'}
              </div>
              <span className="font-extrabold text-xl tracking-tight">{landingPageData.brandName}</span>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-semibold opacity-80">
              <a href="#showcase" className="hover:opacity-100 transition">Products & Menu</a>
              <a href="#features" className="hover:opacity-100 transition">Why Us</a>
              <a href="#reviews" className="hover:opacity-100 transition">Reviews</a>
            </div>

            <button
              onClick={() => handleAddToCart({ name: 'Special Box', price: '$18.00' })}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold rounded-xl text-sm transition shadow-lg shadow-amber-500/20 flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{ctaText}</span>
            </button>
          </nav>

          {/* Hero */}
          <header className="px-6 py-16 text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-bold mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Fresh Artisanal Quality Guaranteed</span>
            </div>

            {isEditing ? (
              <div className="mb-6 space-y-2 max-w-2xl mx-auto p-4 bg-slate-900/90 rounded-2xl border border-amber-500">
                <label className="block text-xs font-bold text-amber-400 text-left">Edit Hero Title:</label>
                <input
                  type="text"
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-bold text-lg"
                />
              </div>
            ) : (
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                {heroTitle}
              </h1>
            )}

            <p className="text-lg md:text-xl opacity-70 mb-8 max-w-2xl mx-auto leading-relaxed">
              {landingPageData.heroSubtext}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => handleAddToCart({ name: 'Starter Artisanal Box', price: '$24.00' })}
                className="w-full sm:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl text-lg transition flex items-center justify-center gap-2 shadow-xl shadow-amber-500/30"
              >
                <span>{ctaText}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </header>

          {/* Features */}
          <section id="features" className={`px-6 py-14 border-t ${isLightMode ? 'bg-slate-100/50 border-slate-200' : 'bg-slate-900/40 border-slate-900'}`}>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {landingPageData.features.map((feat, idx) => (
                <div key={idx} className={`p-6 rounded-2xl border transition ${
                  isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
                }`}>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold mb-4">
                    ✓
                  </div>
                  <h3 className="font-bold text-lg mb-2">{feat.title}</h3>
                  <p className="text-xs opacity-70 leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Showcase Grid with Real-Time Search Filter */}
          <section id="showcase" className="px-6 py-14 max-w-6xl mx-auto">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <h2 className="text-3xl font-extrabold">Featured Selection</h2>

              {/* Real-time search filter */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter items live..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((p, idx) => (
                <div key={idx} className={`p-6 rounded-2xl border transition relative flex flex-col justify-between ${
                  isLightMode ? 'bg-white border-slate-200 hover:shadow-xl' : 'bg-slate-900 border-slate-800 hover:border-amber-500/50'
                }`}>
                  <button
                    onClick={() => toggleLike(idx)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/40 hover:bg-slate-800 transition"
                  >
                    <Heart className={`w-4 h-4 ${likedItems[idx] ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
                  </button>

                  <div>
                    <div className="text-6xl mb-4 text-center">{p.image}</div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-amber-500/20 text-amber-500 rounded-full inline-block mb-2">
                      {p.badge}
                    </span>
                    <h3 className="font-bold text-lg mb-1">{p.name}</h3>
                    <p className="text-amber-500 font-extrabold text-xl mb-4">{p.price}</p>
                  </div>

                  <button
                    onClick={() => handleAddToCart(p)}
                    className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-md shadow-amber-500/20"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Order</span>
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
