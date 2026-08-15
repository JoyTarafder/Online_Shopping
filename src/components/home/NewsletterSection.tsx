"use client";

import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus("success");
    setEmail("");
  };

  return (
    <section className="py-12 sm:py-16 bg-[#0c0d0e] overflow-hidden relative border-t border-white/[0.04]">
      {/* High-end OLED backlight glow shapes */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-violet-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Decorative subtle dot mesh backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1.5px,transparent_1.5px)] [background-size:32px_32px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col items-center z-10">
        
        {/* Sleek Line Envelope Icon Container */}
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/[0.06] to-white/[0.01] border border-white/10 flex items-center justify-center mb-8 shadow-2xl transition-all duration-500 hover:scale-105 group select-none">
          <svg className="w-5 h-5 text-white/60 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>

        {/* Headings */}
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-500/80 mb-3 block text-center">
          Newsletter
        </span>
        <h2 className="text-3xl sm:text-4.5xl font-serif italic text-white mb-4 tracking-normal leading-tight font-normal text-center">
          Stay in the Loop
        </h2>
        
        <p className="text-gray-400 mb-10 text-xs sm:text-sm leading-relaxed font-light max-w-md text-center">
          Subscribe to our newsletter for early access to drops, private sale alerts, and minimalist style guides.
        </p>

        {/* Form and state triggers */}
        {status === "success" ? (
          <div className="flex items-center justify-center gap-3 bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4.5 max-w-md w-full mx-auto animate-fade-in">
            <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-white text-xs font-semibold">You&apos;re subscribed! Welcome to ShajSutro.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto relative group">
            {/* Integrated, bulletproof input frame */}
            <div className="relative flex items-center p-1.5 rounded-2xl bg-white/[0.02] border border-white/10 focus-within:border-white/20 focus-within:ring-4 focus-within:ring-white/5 transition-all duration-300">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 min-w-0 px-4.5 py-3 bg-transparent text-white placeholder-gray-600 text-sm focus:outline-none"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-6 py-3 bg-white hover:bg-warm-50 text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 active:scale-[0.98] disabled:opacity-70 shrink-0 shadow-lg shadow-black/20"
              >
                {status === "loading" ? "Subscribing..." : "Subscribe"}
              </button>
            </div>
          </form>
        )}

        <p className="mt-6 text-[10px] text-gray-500 font-light text-center">
          By subscribing, you agree to our{" "}
          <a href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors duration-300 underline underline-offset-4 font-normal">
            Privacy Policy
          </a>
          . Unsubscribe at any time.
        </p>

        {/* Curated benefits drawer */}
        <div className="mt-16 pt-8 border-t border-white/[0.04] w-full flex flex-wrap justify-center gap-x-8 gap-y-4 text-[11px] sm:text-xs text-gray-500">
          {[
            "Early Access to Drops",
            "Private Subscriber Offers",
            "Minimalist Style Guides",
          ].map((benefit) => (
            <div key={benefit} className="flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-amber-500/80 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-light tracking-wide text-gray-400">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
