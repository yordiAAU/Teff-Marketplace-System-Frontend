import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion} from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle2, 
  Sprout, 
  ShieldCheck, 
  Globe, 
  Users,
  Star,
  TrendingUp,
  Truck,
  Leaf,
  ChevronRight,
  Play,
  Quote
} from 'lucide-react';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);



  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll function to handle navigation clicks
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 70; // Reduced nav height for desktop
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const stats = [
    { value: "10K+", label: "Active Farmers", icon: Users },
    { value: "50K+", label: "Happy Customers", icon: Star },
    { value: "100K+", label: "Tons Delivered", icon: Truck },
    { value: "25+", label: "Countries", icon: Globe }
  ];

  const testimonials = [
    {
      name: "Tesfaye M.",
      role: "Farmer, Ethiopia",
      content: "TeffMarket transformed my business. I now reach customers globally and get fair prices for my premium teff.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100"
    },
    {
      name: "Sarah J.",
      role: "Health Food Store Owner",
      content: "The quality is unmatched. My customers love the authentic teff products sourced directly from farmers.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100"
    },
    {
      name: "Dr. Michael Chen",
      role: "Nutritionist",
      content: "I recommend TeffMarket to all my clients. The transparency and quality control are exceptional.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50/30 to-white">
      {/* Navigation - Reduced height for desktop */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/80 backdrop-blur-sm'
      } border-b border-slate-100`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary rounded-xl blur-md opacity-50"></div>
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-base sm:text-lg">T</span>
              </div>
            </div>
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              TeffMarket
            </span>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {['About', 'Features', 'Benefits', 'Testimonials'].map((item, i) => (
              <motion.a
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => handleNavClick(e, item.toLowerCase())}
                className="text-slate-600 hover:text-primary font-medium transition-all hover:scale-105 cursor-pointer text-sm lg:text-base"
              >
                {item}
              </motion.a>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 sm:gap-3"
          >
            <Link to="/login" className="text-slate-600 hover:text-primary font-medium px-2 sm:px-3 py-1.5 transition-all hover:scale-105 text-sm">
              Login
            </Link>
            <Link to="/register" className="bg-gradient-to-r from-primary to-secondary text-white px-4 sm:px-5 py-1.5 rounded-full font-semibold hover:shadow-xl transition-all hover:scale-105 shadow-md text-sm">
              Get Started
            </Link>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section - Reduced height and padding */}
      <section id="about" className="relative pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 overflow-hidden min-h-[90vh] lg:min-h-[85vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 text-primary font-semibold text-xs sm:text-sm mb-4 backdrop-blur-sm"
            >
              <Sprout size={14} className="text-secondary" />
              <span>The Future of Agriculture</span>
            </motion.div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Connecting Farmers and Buyers Through a
              </span>
              <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Modern Teff Marketplace
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-600 mb-6 sm:mb-8 leading-relaxed max-w-xl">
              Empowering local farmers with direct access to global markets while ensuring customers get the highest quality teff directly from the source.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/register" className="bg-gradient-to-r from-primary to-secondary text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-bold text-base sm:text-lg flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all group w-full sm:w-auto">
                  Join the Marketplace 
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/login" className="bg-white border-2 border-slate-200 text-slate-900 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-bold text-base sm:text-lg flex items-center justify-center hover:bg-slate-50 hover:border-primary/30 transition-all gap-2 w-full sm:w-auto">
                  <Play size={16} />
                  View Products
                </Link>
              </motion.div>
            </div>

            {/* Stats - Compact layout */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-slate-200">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-1">
                    <stat.icon size={18} className="text-primary" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-slate-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000" 
                alt="Agriculture Field" 
                className="object-cover w-full aspect-[4/3] transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 z-20">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-semibold text-slate-900">Sustainable Farming</span>
                </div>
              </div>
            </div>
            
            {/* Floating cards - Smaller for compact layout */}
            <motion.div 
              initial={{ opacity: 0, x: -20, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl p-3 backdrop-blur-sm border border-slate-100 hidden lg:block"
            >
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Verified Farmers</p>
                  <p className="text-xl font-bold text-slate-900">2,500+</p>
                </div>
              </div>
            </motion.div>

          
          </motion.div>
        </div>
      </section>

      {/* Features Section - Reduced padding */}
      <section id="features" className="min-h-screen flex items-center bg-white relative py-24">
       
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 via-transparent to-slate-50/50 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-xs sm:text-sm mb-4">
              <Leaf size={14} />
              <span>Why Choose Us</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
              Everything you need for a{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                seamless trade
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              We've built a platform that prioritizes transparency, quality, and fair trade for everyone involved in the teff ecosystem.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { icon: ShieldCheck, title: "Quality Guaranteed", desc: "Every batch of teff is verified for quality and origin before reaching our marketplace.", color: "from-blue-500 to-cyan-500", delay: 0 },
              { icon: Globe, title: "Direct Access", desc: "Eliminate middlemen and connect directly with farmers for better prices and fresher products.", color: "from-green-500 to-emerald-500", delay: 0.1 },
              { icon: Users, title: "Community Driven", desc: "Support local farming communities while getting the best nutritional value for your family.", color: "from-orange-500 to-red-500", delay: 0.2 }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: feature.delay }}
                whileHover={{ y: -5 }}
                className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-slate-100"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <feature.icon size={24} className="text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-3 text-sm sm:text-base">{feature.desc}</p>
                <div className="flex items-center gap-1 text-primary font-semibold text-sm group-hover:gap-2 transition-all">
                  Learn more <ChevronRight size={14} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section - Reduced padding */}
      <section id="benefits" className="min-h-screen flex items-center bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent scroll-mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-xs sm:text-sm mb-4">
                <TrendingUp size={14} />
                <span>Key Benefits</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4 sm:mb-6">
                Why farmers and buyers{' '}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  love our platform
                </span>
              </h2>
              <div className="space-y-4">
                {[
                  "Fair pricing with no hidden fees",
                  "Secure payments and dispute resolution",
                  "Real-time market insights and analytics",
                  "Quality certification and traceability"
                ].map((benefit, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 size={12} className="text-white" />
                    </div>
                    <span className="text-slate-700 text-sm sm:text-base">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-1">
                <div className="bg-white rounded-xl p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Quote size={32} className="text-primary/30" />
                    <div>
                      <p className="text-slate-600 italic text-sm sm:text-base">"TeffMarket has revolutionized how we trade teff. The transparency and reach are unmatched."</p>
                      <p className="font-semibold text-slate-900 mt-2">- Alemitu B., Master Farmer</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Reduced padding */}
      <section id="testimonials" className="py-16 sm:py-20 bg-white scroll-mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-xs sm:text-sm mb-4">
              <Users size={14} />
              <span>Testimonials</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
              Trusted by thousands of{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                happy customers
              </span>
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -3 }}
                className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-all border border-slate-100"
              >
                <div className="flex items-center gap-3 mb-3">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-slate-900 text-sm sm:text-base">{testimonial.name}</p>
                    <p className="text-xs text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{testimonial.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Reduced padding */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 sm:p-10 text-center text-white shadow-2xl"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
              Ready to start your journey?
            </h2>
            <p className="text-base sm:text-lg mb-6 text-white/90">
              Join thousands of farmers and buyers who are already using TeffMarket
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/register" 
                className="inline-flex items-center gap-2 bg-white text-primary px-6 sm:px-8 py-3 rounded-xl font-bold text-base sm:text-lg hover:shadow-xl transition-all"
              >
                Get Started Today <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-4 gap-8 sm:gap-12 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <span className="text-xl font-bold">TeffMarket</span>
              </div>
              <p className="text-slate-400 max-w-sm leading-relaxed text-sm">
                The world's leading digital marketplace for premium teff. Connecting the heart of agriculture with the global table.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-base">Platform</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><Link to="/marketplace" className="hover:text-primary transition-colors">Marketplace</Link></li>
                <li><Link to="/farmers" className="hover:text-primary transition-colors">For Farmers</Link></li>
                <li><Link to="/customers" className="hover:text-primary transition-colors">For Customers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-base">Company</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-6 border-t border-slate-800 text-center text-slate-500 text-xs sm:text-sm">
            © 2026 TeffMarket Platform. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}