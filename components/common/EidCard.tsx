"use client";

import { useEffect, useState } from "react";
import { X, Moon, Star, Send } from "lucide-react";

export default function EidCard() {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeen = localStorage.getItem("gurpc-eid-mubarak-2026-v2");
    if (!hasSeen) {
      setShouldRender(true);
      // Small delay for animation
      setTimeout(() => setIsVisible(true), 500);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("gurpc-eid-mubarak-2026-v2", "true");
    // Wait for animation to finish before unmounting
    setTimeout(() => setShouldRender(false), 500);
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-700 ${
        isVisible ? "bg-black/80 backdrop-blur-md" : "bg-black/0 pointer-events-none"
      }`}
    >
      <div
        className={`relative w-full max-w-sm overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#022c22] via-[#064e3b] to-[#065f46] p-[2px] shadow-2xl transition-all duration-700 transform ${
          isVisible ? "scale-100 opacity-100 translate-y-0 rotate-0" : "scale-90 opacity-0 translate-y-8 rotate-1"
        }`}
      >
        {/* Golden Border Gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-600 via-yellow-200 to-yellow-600 opacity-80 rounded-[2rem]" />
        
        <div className="relative h-full w-full bg-[#0a1f13] rounded-[1.9rem] overflow-hidden">
             
          {/* Background Decorative Pattern */}
          <div className="absolute inset-0 opacity-10" 
               style={{ 
                 backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                 backgroundSize: '24px 24px' 
               }} 
          />
          
          {/* Top light glow */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 z-20 rounded-full bg-black/20 p-2 text-amber-100/70 hover:bg-black/40 hover:text-white transition-colors backdrop-blur-sm border border-white/10 group"
          >
            <X size={16} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>

          <div className="relative z-10 px-6 pt-12 pb-8 flex flex-col items-center text-center">
            
            {/* Animated Moon & Lantern Composition */}
            <div className="mb-6 relative w-full flex justify-center h-32">
              {/* Glowing Background for Icon */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-emerald-500/20 blur-2xl rounded-full animate-pulse" />
              
              {/* Moon */}
              <div className="relative z-10">
                <Moon size={100} className="text-amber-100 drop-shadow-[0_0_25px_rgba(252,211,77,0.4)] -rotate-12" fill="currentColor" strokeWidth={0} />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 to-transparent rounded-full blur-xl mix-blend-overlay" />
                
                {/* Hanging Lantern (Simulated with Shapes) */}
                <div className="absolute -right-2 -top-2 origin-top hover:rotate-6 transition-transform duration-500 cursor-pointer">
                  <div className="w-[1px] h-16 bg-amber-400/40 mx-auto" />
                  <div className="group/lantern relative">
                    <div className="w-8 h-10 bg-gradient-to-b from-amber-200 to-amber-600 rounded-lg mx-auto shadow-[0_0_20px_rgba(251,191,36,0.6)] flex items-center justify-center border border-amber-300/50">
                       <div className="w-3 h-5 bg-white blur-[3px] rounded-full animate-pulse" />
                    </div>
                    {/* Lantern Top & Bottom */}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-amber-600 rounded-t-sm" />
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-amber-600 rounded-b-sm" />
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-amber-600" />
                  </div>
                </div>

                {/* Stars */}
                <Star className="absolute top-0 -left-6 text-yellow-300 w-5 h-5 animate-pulse drop-shadow-[0_0_8px_rgba(253,224,71,0.8)]" fill="currentColor" style={{ animationDelay: '0.2s' }} />
                <Star className="absolute bottom-4 -right-8 text-yellow-300 w-4 h-4 animate-pulse drop-shadow-[0_0_8px_rgba(253,224,71,0.8)]" fill="currentColor" style={{ animationDelay: '0.7s' }} />
                <Star className="absolute top-12 -left-12 text-yellow-300 w-3 h-3 animate-pulse drop-shadow-[0_0_8px_rgba(253,224,71,0.8)]" fill="currentColor" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>

            {/* Typography */}
            <div className="space-y-3 max-w-[280px] mx-auto z-10 w-full">
              <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-emerald-900/40 border border-emerald-500/30 backdrop-blur-sm mb-1 ring-1 ring-emerald-500/20">
                <span className="text-emerald-300/90 text-[10px] font-bold tracking-[0.2em] uppercase">Season's Greetings</span>
              </div>
              
              <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-200 to-amber-400 drop-shadow-sm tracking-tight leading-tight pb-1">
                Eid Mubarak
              </h2>
              
              <p className="text-emerald-100/70 text-sm leading-relaxed font-light px-2">
                May this blessed occasion illuminate your heart with joy and your life with prosperity.
              </p>
            </div>

            {/* Content Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent my-6" />

            {/* Call to Action */}
            <button
              onClick={handleClose}
              className="group relative w-full overflow-hidden rounded-xl p-[1px] transition-all hover:scale-[1.02] shadow-lg shadow-emerald-900/40 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 animate-gradient-x" />
              <div className="relative flex items-center justify-center gap-2 rounded-[11px] bg-[#0d281a] px-6 py-3 transition-all group-hover:bg-opacity-90">
                <span className="font-semibold text-emerald-100 text-sm tracking-wide">Accept Wishes</span>
                <Send size={14} className="text-emerald-300 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
              </div>
            </button>
            
            {/* Footer Text */}
            <div className="mt-4 flex items-center justify-center gap-2 opacity-40">
               <div className="h-[1px] w-6 bg-emerald-400" />
               <p className="text-[10px] text-emerald-300 font-medium tracking-wider">GURPC TEAM</p>
               <div className="h-[1px] w-6 bg-emerald-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
