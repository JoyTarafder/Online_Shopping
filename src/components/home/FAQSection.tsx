"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What is your return policy?",
    answer:
      "We offer free returns within 30 days of delivery for all items in original condition with tags attached. Simply initiate a return from your account dashboard and we'll arrange a free collection.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Standard shipping takes 3–5 business days. Express shipping (1–2 days) is available at checkout. Orders over ৳1200 qualify for free standard shipping. You'll receive tracking information once your order is dispatched.",
  },
  {
    question: "Are your products sustainably made?",
    answer:
      "Sustainability is central to how we operate. We partner with certified factories that meet strict ethical and environmental standards, use natural and recycled materials wherever possible, and offset our carbon footprint through verified programs.",
  },
  {
    question: "How do I find my size?",
    answer:
      "Each product page features a detailed size guide with measurements in both cm and inches. If you're between sizes, we generally recommend sizing up for a relaxed fit or sizing down for a more fitted look. Our team is always happy to help via live chat.",
  },
  {
    question: "Can I change or cancel my order?",
    answer:
      "You can modify or cancel your order within 1 hour of placing it by contacting our support team. After this window, orders enter our fulfillment process and can no longer be changed, but you can still return the items once received.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes! We ship to over 50 countries worldwide. International shipping typically takes 7–14 business days depending on the destination. Duties and taxes may apply and are the responsibility of the recipient.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 sm:py-28 bg-white relative">
      {/* Visual background ambient light */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent-50/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="text-center mb-14 sm:mb-18">
          <span className="section-label">Support Guide</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle mt-3">
            Everything you need to know. Can&apos;t find the answer?{" "}
            <a href="/contact" className="text-accent-600 hover:text-accent-700 transition-colors font-semibold relative inline-block group">
              <span>Contact our team</span>
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-accent-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </a>
            .
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`border rounded-2.5xl overflow-hidden transition-all duration-500 ease-premium ${
                  isOpen
                    ? "border-charcoal-200/80 shadow-soft-md bg-white/80 backdrop-blur-md"
                    : "border-charcoal-100/70 hover:border-charcoal-200/60 bg-white/40"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between px-6 sm:px-8 py-6.5 text-left transition-colors duration-300"
                  aria-expanded={isOpen}
                >
                  <span className="text-[15px] sm:text-base font-semibold text-charcoal-900 pr-6">
                    {faq.question}
                  </span>
                  
                  {/* Chic rotating badge */}
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-500 ease-premium ${
                      isOpen
                        ? "bg-charcoal-950 border-charcoal-950 rotate-45 text-white"
                        : "bg-white border-charcoal-100 text-charcoal-400 group-hover:border-charcoal-200 shadow-soft"
                    }`}
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </button>

                <div
                  className={`transition-all duration-500 ease-premium ${
                    isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                  }`}
                >
                  <div className="px-6 sm:px-8 pb-6.5 text-sm sm:text-[14.5px] text-charcoal-500 leading-relaxed font-light">
                    <p className="border-t border-charcoal-100/50 pt-5">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
