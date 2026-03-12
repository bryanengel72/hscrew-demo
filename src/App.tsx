/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Instagram, Linkedin } from 'lucide-react';

const SnappyReveal = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.98 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ type: "spring", stiffness: 400, damping: 30, delay }}
  >
    {children}
  </motion.div>
);

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-brand-black text-white selection:bg-brand-accent selection:text-black">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-colors duration-200 border-b ${isScrolled ? 'bg-brand-black border-white/10' : 'bg-transparent border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-display text-3xl tracking-widest font-bold">
            STUDIO <span className="text-brand-accent">/</span> NYC
          </div>
          <div className="hidden md:flex gap-8 font-sans text-sm font-bold uppercase tracking-widest">
            <a href="#about" className="hover:text-brand-accent transition-colors">About</a>
            <a href="#services" className="hover:text-brand-accent transition-colors">Services</a>
            <a href="#investment" className="hover:text-brand-accent transition-colors">Investment</a>
            <a href="#contact" className="hover:text-brand-accent transition-colors">Contact</a>
          </div>
          <a href="#contact" className="md:hidden font-sans text-sm font-bold uppercase tracking-widest text-brand-accent">
            Book
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2574&auto=format&fit=crop" 
            alt="Intense Headshot" 
            className="w-full h-full object-cover opacity-40 grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/50 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-20">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="font-display text-6xl md:text-8xl lg:text-[8rem] leading-none tracking-tight mb-6"
          >
            YOUR FACE IS <br/><span className="text-brand-accent">YOUR BRAND.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.1 }}
            className="font-sans text-xl md:text-2xl text-gray-300 mb-10 font-medium tracking-wide uppercase"
          >
            Stop hiding behind a bad headshot.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.2 }}
          >
            <a href="#contact" className="inline-flex items-center gap-3 bg-brand-accent text-black font-display text-3xl px-10 py-5 hover:bg-white transition-colors uppercase tracking-widest">
              Book Now. Seriously. <ArrowRight className="w-8 h-8" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Philosophy / About */}
      <section id="about" className="py-32 px-6 border-b border-white/10 bg-brand-charcoal">
        <div className="max-w-4xl mx-auto">
          <SnappyReveal>
            <h2 className="font-display text-5xl md:text-7xl mb-12 tracking-wide">
              THE HEADSHOT IS YOUR <br/>MOST POWERFUL TOOL.
            </h2>
          </SnappyReveal>
          <div className="grid md:grid-cols-2 gap-12 font-sans text-lg md:text-xl text-gray-300 leading-relaxed">
            <SnappyReveal delay={0.1}>
              <p className="mb-6">
                Most people are wasting it. They show up with a cropped wedding photo or a stiff corporate portrait that screams "I don't care." We don't do that here.
              </p>
              <p>
                We build confidence. We find your best angle. We teach you how to squinch, how to own the frame, and how to look like the authority you are.
              </p>
            </SnappyReveal>
            <SnappyReveal delay={0.2}>
              <p className="mb-6">
                A great headshot changes your career. A bad one ends it before you even get in the room.
              </p>
              <p className="text-white font-bold uppercase tracking-widest text-sm border-l-4 border-brand-accent pl-4 py-2">
                You have one second to make an impression. Make it count.
              </p>
            </SnappyReveal>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-32 px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <SnappyReveal>
            <h2 className="font-display text-6xl md:text-8xl mb-16 tracking-wide text-center">HOW WE WORK</h2>
          </SnappyReveal>
          <div className="grid lg:grid-cols-3 gap-0 border border-white/10">
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
              <SnappyReveal key={i} delay={i * 0.1}>
                <div className={`p-12 h-full flex flex-col ${i !== 2 ? 'border-b lg:border-b-0 lg:border-r border-white/10' : ''} hover:bg-white/5 transition-colors`}>
                  <h3 className="font-display text-4xl mb-6 text-brand-accent">{service.title}</h3>
                  <p className="font-sans text-gray-400 mb-8 flex-grow text-lg">{service.desc}</p>
                  <p className="font-sans font-bold uppercase tracking-widest text-sm text-white">"{service.quote}"</p>
                </div>
              </SnappyReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="investment" className="py-32 px-6 border-b border-white/10 bg-brand-charcoal">
        <div className="max-w-5xl mx-auto text-center">
          <SnappyReveal>
            <h2 className="font-display text-6xl md:text-8xl mb-6 tracking-wide">THE INVESTMENT</h2>
            <p className="font-sans text-xl md:text-2xl font-bold text-brand-accent mb-16 uppercase tracking-widest">
              Great headshots aren't cheap. Bad ones cost you more.
            </p>
          </SnappyReveal>
          
          <div className="space-y-6 mb-16">
            {[
              { name: "THE HEADSHOT", price: "$750" },
              { name: "THE BRAND BLITZ", price: "$1,500" },
              { name: "THE SIGNATURE DAY", price: "$3,500" }
            ].map((item, i) => (
              <SnappyReveal key={i} delay={i * 0.1}>
                <div className="flex flex-col md:flex-row justify-between items-center py-6 border-b border-white/10 group hover:border-brand-accent transition-colors">
                  <span className="font-display text-4xl md:text-5xl tracking-wide group-hover:text-brand-accent transition-colors">{item.name}</span>
                  <span className="font-sans text-xl font-bold tracking-widest text-gray-400 mt-2 md:mt-0">STARTING AT {item.price}</span>
                </div>
              </SnappyReveal>
            ))}
          </div>
          
          <SnappyReveal delay={0.3}>
            <p className="font-sans text-sm text-gray-500 uppercase tracking-widest max-w-2xl mx-auto">
              All sessions include professional direction, retouched digital files, and the confidence to actually use them.
            </p>
          </SnappyReveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <SnappyReveal>
            <h2 className="font-display text-6xl md:text-8xl mb-16 tracking-wide text-center">THE RESULTS</h2>
          </SnappyReveal>
          <div className="grid md:grid-cols-3 gap-8">
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
              <SnappyReveal key={i} delay={i * 0.1}>
                <div className="bg-brand-charcoal p-10 border border-white/5 relative h-full flex flex-col">
                  <div className="text-brand-accent text-6xl font-display absolute top-6 left-6 opacity-20">"</div>
                  <p className="font-sans text-lg text-gray-300 mb-8 relative z-10 flex-grow">"{test.quote}"</p>
                  <div className="font-sans font-bold uppercase tracking-widest text-sm">
                    <span className="text-white">{test.author}</span>
                    <span className="text-brand-accent mx-2">/</span>
                    <span className="text-gray-500">{test.title}</span>
                  </div>
                </div>
              </SnappyReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 px-6 bg-brand-accent text-black">
        <div className="max-w-4xl mx-auto">
          <SnappyReveal>
            <h2 className="font-display text-6xl md:text-8xl mb-12 tracking-wide leading-none">
              STOP LOSING OPPORTUNITIES <br/>TO A BAD PHOTO.
            </h2>
          </SnappyReveal>
          
          <SnappyReveal delay={0.1}>
            <form className="space-y-6 font-sans" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest mb-2">Name</label>
                  <input type="text" className="w-full bg-transparent border-2 border-black p-4 focus:outline-none focus:bg-black/5 transition-colors font-bold placeholder:text-black/40" placeholder="JOHN DOE" />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest mb-2">Email</label>
                  <input type="email" className="w-full bg-transparent border-2 border-black p-4 focus:outline-none focus:bg-black/5 transition-colors font-bold placeholder:text-black/40" placeholder="JOHN@EXAMPLE.COM" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold uppercase tracking-widest mb-2">Session Type</label>
                <select className="w-full bg-transparent border-2 border-black p-4 focus:outline-none focus:bg-black/5 transition-colors font-bold appearance-none rounded-none">
                  <option>THE HEADSHOT</option>
                  <option>THE BRAND BLITZ</option>
                  <option>THE SIGNATURE DAY</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold uppercase tracking-widest mb-2">Message</label>
                <textarea rows={4} className="w-full bg-transparent border-2 border-black p-4 focus:outline-none focus:bg-black/5 transition-colors font-bold resize-none placeholder:text-black/40" placeholder="TELL ME ABOUT YOUR GOALS..."></textarea>
              </div>
              <button type="submit" className="w-full bg-black text-brand-accent font-display text-4xl py-6 hover:bg-brand-charcoal transition-colors uppercase tracking-widest mt-4">
                BOOK YOUR SESSION
              </button>
            </form>
          </SnappyReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10 bg-brand-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-display text-3xl tracking-widest font-bold">
            STUDIO <span className="text-brand-accent">/</span> NYC
          </div>
          
          <p className="font-sans text-sm font-bold uppercase tracking-widest text-gray-500 text-center">
            Great headshots change careers. Bad ones end them.
          </p>
          
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-brand-accent transition-colors">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-500 hover:text-brand-accent transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 text-center font-sans text-xs text-gray-700 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} STUDIO NYC. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
}
