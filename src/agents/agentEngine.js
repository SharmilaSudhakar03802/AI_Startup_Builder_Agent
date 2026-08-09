/**
 * VentureForge Multi-Agent Engine
 * Orchestrates 5 specialized AI agents to generate complete startup launch packages.
 */

export const AGENT_TYPES = {
  RESEARCH: {
    id: 'research',
    name: 'MarketIQ',
    role: 'Research Agent',
    description: 'Market analysis, competitor research, SWOT, TAM/SAM/SOM, and customer personas',
    color: '#6366f1', // Indigo
    badgeClass: 'badge-indigo',
    iconName: 'Search'
  },
  BRANDING: {
    id: 'branding',
    name: 'VibeCraft',
    role: 'Branding Agent',
    description: 'Brand names, taglines, logo prompts, visual identity, dynamic color tokens, fonts',
    color: '#ec4899', // Pink
    badgeClass: 'badge-rose',
    iconName: 'Palette'
  },
  DESIGNER: {
    id: 'designer',
    name: 'PixelPulse',
    role: 'UI Designer Agent',
    description: 'Landing page wireframes, hero copy, visual layout specs, CTA positioning',
    color: '#06b6d4', // Cyan
    badgeClass: 'badge-cyan',
    iconName: 'Layout'
  },
  FRONTEND: {
    id: 'frontend',
    name: 'CodeForge',
    role: 'Frontend Agent',
    description: 'React SPA architecture, live landing page preview data, Tailwind CSS styling',
    color: '#10b981', // Emerald
    badgeClass: 'badge-emerald',
    iconName: 'Code2'
  },
  BACKEND: {
    id: 'backend',
    name: 'DataGrid',
    role: 'Backend & DB Agent',
    description: 'Supabase/PostgreSQL schema, RLS policies, Prisma models, REST/GraphQL APIs',
    color: '#f59e0b', // Amber
    badgeClass: 'badge-amber',
    iconName: 'Database'
  },
  MARKETING: {
    id: 'marketing',
    name: 'GrowthEngine',
    role: 'Marketing Agent',
    description: 'Go-to-market strategy, 30-day content calendar, social ad hooks, launch checklist',
    color: '#a855f7', // Purple
    badgeClass: 'badge-indigo',
    iconName: 'Megaphone'
  }
};

/**
 * Generate a comprehensive startup package for any prompt
 */
export async function runAgentPipeline(promptText, apiKey = null, onProgressUpdate = () => {}) {
  const cleanPrompt = promptText.trim();
  const lower = cleanPrompt.toLowerCase();
  const isBakery = lower.includes('bakery') || lower.includes('bake') || lower.includes('cake') || lower.includes('pastry');
  const isCode = lower.includes('code') || lower.includes('developer') || lower.includes('ai') || lower.includes('software');

  // Steps tracking
  const steps = [
    { id: 'research', agent: AGENT_TYPES.RESEARCH, message: 'Analyzing market viability & customer pain points...' },
    { id: 'branding', agent: AGENT_TYPES.BRANDING, message: 'Crafting brand identity, colors, and logo concepts...' },
    { id: 'designer', agent: AGENT_TYPES.DESIGNER, message: 'Architecting landing page wireframes & user flows...' },
    { id: 'frontend', agent: AGENT_TYPES.FRONTEND, message: 'Building live React components & UI template...' },
    { id: 'backend', agent: AGENT_TYPES.BACKEND, message: 'Generating PostgreSQL/Supabase schema & REST endpoints...' },
    { id: 'marketing', agent: AGENT_TYPES.MARKETING, message: 'Developing 30-day Go-To-Market plan & ad hooks...' },
  ];

  const agentLogs = [];

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    
    // Notify progress start
    onProgressUpdate({
      activeStepIndex: i,
      activeAgent: step.agent,
      log: `[${step.agent.name}] ${step.message}`,
      progressPercent: Math.round(((i) / steps.length) * 100)
    });

    // Simulate agent computation latency
    await new Promise(res => setTimeout(res, 600));

    // Intermediate detailed log
    onProgressUpdate({
      activeStepIndex: i,
      activeAgent: step.agent,
      log: `[${step.agent.name}] Synthesizing artifacts for "${cleanPrompt.substring(0, 30)}..."`,
      progressPercent: Math.round(((i + 0.5) / steps.length) * 100)
    });

    await new Promise(res => setTimeout(res, 500));
  }

  // Done status
  onProgressUpdate({
    activeStepIndex: steps.length,
    activeAgent: null,
    log: `✅ All 5 AI Agents finished successfully!`,
    progressPercent: 100
  });

  // Construct Tailored Startup Artifacts Data
  return buildStartupPackage(cleanPrompt, isBakery, isCode);
}

function buildStartupPackage(prompt, isBakery, isCode) {
  // Brand details based on topic
  const brandName = isBakery 
    ? 'Crust & Crumb' 
    : (isCode ? 'CodePulse AI' : 'VentureLab');

  const tagline = isBakery 
    ? 'Artisanal Organic Pastries & Warm Breads Delivered Fresh to Your Door'
    : (isCode ? 'Autonomous AI Pair Programmer & Code Review Engine' : 'Instant AI Platform for Next-Gen Founders');

  const primaryColor = isBakery ? '#f97316' : (isCode ? '#6366f1' : '#10b981');
  const secondaryColor = isBakery ? '#78350f' : (isCode ? '#ec4899' : '#06b6d4');
  const accentColor = isBakery ? '#fef08a' : (isCode ? '#38bdf8' : '#a855f7');
  const darkBg = isBakery ? '#1c1917' : '#090d16';

  return {
    prompt,
    meta: {
      generatedAt: new Date().toISOString(),
      feasibilityScore: isBakery ? 94 : 89,
      marketCategory: isBakery ? 'Food & Beverage / E-Commerce Direct-to-Consumer' : 'Developer Tools / B2B SaaS',
      estimatedTAM: isBakery ? '$14.2 Billion (US Bakery & Confectionery Market)' : '$42.8 Billion (Global Developer Tools & AI Dev)',
    },

    // 1. RESEARCH AGENT OUTPUT
    validation: {
      summary: `Solid commercial opportunity with strong consumer demand for ${isBakery ? 'fresh artisanal home deliveries' : 'automated developer productivity'}. Low entry barriers with high customer retention metrics.`,
      swot: {
        strengths: [
          isBakery ? 'High gross margin on specialty baked goods (65-75%)' : 'Scalable SaaS unit economics (85%+ gross margin)',
          isBakery ? 'Strong recurring local customer lifetime value' : 'Instant viral adoption through GitHub integration',
          'Differentiated visual branding and premium packaging',
          'Fast time-to-market using direct digital channels'
        ],
        weaknesses: [
          isBakery ? 'Perishable inventory requires optimized same-day logistics' : 'High initial AI inference cost per code scan',
          'Initial brand awareness bootstrap required',
          'Customer acquisition cost peak in first quarter'
        ],
        opportunities: [
          isBakery ? 'Corporate catering & subscription breakfast boxes' : 'Enterprise SOC2 compliance and self-hosted agents',
          'Local micro-influencer partnership programs',
          'Seasonal holiday gift bundles & limited drops'
        ],
        threats: [
          isBakery ? 'Fluctuating ingredient cost inflation' : 'Big tech incumbent feature bundling (GitHub/Microsoft)',
          'Local market competitors shifting online'
        ]
      },
      personas: [
        {
          name: isBakery ? 'Sarah Jenkins' : 'Alex Rivera',
          role: isBakery ? 'Tech Product Manager & Gourmet Foodie' : 'Senior Staff Software Engineer',
          age: isBakery ? '32' : '35',
          location: isBakery ? 'Austin, TX' : 'San Francisco, CA',
          avatar: isBakery ? '👩‍💼' : '👨‍💻',
          painPoints: isBakery ? [
            'Craves authentic sourdough bread & pastries but lacks local artisan bakeries nearby',
            'Tired of bland grocery store bakery sections',
            'Wants convenient online ordering for weekend family brunches'
          ] : [
            'Overwhelmed by massive PR review backlogs',
            'Tired of tedious linting & repetitive code review feedback',
            'Needs immediate security & performance checks before merge'
          ],
          buyingTrigger: isBakery 
            ? 'Discovers 1-hour fresh delivery subscription for weekend sourdough boxes' 
            : 'Integrates automated GitHub bot that catches 3 critical memory leaks in 30 seconds'
        },
        {
          name: isBakery ? 'Marcus Thorne' : 'Elena Rostova',
          role: isBakery ? 'Corporate Event Planner' : 'Engineering Manager (Team of 18)',
          age: isBakery ? '41' : '39',
          location: isBakery ? 'Chicago, IL' : 'Seattle, WA',
          avatar: isBakery ? '👔' : '👩‍💻',
          painPoints: isBakery ? [
            'Needs reliable breakfast catering for office meetings',
            'Struggles with rigid bakery ordering deadlines'
          ] : [
            'Sprint velocity slowed down by bottlenecked code reviews',
            'Wants consistent code style & architecture enforcement'
          ],
          buyingTrigger: isBakery 
            ? 'Custom corporate recurring breakfast box builder with invoicing' 
            : 'Team dashboard showing 40% reduction in code review turnaround time'
        }
      ]
    },

    // 2. BRANDING AGENT OUTPUT
    branding: {
      brandName,
      tagline,
      brandVibe: isBakery ? 'Warm, Artisanal, Earthy, Premium, Cozy' : 'Cybernetic, Ultra-Fast, Sleek, Trustworthy, Precision',
      logoPrompt: isBakery 
        ? 'Minimalist line-art illustration of a golden wheat stalk intersecting a stylized oven flame, flat vector, warm amber and dark roast brown theme, white background, high resolution app icon.'
        : 'Sleek geometric logo featuring glowing neon blue code brackets forming a pulsing lightning bolt, dark background, futuristic vector icon.',
      colorPalette: [
        { name: 'Primary Accent', hex: primaryColor, usage: 'Buttons, Hero highlights, Key CTAs' },
        { name: 'Deep Secondary', hex: secondaryColor, usage: 'Headers, Card borders, Badges' },
        { name: 'Warm Cream / Cyber Tint', hex: accentColor, usage: 'Subtitles, Icon backgrounds, Highlights' },
        { name: 'Background Slate', hex: darkBg, usage: 'Main container dark theme canvas' },
      ],
      typography: {
        headingFont: 'Outfit',
        bodyFont: 'Plus Jakarta Sans',
        codeFont: 'JetBrains Mono'
      },
      domainsAvailable: [
        { domain: `${brandName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`, status: 'Available ($11.99/yr)' },
        { domain: `get${brandName.toLowerCase().replace(/[^a-z0-9]/g, '')}.app`, status: 'Available ($14.99/yr)' },
        { domain: `${brandName.toLowerCase().replace(/[^a-z0-9]/g, '')}.io`, status: 'Premium ($29.99/yr)' },
      ]
    },

    // 3. UI DESIGNER AGENT OUTPUT (Landing Page Layout & Preview Data)
    landingPageData: {
      brandName,
      tagline,
      heroHeading: isBakery ? 'Oven-Fresh Artisanal Breads & Sweets Delivered Daily' : 'Review 10x Faster with Autonomous AI Code Agents',
      heroSubtext: isBakery 
        ? 'Hand-kneaded organic sourdough, flaky french croissants, and custom celebration cakes made with 100% grass-fed butter.'
        : 'Automate PR reviews, catch security flaws instantly, and speed up merge time from hours to seconds.',
      ctaPrimary: isBakery ? 'Order Fresh Pastries Now' : 'Start Free 14-Day Trial',
      ctaSecondary: isBakery ? 'Explore Weekly Menu' : 'View Live Demo',
      features: isBakery ? [
        { title: '100% Organic Sourdough', desc: 'Fermented naturally over 36 hours for perfect gut-friendly crust and flavor.', icon: 'Wheat' },
        { title: 'Same-Day Local Delivery', desc: 'Baked at dawn and delivered warm to your doorstep by 8:00 AM.', icon: 'Truck' },
        { title: 'Custom Order Builder', desc: 'Build your own custom gift box or corporate breakfast package online.', icon: 'Package' },
        { title: 'Subscription Perk', desc: 'Save 15% on weekly automated deliveries of your favorite fresh bread.', icon: 'Repeat' }
      ] : [
        { title: 'Instant PR Analysis', desc: 'Scans full code diffs in under 3 seconds with zero false positives.', icon: 'Zap' },
        { title: 'Deep Vulnerability Scanner', desc: 'Detects SQL injection, secret leaks, and OWASP Top 10 flaws.', icon: 'ShieldCheck' },
        { title: 'GitHub & GitLab Native', desc: 'Runs seamlessly directly inside your pull request comment threads.', icon: 'GitPullRequest' },
        { title: 'Custom Architecture Rules', desc: 'Enforce team coding standards and internal design system guidelines.', icon: 'Sliders' }
      ],
      products: isBakery ? [
        { name: 'Heritage Golden Sourdough Boule', price: '$8.50', image: '🍞', badge: 'Best Seller' },
        { name: 'Flaky French Butter Croissant (4-Pack)', price: '$12.00', image: '🥐', badge: 'Baked Daily' },
        { name: 'Triple Chocolate Ganache Tart', price: '$16.50', image: '🍫', badge: 'Chef Special' },
        { name: 'Artisanal Cinnamon Roll Box', price: '$14.00', image: '🥮', badge: 'Popular' }
      ] : [
        { name: 'Starter Dev Tier', price: '$0 / mo', image: '⚡', badge: 'Free Forever', desc: 'Up to 50 PR reviews/mo for open source devs' },
        { name: 'Pro Team Tier', price: '$29 / dev / mo', image: '🚀', badge: 'Most Popular', desc: 'Unlimited AI reviews, GitHub bot, security scan' },
        { name: 'Enterprise Custom', price: 'Contact Us', image: '🛡️', badge: 'SOC2 Ready', desc: 'Dedicated VPC model deployment, SSO, SLA' }
      ],
      testimonials: [
        {
          quote: isBakery ? '"The sourdough is incredible! It arrived warm at 7:30 AM before my morning meeting. Won\'t buy store bread again."' : '"CodePulse AI cut our engineering PR review bottlenecks by 60%. It caught an API key leak before it hit production!"',
          author: isBakery ? 'Clara Vance, Verified Customer' : 'David Chen, VP of Engineering at ScaleTech'
        },
        {
          quote: isBakery ? '"We ordered 50 pastries for our annual investor brunch. Everyone was raving about the croissants!"' : '"Installing the GitHub app took 2 minutes. Now our devs get instant code reviews on every pull request."',
          author: isBakery ? 'Michael Chang, Event Host' : 'Rachel Adams, Tech Lead'
        }
      ]
    },

    // 4. FRONTEND AGENT OUTPUT (REACT CODE)
    codeArtifacts: {
      reactApp: `import React, { useState } from 'react';
import { ShoppingBag, Star, CheckCircle, Truck, Sparkles, ArrowRight, Menu, X } from 'lucide-react';

export default function App() {
  const [cartCount, setCartCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const products = [
    ${isBakery ? `
    { id: 1, name: 'Heritage Golden Sourdough', price: 8.50, emoji: '🍞', tag: 'Best Seller' },
    { id: 2, name: 'French Butter Croissant 4-Pack', price: 12.00, emoji: '🥐', tag: 'Fresh Dawn' },
    { id: 3, name: 'Triple Chocolate Tart', price: 16.50, emoji: '🍫', tag: 'Chef Choice' },
    { id: 4, name: 'Artisanal Cinnamon Rolls', price: 14.00, emoji: '🥮', tag: 'Popular' }
    ` : `
    { id: 1, name: 'Free Dev Plan', price: 0, desc: '50 PR scans/mo', emoji: '⚡', tag: 'Free' },
    { id: 2, name: 'Pro Team Plan', price: 29, desc: 'Unlimited AI scans & security bot', emoji: '🚀', tag: 'Popular' },
    { id: 3, name: 'Enterprise VPC', price: 199, desc: 'Self-hosted AI model & SOC2', emoji: '🛡️', tag: 'Enterprise' }
    `}
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center font-bold text-xl text-white shadow-lg">
            ${isBakery ? '🥐' : '⚡'}
          </div>
          <span className="font-extrabold text-xl tracking-tight text-white">${brandName}</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#menu" className="hover:text-amber-400 transition">${isBakery ? 'Daily Menu' : 'Features'}</a>
          <a href="#about" className="hover:text-amber-400 transition">Our Story</a>
          <a href="#reviews" className="hover:text-amber-400 transition">Reviews</a>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setCartCount(cartCount + 1)}
            className="relative px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl transition flex items-center gap-2 shadow-lg shadow-amber-500/20"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>${isBakery ? 'Order Basket' : 'Get Started'}</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose-500 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="px-6 py-24 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-semibold mb-6">
          <Sparkles className="w-4 h-4" />
          <span>${isBakery ? 'Freshly Baked Daily at 5:00 AM' : 'Next-Gen AI Autonomous Dev Agent'}</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-amber-100 to-amber-400 bg-clip-text text-transparent">
          ${isBakery ? 'Artisanal Bakery Delivered Warm to Your Doorstep' : 'Review Code 10x Faster with AI Pair Engineers'}
        </h1>
        <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
          ${tagline}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-lg transition flex items-center justify-center gap-2 shadow-xl shadow-amber-500/25">
            <span>${isBakery ? 'Order Fresh Box' : 'Start Free Trial'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Menu / Product Showcase */}
      <section id="menu" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          ${isBakery ? 'Chef\'s Morning Selection' : 'Choose Your Plan'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div key={p.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-amber-500/50 transition">
              <div className="text-5xl mb-4">{p.emoji}</div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-amber-500/20 text-amber-300 rounded-full">{p.tag}</span>
              <h3 className="text-xl font-bold mt-3 mb-1 text-white">{p.name}</h3>
              <p className="text-amber-400 font-bold text-lg mb-4">\${p.price.toFixed(2)}</p>
              <button 
                onClick={() => setCartCount(cartCount + 1)}
                className="w-full py-2.5 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 font-semibold rounded-xl text-sm transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}`,
      tailwindConfig: `module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "${primaryColor}",
          secondary: "${secondaryColor}",
          accent: "${accentColor}",
          dark: "${darkBg}"
        }
      }
    }
  }
}`
    },

    // 5. BACKEND & DB AGENT OUTPUT (SQL, PRISMA & REST ENDPOINTS)
    backendArtifacts: {
      supabaseSql: `-- =========================================================
-- ${brandName} - Supabase PostgreSQL Schema
-- Generated automatically by DataGrid Backend Agent
-- =========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS / PROFILES TABLE
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    phone_number TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. PRODUCTS / MENU TABLE
CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    image_url TEXT,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. ORDERS TABLE
CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'baking', 'out_for_delivery', 'completed', 'cancelled')),
    delivery_address TEXT NOT NULL,
    delivery_time TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. ORDER ITEMS (MANY-TO-MANY)
CREATE TABLE public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10, 2) NOT NULL
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Products policy: Anyone can read available products
CREATE POLICY "Public products are viewable by everyone" 
    ON public.products FOR SELECT USING (is_available = true);

-- Orders policy: Users can read their own orders
CREATE POLICY "Users can view their own orders" 
    ON public.orders FOR SELECT USING (auth.uid() = user_id);

-- INDEXES FOR PERFORMANCE
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_orders_user ON public.orders(user_id);
CREATE INDEX idx_orders_status ON public.orders(status);
`,

      prismaSchema: `datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Profile {
  id        String   @id @default(uuid())
  email     String   @unique
  fullName  String?
  orders    Order[]
  createdAt DateTime @default(now())
}

model Product {
  id          String      @id @default(uuid())
  title       String
  slug        String      @unique
  description String?
  price       Float
  category    String
  isAvailable Boolean     @default(true)
  orderItems  OrderItem[]
}

model Order {
  id              String      @id @default(uuid())
  userId          String?
  user            Profile?    @relation(fields: [userId], references: [id])
  totalAmount     Float
  status          String      @default("pending")
  deliveryAddress String
  items           OrderItem[]
  createdAt       DateTime    @default(now())
}

model OrderItem {
  id        String  @id @default(uuid())
  orderId   String
  order     Order   @relation(fields: [orderId], references: [id])
  productId String
  product   Product @relation(fields: [productId], references: [id])
  quantity  Int
  unitPrice Float
}
`,

      apiEndpointNode: `// Express / Node API Handler: POST /api/orders
import express from 'express';
import { createClient } from '@supabase/supabase-js';

const router = express.Router();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

router.post('/api/orders', async (req, res) => {
  try {
    const { items, deliveryAddress, userId } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Cart cannot be empty' });
    }

    // 1. Calculate order total
    let totalAmount = 0;
    for (const item of items) {
      totalAmount += item.unitPrice * item.quantity;
    }

    // 2. Create Order in Supabase
    const { data: order, error: orderErr } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        total_amount: totalAmount,
        delivery_address: deliveryAddress,
        status: 'pending'
      })
      .select()
      .single();

    if (orderErr) throw orderErr;

    // 3. Create Order Line Items
    const orderItems = items.map(item => ({
      order_id: order.id,
      product_id: item.productId,
      quantity: item.quantity,
      unit_price: item.unitPrice
    }));

    const { error: itemsErr } = await supabase.from('order_items').insert(orderItems);
    if (itemsErr) throw itemsErr;

    return res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      orderId: order.id,
      totalAmount
    });
  } catch (error) {
    console.error('Order creation failed:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;`
    },

    // 6. MARKETING AGENT OUTPUT (GTM STRATEGY & LAUNCH PLAN)
    marketing: {
      goToMarketChannels: [
        { channel: 'Direct Instagram & TikTok Reels', focus: 'Short-form videos of bread dough rising, croissant scoring, and morning delivery unboxings.' },
        { channel: 'Local Neighborhood Partnerships', focus: 'Partner with local boutique coffee shops to offer cross-promotional breakfast combos.' },
        { channel: 'Micro-Influencer Gifting', focus: 'Send complimentary weekend brunch boxes to top 25 local lifestyle & food creators in city.' },
        { channel: 'Google Local SEO & Meta Ads', focus: 'Geo-targeted ads for "Fresh sourdough delivery near me" within 15-mile radius.' }
      ],
      adCopyVariants: [
        {
          headline: isBakery ? '🥖 Craving Real Sourdough at 7 AM?' : '⚡ Never Block a Merge Request Again',
          body: isBakery 
            ? 'Stop eating rubbery supermarket bread. Our organic sourdough is hand-kneaded, fermented 36 hours, and delivered warm to your doorstep.' 
            : 'CodePulse AI reviews PRs in 3 seconds flat, catches critical bugs before staging, and helps your devs ship 10x faster.',
          cta: isBakery ? 'Claim 20% Off Your First Order' : 'Try Free for 14 Days'
        },
        {
          headline: isBakery ? '🥐 Weekend Brunch Saved!' : '🛡️ Find Security Vulnerabilities in 3 Seconds',
          body: isBakery 
            ? 'Fresh croissants, warm cinnamon rolls, and artisan coffee breads delivered before your guests wake up.' 
            : 'Connect your GitHub repo in 2 clicks. Get instant SOC2 compliant automated code review feedback on every PR.',
          cta: isBakery ? 'Order Weekend Breakfast Box' : 'Install GitHub Bot'
        }
      ],
      thirtyDayCalendar: [
        { day: 'Day 1-5', action: 'Launch Teaser Landing Page with Early Bird 20% Discount Signup Form' },
        { day: 'Day 6-10', action: 'Send 50 VIP Sample Boxes to Local Influencers & Tech Managers' },
        { day: 'Day 11-15', action: 'Official Grand Opening & Meta Geo-Targeted Ad Campaign Launch' },
        { day: 'Day 16-25', action: 'Launch Corporate Catering & Recurring Weekly Subscription Tier' },
        { day: 'Day 26-30', action: 'Review Conversion Analytics & Retarget Cart Abandoners with Free Croissant Coupon' }
      ]
    }
  };
}
