"use client";

import React, { useState, useEffect } from "react";

interface DemoMfsGatewayModalProps {
  isOpen: boolean;
  method: "bkash" | "nagad" | "rocket" | "";
  amount: number;
  onSuccess: (txnId: string, accountNumber: string) => void;
  onClose: () => void;
}

export default function DemoMfsGatewayModal({
  isOpen,
  method,
  amount,
  onSuccess,
  onClose,
}: DemoMfsGatewayModalProps) {
  const [step, setStep] = useState<"number" | "otp" | "pin" | "processing" | "success">("number");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [pin, setPin] = useState("");
  const [agreed, setAgreed] = useState(true);
  const [error, setError] = useState("");
  const [generatedTxnId, setGeneratedTxnId] = useState("");

  // Reset modal state when method changes or opens
  useEffect(() => {
    if (isOpen) {
      setStep("number");
      setPhone("01712345678");
      setOtp("");
      setPin("");
      setError("");
      setAgreed(true);
      setGeneratedTxnId("");
    }
  }, [isOpen, method]);

  if (!isOpen || !method) return null;

  const brand = {
    bkash: {
      name: "bKash",
      bgColor: "bg-[#E2136E]",
      borderColor: "border-[#E2136E]",
      textColor: "text-[#E2136E]",
      hoverBg: "hover:bg-[#c90f61]",
      lightBg: "bg-[#fce7f0]",
      darkBg: "bg-[#9d0f4e]",
      accentGradient: "from-[#E2136E] to-[#b00c53]",
      prefix: "BK",
      helpPhone: "16247",
    },
    nagad: {
      name: "Nagad",
      bgColor: "bg-[#F05A28]",
      borderColor: "border-[#F05A28]",
      textColor: "text-[#F05A28]",
      hoverBg: "hover:bg-[#d84d1e]",
      lightBg: "bg-[#fff0ea]",
      darkBg: "bg-[#b03a0d]",
      accentGradient: "from-[#F05A28] to-[#c73e10]",
      prefix: "NG",
      helpPhone: "16167",
    },
    rocket: {
      name: "Rocket",
      bgColor: "bg-[#8C3494]",
      borderColor: "border-[#8C3494]",
      textColor: "text-[#8C3494]",
      hoverBg: "hover:bg-[#772a7e]",
      lightBg: "bg-[#f3e8ff]",
      darkBg: "bg-[#5b21b6]",
      accentGradient: "from-[#8C3494] to-[#671d6d]",
      prefix: "RK",
      helpPhone: "16216",
    },
  }[method];

  const handleNumberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 11) {
      setError("Please enter a valid 11-digit mobile number");
      return;
    }
    setError("");
    setStep("otp");
    setOtp("123456"); // Pre-fill demo OTP for quick testing
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length < 4) {
      setError("Please enter the verification code");
      return;
    }
    setError("");
    setStep("pin");
    setPin("12345"); // Pre-fill demo PIN
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin || pin.length < 4) {
      setError("Please enter your 5-digit PIN");
      return;
    }
    setError("");
    setStep("processing");

    // Generate realistic demo TxnID
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let randomPart = "";
    for (let i = 0; i < 8; i++) {
      randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const newTxnId = `${brand.prefix}${randomPart}`;
    setGeneratedTxnId(newTxnId);

    setTimeout(() => {
      setStep("success");
    }, 1500);
  };

  const handleFinish = () => {
    onSuccess(generatedTxnId, phone);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col">
        {/* Gateway Header Banner */}
        <div className={`p-6 text-white bg-gradient-to-r ${brand.accentGradient} relative flex flex-col justify-between`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white/80 hover:text-white transition-colors"
            title="Close Gateway"
          >
            ✕
          </button>

          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[10px] font-black tracking-widest uppercase bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-white">
                Demo Payment Gateway
              </span>
              <h2 className="text-2xl font-black tracking-tight mt-1">{brand.name} Checkout</h2>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-xl font-bold border border-white/20">
              {brand.name[0]}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/15 flex items-center justify-between">
            <div>
              <p className="text-[11px] text-white/70 font-medium">Merchant: <span className="text-white font-bold">ShajSutro Official</span></p>
              <p className="text-[11px] text-white/70 font-medium">Invoice: <span className="text-white font-mono">INV-{(Date.now() % 100000).toString()}</span></p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase text-white/70 font-bold">Total Amount</p>
              <p className="text-xl font-black text-white">৳{amount.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Modal Body Steps */}
        <div className="p-6 flex-1 flex flex-col justify-between bg-slate-50/50">
          {/* STEP 1: MOBILE NUMBER */}
          {step === "number" && (
            <form onSubmit={handleNumberSubmit} className="space-y-4">
              <div className="text-center mb-2">
                <p className="text-sm font-bold text-slate-800">Your {brand.name} Account Number</p>
                <p className="text-xs text-slate-500 font-light mt-0.5">
                  Enter 11-digit mobile number to initiate demo payment
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Mobile Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    maxLength={11}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    placeholder="e.g. 01712345678"
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 font-mono text-lg tracking-wider text-slate-900 bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setPhone("01712345678")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-2.5 py-1 text-[10px] font-bold rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                  >
                    Auto-Fill
                  </button>
                </div>
              </div>

              {error && <p className="text-xs text-rose-600 font-medium text-center">{error}</p>}

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="mfs-terms"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="rounded text-slate-900 focus:ring-slate-900"
                />
                <label htmlFor="mfs-terms" className="text-[11px] text-slate-500 font-light">
                  I agree to the terms and conditions of {brand.name} demo payment.
                </label>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 px-4 rounded-2xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!agreed}
                  className={`flex-1 py-3 px-4 rounded-2xl text-white font-bold text-sm shadow-md transition-all ${brand.bgColor} ${brand.hoverBg} disabled:opacity-50`}
                >
                  Proceed
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: VERIFICATION OTP */}
          {step === "otp" && (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div className="text-center mb-2">
                <p className="text-sm font-bold text-slate-800">Verification Code (OTP)</p>
                <p className="text-xs text-slate-500 font-light mt-0.5">
                  Demo OTP code sent to <strong className="text-slate-700 font-mono">{phone}</strong>
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Enter 6-Digit OTP
                </label>
                <div className="relative">
                  <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="123456"
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 font-mono text-center text-xl tracking-[0.3em] font-bold text-slate-900 bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setOtp("123456")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-2.5 py-1 text-[10px] font-bold rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                  >
                    Auto OTP
                  </button>
                </div>
              </div>

              {error && <p className="text-xs text-rose-600 font-medium text-center">{error}</p>}

              <p className="text-[11px] text-center text-slate-400">
                Demo Code: <span className="font-mono font-bold text-slate-600">123456</span>
              </p>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep("number")}
                  className="flex-1 py-3 px-4 rounded-2xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-100 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className={`flex-1 py-3 px-4 rounded-2xl text-white font-bold text-sm shadow-md transition-all ${brand.bgColor} ${brand.hoverBg}`}
                >
                  Confirm OTP
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: PIN ENTRY */}
          {step === "pin" && (
            <form onSubmit={handlePinSubmit} className="space-y-4">
              <div className="text-center mb-2">
                <p className="text-sm font-bold text-slate-800">Enter Account PIN</p>
                <p className="text-xs text-slate-500 font-light mt-0.5">
                  Enter your {brand.name} account PIN to authorize payment
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  {brand.name} PIN
                </label>
                <div className="relative">
                  <input
                    type="password"
                    maxLength={5}
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="•••••"
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 font-mono text-center text-xl tracking-[0.4em] font-bold text-slate-900 bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setPin("12345")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-2.5 py-1 text-[10px] font-bold rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                  >
                    Auto PIN
                  </button>
                </div>
              </div>

              {error && <p className="text-xs text-rose-600 font-medium text-center">{error}</p>}

              <p className="text-[11px] text-center text-slate-400">
                Demo PIN: <span className="font-mono font-bold text-slate-600">12345</span>
              </p>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep("otp")}
                  className="flex-1 py-3 px-4 rounded-2xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-100 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className={`flex-1 py-3 px-4 rounded-2xl text-white font-bold text-sm shadow-md transition-all ${brand.bgColor} ${brand.hoverBg}`}
                >
                  Pay ৳{amount.toFixed(2)}
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: PROCESSING */}
          {step === "processing" && (
            <div className="py-10 text-center space-y-4">
              <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                <div className={`w-16 h-16 rounded-full border-4 border-slate-200 border-t-transparent animate-spin`} style={{ borderTopColor: brand.bgColor.replace("bg-[", "").replace("]", "") }} />
                <span className="absolute text-lg font-bold text-slate-700">{brand.name[0]}</span>
              </div>
              <div>
                <p className="text-base font-bold text-slate-900">Processing Payment...</p>
                <p className="text-xs text-slate-500 font-light mt-1">
                  Connecting to {brand.name} payment server. Please wait.
                </p>
              </div>
            </div>
          )}

          {/* STEP 5: SUCCESS & GENERATED TXNID */}
          {step === "success" && (
            <div className="py-6 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl shadow-lg shadow-emerald-600/20">
                ✓
              </div>

              <div>
                <h3 className="text-xl font-black text-slate-900">Payment Successful!</h3>
                <p className="text-xs text-slate-500 font-light mt-1">
                  Your transaction of ৳{amount.toFixed(2)} was completed via {brand.name}.
                </p>
              </div>

              <div className="bg-slate-100 rounded-2xl p-4 border border-slate-200 text-left space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-medium">Transaction ID:</span>
                  <span className="font-mono font-bold text-slate-900 tracking-wider">{generatedTxnId}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-medium">Account:</span>
                  <span className="font-mono text-slate-700">{phone}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-medium">Amount Paid:</span>
                  <span className="font-bold text-emerald-600">৳{amount.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleFinish}
                className="w-full py-3.5 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-xl transition-all"
              >
                Use TxnID & Continue
              </button>
            </div>
          )}

          {/* Footer Customer Support Note */}
          <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-400">
            <span>Security: 256-bit SSL Encrypted</span>
            <span>Helpline: {brand.helpPhone}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
