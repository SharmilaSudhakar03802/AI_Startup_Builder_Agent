import React, { useState } from 'react';
import { ShoppingBag, Star, CheckCircle, ArrowRight, Sun, Moon, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LandingPageTab({ data }) {
  if (!data) return null;
  const { landingPageData, branding } = data;
  const [cartCount, setCartCount] = useState(0);
  const [isLightMode, setIsLightMode] = useState(false);
  const [likedItems, setLikedItems] = useState({});
  const [toastMessage, setToastMessage] = useState(null);

  const handleAddToCart = (itemName) => {
    setCartCount(prev => prev + 1);
    setToastMessage(`Added "${itemName}" to cart!`);
    
    // Trigger celebratory confetti effect!
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.8 }
    });

    setTimeout(() => setToastMessage(null), 2500);
  };

  const toggleLike = (idx) => {
    setLikedItems(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="space-y-4">
      {/* Interactive Controls Bar */}
      <div className="glass-panel p-4 flex flex-wrap items-center justify-between gap-4 border border-indigo-500/30">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Live Interactive Landing Page Preview
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={() => setIsLightMode(!isLightMode)}
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-2 transition"
          >
            {isLightMode ? <Moon className="w-3.5 h-3.5 text-indigo-400" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
            <span>{isLightMode ? 'Switch Dark' : 'Switch Light'}</span>
          </button>

          {/* Cart Badge */}
          <div className="px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold flex items-center gap-2">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Basket ({cartCount})</span>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 bg-emerald-600 text-white rounded-xl shadow-2xl font-bold text-xs flex items-center gap-2 animate-bounce">
          <CheckCircle className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* RENDERED STARTUP WEBSITE CONTAINER */}
      <div className={`rounded-2xl border transition-all overflow-hidden ${
        isLightMode ? 'bg-slate-50 text-slate-900 border-slate-300' : 'bg-slate-950 text-slate-100 border-slate-800'
      }`}>
        {/* Navigation Bar */}
        <nav className={`px-6 py-4 border-b flex items-center justify-between ${
          isLightMode ? 'bg-white/80 border-slate-200' : 'bg-slate-900/80 border-slate-800'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 text-white font-extrabold text-xl flex items-center justify-center shadow-lg">
              {branding.brandName.toLowerCase().includes('bakery') ? '🥐' : '⚡'}
            </div>
            <span className="font-extrabold text-xl tracking-tight">{landingPageData.brandName}</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold opacity-80">
            <a href="#showcase" className="hover:opacity-100 transition">Products & Pricing</a>
            <a href="#features" className="hover:opacity-100 transition">Why Us</a>
            <a href="#reviews" className="hover:opacity-100 transition">Reviews</a>
          </div>

          <button
            onClick={() => handleAddToCart('Sample Order')}
            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold rounded-xl text-sm transition shadow-lg shadow-amber-500/20 flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{landingPageData.ctaPrimary}</span>
          </button>
        </nav>

        {/* Hero Section */}
        <header className="px-6 py-20 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-bold mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Artisanal Quality Guaranteed</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            {landingPageData.heroHeading}
          </h1>

          <p className="text-lg md:text-xl opacity-70 mb-8 max-w-2xl mx-auto">
            {landingPageData.heroSubtext}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleAddToCart('First Box')}
              className="w-full sm:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl text-lg transition flex items-center justify-center gap-2 shadow-xl shadow-amber-500/30"
            >
              <span>{landingPageData.ctaPrimary}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Features Grid */}
        <section id="features" className={`px-6 py-16 border-t ${isLightMode ? 'bg-slate-100/50 border-slate-200' : 'bg-slate-900/40 border-slate-900'}`}>
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

        {/* Showcase Grid */}
        <section id="showcase" className="px-6 py-16 max-w-6xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center mb-10">Our Featured Selection</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {landingPageData.products.map((p, idx) => (
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
                  onClick={() => handleAddToCart(p.name)}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-md shadow-amber-500/20"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Order</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Customer Testimonials */}
        <section id="reviews" className={`px-6 py-16 border-t ${isLightMode ? 'bg-slate-100/50 border-slate-200' : 'bg-slate-900/40 border-slate-900'}`}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Loved by Early Customers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {landingPageData.testimonials.map((t, idx) => (
                <div key={idx} className={`p-6 rounded-2xl border ${
                  isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
                }`}>
                  <div className="flex gap-1 text-amber-400 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm italic opacity-80 mb-4">{t.quote}</p>
                  <p className="text-xs font-bold opacity-60">— {t.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
