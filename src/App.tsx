/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { ArrowRight, Instagram, Linkedin } from 'lucide-react';

// --- Reusable Animation Components ---

const FadeUp = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const StaggerContainer = ({ children, className = "", delayChildren = 0.1, staggerChildren = 0.1 }: { children: React.ReactNode, className?: string, delayChildren?: number, staggerChildren?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const StaggerItem = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
    show: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    },
  };

  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  );
};

const TextReveal = ({ text, className = "" }: { text: string, className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  // Split text into words, keeping spaces
  const words = text.split(" ").map(word => word + "\u00A0");

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: "100%", rotateX: -90 },
    show: { 
      opacity: 1, 
      y: "0%", 
      rotateX: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className={`${className} flex flex-wrap`}
      style={{ perspective: "1000px" }}
    >
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span variants={item} className="inline-block origin-bottom">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
};

// --- Main App Component ---

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  // Parallax effect for hero image
  const heroImageY = useTransform(scrollY, [0, 1000], ["0%", "30%"]);
  // Scroll progress bar
  const scaleX = useTransform(scrollY, [0, document.body.scrollHeight - window.innerHeight], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-brand-black text-white selection:bg-brand-accent selection:text-black font-sans scroll-smooth">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-brand-accent origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-brand-black/80 backdrop-blur-lg border-b border-white/10 py-4' : 'bg-transparent border-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-display text-3xl tracking-widest font-bold"
          >
            STUDIO <span className="text-brand-accent">/</span> NYC
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="hidden md:flex gap-8 font-sans text-sm font-bold uppercase tracking-widest"
          >
            {['about', 'services', 'investment', 'contact'].map((item, i) => (
              <a key={item} href={`#${item}`} className="relative group overflow-hidden">
                <span className="block group-hover:-translate-y-full transition-transform duration-300 ease-in-out">{item}</span>
                <span className="absolute top-0 left-0 block translate-y-full group-hover:translate-y-0 text-brand-accent transition-transform duration-300 ease-in-out">{item}</span>
              </a>
            ))}
          </motion.div>
          
          <motion.a 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            href="#contact" 
            className="md:hidden font-sans text-sm font-bold uppercase tracking-widest text-brand-accent border border-brand-accent px-4 py-2 hover:bg-brand-accent hover:text-black transition-colors"
          >
            Book
          </motion.a>
        </div>
      </nav>

      {/* Hero Content */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden border-b border-white/10">
        <motion.div className="absolute inset-0 z-0 bg-brand-black" style={{ y: heroImageY }}>
          <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.5 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2574&auto=format&fit=crop" 
            alt="Intense Headshot" 
            className="w-full h-full object-cover grayscale mix-blend-luminosity"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-transparent" />
        </motion.div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-20 flex flex-col items-center">
          <div className="overflow-hidden mb-6">
            <motion.h1 
              initial={{ y: "100%", opacity: 0, rotateZ: 5 }}
              animate={{ y: "0%", opacity: 1, rotateZ: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-6xl md:text-8xl lg:text-[9rem] leading-none tracking-tighter mix-blend-difference"
            >
              YOUR FACE IS
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
             <motion.h1 
              initial={{ y: "-100%", opacity: 0, rotateZ: -5 }}
              animate={{ y: "0%", opacity: 1, rotateZ: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-6xl md:text-8xl lg:text-[9rem] leading-none tracking-tighter text-red-600 mix-blend-screen"
            >
              YOUR BRAND.
            </motion.h1>
          </div>
          
          <FadeUp delay={0.6}>
            <p className="font-sans text-xl md:text-2xl text-gray-300 mb-12 font-medium tracking-widest uppercase">
              Stop hiding behind a bad headshot.
            </p>
          </FadeUp>
          
          <FadeUp delay={0.8}>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact" 
              className="group relative inline-flex items-center gap-4 bg-brand-accent text-black font-display text-2xl md:text-3xl px-12 py-6 overflow-hidden uppercase tracking-widest cursor-pointer"
            >
              <span className="relative z-10 font-bold">Book Now. Seriously.</span>
              <motion.div 
                 className="relative z-10"
                 animate={{ x: [0, 5, 0] }}
                 transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <ArrowRight className="w-8 h-8" />
              </motion.div>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />
            </motion.a>
          </FadeUp>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="uppercase text-[10px] tracking-[0.3em] font-bold text-gray-500">Scroll</span>
          <motion.div 
            className="w-[1px] h-12 bg-white/20 origin-top"
          >
            <motion.div 
              className="w-full h-full bg-brand-accent origin-top"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: [0, 1, 0], translateY: ['0%', '0%', '100%'] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Philosophy / About */}
      <section id="about" className="py-40 px-6 border-b border-white/5 bg-brand-charcoal relative overflow-hidden">
        {/* Decorative background element */}
        <motion.div 
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none"
          animate={{ 
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <TextReveal 
            text="THE HEADSHOT IS YOUR MOST POWERFUL TOOL." 
            className="font-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.9] mb-16 tracking-tight text-white/90"
          />
          
          <StaggerContainer className="grid md:grid-cols-2 gap-16 font-sans text-lg md:text-xl text-gray-400 leading-relaxed font-light">
            <StaggerItem className="space-y-8">
              <p>
                Most people are wasting it. They show up with a cropped wedding photo or a stiff corporate portrait that screams "I don't care." We don't do that here.
              </p>
              <p>
                We build confidence. We find your best angle. We teach you how to squinch, how to own the frame, and how to look like the authority you are.
              </p>
            </StaggerItem>
            <StaggerItem className="space-y-8">
              <p>
                A great headshot changes your career. A bad one ends it before you even get in the room.
              </p>
              <div className="relative pl-8 py-2">
                <motion.div 
                  initial={{ height: 0 }}
                  whileInView={{ height: "100%" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="absolute left-0 top-0 w-1 bg-brand-accent" 
                />
                <p className="text-white font-bold uppercase tracking-[0.2em] text-sm leading-loose">
                  You have one second to make an impression. Make it count.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-40 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="mb-20 text-center flex flex-col items-center">
            <span className="uppercase text-brand-accent font-bold tracking-[0.3em] text-sm mb-4 block">Our Process</span>
            <TextReveal text="HOW WE WORK" className="font-display text-6xl md:text-8xl lg:text-[7rem] tracking-tight justify-center" />
          </FadeUp>
          
          <StaggerContainer className="grid lg:grid-cols-3 gap-0 border border-white/10 group">
            {[
              {
                title: "THE HEADSHOT",
                desc: "The essential. One look, sharp and powerful. Built for LinkedIn, casting, press, and executive profiles.",
                quote: "This is the one shot that gets you in the room."
              },
              {
                title: "THE BRAND BLITZ",
                desc: "Multiple looks. Multiple setups. Built for entrepreneurs, speakers, and thought leaders who need a full content library.",
                quote: "Because one photo doesn't tell the whole story."
              },
              {
                title: "THE SIGNATURE DAY",
                desc: "Full-day access to the studio. Unlimited looks. Styling coordination. Every image delivered. Reserved for the ones who are serious.",
                quote: "This is what the top 1% invest in."
              }
            ].map((service, i) => (
              <StaggerItem key={i} className="h-full">
                <motion.div 
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                  className={`p-14 h-full flex flex-col relative overflow-hidden ${i !== 2 ? 'border-b lg:border-b-0 lg:border-r border-white/10' : ''} transition-colors duration-500`}
                >
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    className="absolute top-0 left-0 w-full h-1 bg-brand-accent origin-left transition-transform duration-300 pointer-events-none"
                  />
                  <span className="text-white/10 font-display text-8xl absolute -top-4 -right-4 pointer-events-none select-none transition-transform duration-500 group-hover:scale-110">
                    0{i+1}
                  </span>
                  
                  <h3 className="font-display text-4xl lg:text-5xl mb-8 mt-12 text-white group-hover:text-brand-accent transition-colors duration-300 relative z-10">{service.title}</h3>
                  <p className="font-sans text-gray-400 mb-12 flex-grow text-lg leading-relaxed relative z-10 font-light">{service.desc}</p>
                  
                  <div className="relative z-10 mt-auto">
                    <p className="font-sans font-bold uppercase tracking-widest text-sm text-brand-accent">"{service.quote}"</p>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Pricing */}
      <section id="investment" className="py-40 px-6 border-b border-white/5 bg-brand-charcoal relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <FadeUp className="mb-20">
             <TextReveal text="THE INVESTMENT" className="font-display text-6xl md:text-8xl lg:text-[7rem] tracking-tight justify-center mb-6" />
             <p className="font-sans text-xl md:text-2xl font-light text-gray-400 mt-6 max-w-2xl mx-auto">
               Great headshots aren't cheap. <br/><span className="text-brand-accent font-bold">Bad ones cost you more.</span>
             </p>
          </FadeUp>
          
          <StaggerContainer className="space-y-0 mb-20 flex flex-col border border-white/10 rounded-3xl overflow-hidden bg-brand-black/30 backdrop-blur-sm">
            {[
              { name: "THE HEADSHOT", price: "$750" },
              { name: "THE BRAND BLITZ", price: "$1,500" },
              { name: "THE SIGNATURE DAY", price: "$3,500" }
            ].map((item, i) => (
              <StaggerItem key={i}>
                <motion.div 
                  whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.02)" }}
                  className="flex flex-col md:flex-row justify-between items-center p-10 lg:px-16 border-b border-white/5 last:border-0 group transition-all"
                >
                  <div className="flex items-center gap-6">
                    <ArrowRight className="w-5 h-5 text-brand-accent opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    <span className="font-display text-3xl md:text-5xl tracking-wide group-hover:text-white text-gray-300 transition-colors">{item.name}</span>
                  </div>
                  <div className="flex items-end gap-2 mt-4 md:mt-0">
                    <span className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-1">Starting At</span>
                    <span className="font-sans text-2xl md:text-3xl font-light tracking-wide text-white">{item.price}</span>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          
          <FadeUp delay={0.3}>
            <p className="font-sans text-sm text-gray-500 uppercase tracking-[0.2em] max-w-2xl mx-auto leading-relaxed border border-white/10 p-6 inline-block rounded-full">
              All sessions include professional direction, retouched digital files, and the confidence to actually use them.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-40 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="mb-20 text-center">
            <TextReveal text="THE RESULTS" className="font-display text-6xl md:text-8xl lg:text-[7rem] tracking-tight justify-center" />
          </FadeUp>
          
          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "I updated my headshot on a Tuesday. I booked a national commercial on Thursday. It's not a coincidence.",
                author: "SARAH M.",
                title: "ACTOR"
              },
              {
                quote: "My inquiry rate tripled after swapping my old corporate photo for this. People take me seriously before we even speak.",
                author: "JAMES T.",
                title: "FOUNDER"
              },
              {
                quote: "I hated having my photo taken. Now I use my headshot everywhere. The confidence boost alone was worth the investment.",
                author: "ELENA R.",
                title: "EXECUTIVE"
              }
            ].map((test, i) => (
              <StaggerItem key={i} className="h-full">
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="bg-brand-charcoal p-12 border border-white/5 relative h-full flex flex-col group hover:border-brand-accent/30 transition-colors duration-500"
                >
                  <div className="text-brand-accent text-8xl font-display absolute -top-2 left-6 opacity-20 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none">"</div>
                  
                  <div className="relative z-10 flex-grow pt-4">
                    <p className="font-sans text-xl text-gray-300 mb-10 leading-relaxed font-light">"{test.quote}"</p>
                  </div>
                  
                  <div className="relative z-10 border-t border-white/10 pt-6 mt-auto">
                    <div className="font-sans font-bold uppercase tracking-[0.15em] text-sm">
                      <span className="text-white block mb-1">{test.author}</span>
                      <span className="text-brand-accent text-xs">{test.title}</span>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-40 px-6 bg-brand-accent text-black relative overflow-hidden">
        {/* Abstract shape */}
        <div className="absolute top-1/2 -translate-y-1/2 -right-40 w-[600px] h-[600px] bg-black/5 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <FadeUp>
            <h2 className="font-display text-6xl md:text-8xl lg:text-[7.5rem] mb-12 tracking-tighter leading-[0.9] text-black mix-blend-multiply opacity-90">
              STOP LOSING OPPORTUNITIES <br/>TO A BAD PHOTO.
            </h2>
          </FadeUp>
          
          <FadeUp delay={0.2}>
            <form className="space-y-6 font-sans bg-brand-charcoal/5 p-8 md:p-12 rounded-3xl" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                 <div>
                  <label className="block text-sm font-bold uppercase tracking-widest mb-3 text-black/70">Name</label>
                  <input type="text" className="w-full bg-transparent border-b-2 border-black/20 p-4 pl-0 focus:outline-none focus:border-black transition-colors font-bold text-lg placeholder:text-black/30" placeholder="JOHN DOE" />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest mb-3 text-black/70">Email</label>
                  <input type="email" className="w-full bg-transparent border-b-2 border-black/20 p-4 pl-0 focus:outline-none focus:border-black transition-colors font-bold text-lg placeholder:text-black/30" placeholder="JOHN@EXAMPLE.COM" />
                </div>
              </div>
              <div className="pt-4">
                <label className="block text-sm font-bold uppercase tracking-widest mb-3 text-black/70">Session Type</label>
                <div className="relative">
                  <select className="w-full bg-transparent border-b-2 border-black/20 p-4 pl-0 focus:outline-none focus:border-black transition-colors font-bold text-lg appearance-none rounded-none cursor-pointer">
                    <option>THE HEADSHOT</option>
                    <option>THE BRAND BLITZ</option>
                    <option>THE SIGNATURE DAY</option>
                  </select>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                    <ArrowRight className="w-5 h-5 rotate-90" />
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <label className="block text-sm font-bold uppercase tracking-widest mb-3 text-black/70">Message</label>
                <textarea rows={3} className="w-full bg-transparent border-b-2 border-black/20 p-4 pl-0 focus:outline-none focus:border-black transition-colors font-bold text-lg resize-none placeholder:text-black/30" placeholder="TELL ME ABOUT YOUR GOALS..."></textarea>
              </div>
              
              <div className="pt-10">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit" 
                  className="w-full group relative overflow-hidden bg-black text-brand-accent font-display text-4xl lg:text-5xl py-8 uppercase tracking-widest"
                >
                  <span className="relative z-10 block group-hover:-translate-y-full transition-transform duration-300">BOOK YOUR SESSION</span>
                  <span className="absolute inset-0 z-10 flex items-center justify-center text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300">LET'S GO <ArrowRight className="w-8 h-8 ml-4"/></span>
                </motion.button>
              </div>
            </form>
          </FadeUp>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/5 bg-brand-black overflow-hidden relative">
        <StaggerContainer className="max-w-7xl mx-auto flex flex-col items-center gap-12 relative z-10">
          <StaggerItem>
            <div className="font-display text-5xl tracking-widest font-bold">
              STUDIO <span className="text-brand-accent">/</span> NYC
            </div>
          </StaggerItem>
          
          <StaggerItem>
             <p className="font-sans text-lg font-light uppercase tracking-[0.2em] text-gray-500 text-center max-w-xl">
              Great headshots change careers. <br/><span className="text-white font-bold">Bad ones end them.</span>
            </p>
          </StaggerItem>
          
          <StaggerItem>
             <div className="flex gap-8">
              <a href="#" className="p-4 rounded-full border border-white/10 text-gray-400 hover:text-brand-accent hover:border-brand-accent hover:bg-white/5 transition-all">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="p-4 rounded-full border border-white/10 text-gray-400 hover:text-brand-accent hover:border-brand-accent hover:bg-white/5 transition-all">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </StaggerItem>
          
          <StaggerItem className="w-full border-t border-white/5 pt-12 mt-4 text-center">
             <div className="font-sans text-xs text-gray-600 uppercase tracking-widest">
              &copy; {new Date().getFullYear()} STUDIO NYC. ALL RIGHTS RESERVED.
            </div>
          </StaggerItem>
        </StaggerContainer>
        
        {/* Giant background text */}
        <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none overflow-hidden">
          <span className="font-display text-[20vw] font-bold text-white/[0.02] tracking-tighter whitespace-nowrap leading-none">
            STUDIO NYC
          </span>
        </div>
      </footer>
    </div>
  );
}
