import Link from "next/link";

export default function PromoBanner() {
  return (
    <section className="bg-charcoal-950 py-10 sm:py-12 overflow-hidden relative border-y border-charcoal-900 shadow-soft-xl">
      {/* High-end OLED Backlight Glows */}
      <div className="absolute top-[-50%] left-[-10%] w-[500px] h-[500px] bg-accent-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-50%] right-[-10%] w-[500px] h-[500px] bg-warm-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Modern dotted mesh background detail */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          
          {/* Offer text */}
          <div className="text-center lg:text-left space-y-3.5 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse" />
              <span className="text-[9px] font-bold text-accent-400 uppercase tracking-[0.25em]">
                Limited Season Release
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-5.5xl font-bold text-white tracking-tight leading-none">
              Up to <span className="text-accent-400 italic font-serif font-normal">40% off</span>
            </h2>
            
            <p className="text-charcoal-300 text-sm sm:text-base font-light leading-relaxed">
              On select seasonal styles. Apply the limited release code at checkout:
              <span className="inline-flex items-center gap-1.5 ml-2.5 px-3.5 py-1 rounded-xl bg-white/[0.06] border border-white/15 font-mono text-xs font-semibold text-white shadow-soft transition-all hover:bg-white/[0.1] hover:border-white/20">
                <svg className="w-3.5 h-3.5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                SPRING25
              </span>
            </p>
          </div>

          {/* Action CTA Button */}
          <div className="flex-shrink-0 relative group">
            {/* Pulsing button shadow */}
            <div className="absolute inset-0 bg-white/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <Link
              href="/shop?badge=Sale"
              className="relative inline-flex items-center gap-2.5 px-10 py-4.5 bg-white text-charcoal-950 font-bold text-sm rounded-full transition-all duration-300 hover:scale-[1.03] hover:bg-warm-50 shadow-soft-lg group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              <span>Shop The Sale</span>
              <svg className="w-4 h-4 transition-transform duration-300 ease-premium group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Luxury background huge stamp text */}
          <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 text-[140px] font-black text-white/[0.015] pointer-events-none select-none leading-none hidden lg:block tracking-tighter uppercase font-sans">
            SALE
          </div>
        </div>
      </div>
    </section>
  );
}
