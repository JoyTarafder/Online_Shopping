"use client";

import { useEffect, useState, useCallback } from "react";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { getApiBase } from "@/lib/apiBase";

const API = getApiBase();

// â”€â”€â”€ Types â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

interface PromoCode {
  _id: string;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  minOrderAmount: number;
  maxUses: number | null;
  usedCount: number;
  isActive: boolean;
  expiresAt: string | null;
  description: string;
  createdAt: string;
}

const EMPTY_FORM = {
  code: "",
  type: "percentage" as "percentage" | "fixed",
  value: "",
  minOrderAmount: "",
  maxUses: "",
  expiresAt: "",
  description: "",
};

function isExpired(expiresAt: string | null): boolean {
  if (!expiresAt) return false;
  return new Date(expiresAt).getTime() < Date.now();
}

// â”€â”€â”€ Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export default function PromoCodesPage() {
  return (
    <AdminAuthGuard>
      <PromoCodesContent />
    </AdminAuthGuard>
  );
}

function PromoCodesContent() {
  const { token } = useAdminAuth();
  const [codes, setCodes] = useState<PromoCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState<PromoCode | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchCodes = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/promo-codes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setCodes(data.data ?? []);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchCodes();
  }, [fetchCodes]);

  const openCreate = () => {
    setEditTarget(null);
    setForm(EMPTY_FORM);
    setMsg(null);
    setShowForm(true);
  };

  const openEdit = (c: PromoCode) => {
    setEditTarget(c);
    setForm({
      code: c.code,
      type: c.type,
      value: String(c.value),
      minOrderAmount: String(c.minOrderAmount || ""),
      maxUses: c.maxUses !== null ? String(c.maxUses) : "",
      expiresAt: c.expiresAt ? c.expiresAt.slice(0, 10) : "",
      description: c.description,
    });
    setMsg(null);
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    setSaving(true);
    try {
      const body = {
        code: form.code.trim().toUpperCase(),
        type: form.type,
        value: Number(form.value),
        minOrderAmount: form.minOrderAmount ? Number(form.minOrderAmount) : 0,
        maxUses: form.maxUses ? Number(form.maxUses) : null,
        expiresAt: form.expiresAt ? new Date(form.expiresAt).toISOString() : null,
        description: form.description.trim(),
      };

      const url = editTarget ? `${API}/api/promo-codes/${editTarget._id}` : `${API}/api/promo-codes`;
      const method = editTarget ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to save promo code");
      }

      setMsg({ type: "success", text: editTarget ? "Promo code updated!" : "Promo code created!" });
      fetchCodes();
      setTimeout(() => setShowForm(false), 1200);
    } catch (err: unknown) {
      const text = err instanceof Error ? err.message : "Error saving promo code";
      setMsg({ type: "error", text });
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (c: PromoCode) => {
    try {
      await fetch(`${API}/api/promo-codes/${c._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isActive: !c.isActive }),
      });
      fetchCodes();
    } catch {
      // ignore
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this promo code?")) return;
    try {
      await fetch(`${API}/api/promo-codes/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCodes();
    } catch {
      // ignore
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/10 backdrop-blur-xs p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm ring-1 ring-white/5">
        <div>
          <span className="px-3 py-1 bg-violet-900/30 text-violet-300 text-xs font-bold rounded-full">
            Discounts & Promotions
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight mt-2">
            Promo Codes
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Create and manage promotional discount codes for checkout.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="px-6 py-3.5 bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-bold text-sm rounded-2xl shadow-lg hover:shadow-violet-200 transition-all duration-200 flex items-center justify-center gap-2 flex-shrink-0"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Create Code
        </button>
      </div>

      {/* Form Modal / Section */}
      {showForm && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            onClick={() => setShowForm(false)}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity duration-300"
          />

          <div className="rounded-3xl shadow-2xl  w-full max-w-2xl overflow-hidden my-6 relative z-10 animate-in zoom-in-95 duration-200 border border-white/5" style={{ background: "rgba(15,15,25,0.98)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-purple-950 to-indigo-950 text-white flex items-center justify-between">
              <h2 className="text-lg font-bold">
                {editTarget ? `Edit Code — ${editTarget.code}` : "New Promo Code"}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 sm:p-8 space-y-5">
              {msg && (
                <div
                  className={`px-4 py-3 rounded-2xl text-sm border font-medium ${
                    msg.type === "success"
                      ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                      : "bg-rose-50 border-rose-200 text-rose-700"
                  }`}
                >
                  {msg.text}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* Code */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Code *
                  </label>
                  <input
                    type="text"
                    required
                    disabled={!!editTarget}
                    value={form.code}
                    onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                    placeholder="e.g. SAVE20"
                    className="w-full px-4 py-3 rounded-2xl border border-white/8 text-slate-100 text-sm font-mono placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white/[0.01] disabled:opacity-50"
                  />
                </div>

                {/* Type */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Type *
                  </label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value as "percentage" | "fixed" })}
                    className="w-full px-4 py-3 rounded-2xl border border-white/8 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 bg-slate-900"
                  >
                    <option value="percentage" className="bg-slate-900 text-slate-100">Percentage (%)</option>
                    <option value="fixed" className="bg-slate-900 text-slate-100">Fixed Amount (৳)</option>
                  </select>
                </div>

                {/* Value */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Value * {form.type === "percentage" ? "(1–100%)" : "(৳)"}
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={form.type === "percentage" ? 100 : undefined}
                    step="0.01"
                    value={form.value}
                    onChange={(e) => setForm({ ...form, value: e.target.value })}
                    placeholder={form.type === "percentage" ? "e.g. 20" : "e.g. 150"}
                    className="w-full px-4 py-3 rounded-2xl border border-white/8 text-slate-100 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white/[0.01]"
                  />
                </div>

                {/* Min order */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Min Order Amount (৳)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={form.minOrderAmount}
                    onChange={(e) => setForm({ ...form, minOrderAmount: e.target.value })}
                    placeholder="0 = no minimum"
                    className="w-full px-4 py-3 rounded-2xl border border-white/8 text-slate-100 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white/[0.01]"
                  />
                </div>

                {/* Max uses */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Max Uses
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={form.maxUses}
                    onChange={(e) => setForm({ ...form, maxUses: e.target.value })}
                    placeholder="Leave blank = unlimited"
                    className="w-full px-4 py-3 rounded-2xl border border-white/8 text-slate-100 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white/[0.01]"
                  />
                </div>

                {/* Expires at */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Expires At
                  </label>
                  <input
                    type="date"
                    value={form.expiresAt}
                    onChange={(e) => setForm({ ...form, expiresAt: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-white/8 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white/[0.01]"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                  Description
                </label>
                <input
                  type="text"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="e.g. Save 20% on your entire order"
                  className="w-full px-4 py-3 rounded-2xl border border-white/8 text-slate-100 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white/[0.01]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-5 py-2.5 rounded-2xl border border-white/8 text-slate-300 font-bold text-sm hover:bg-white/[0.02] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2.5 bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white font-bold text-sm rounded-2xl shadow-md transition-colors"
                >
                  {saving && (
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  )}
                  {editTarget ? "Save Changes" : "Create Code"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Clean White Table Card */}
      <div className="rounded-3xl  p-6 sm:p-8" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-100">
            Active Promo Codes ({codes.length})
          </h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <svg className="w-8 h-8 animate-spin text-violet-400 mb-3" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : codes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-center bg-white/[0.01] rounded-2xl border border-dashed border-white/8">
            <div className="w-14 h-14 rounded-2xl bg-violet-100 text-violet-400 flex items-center justify-center text-2xl">
              ðŸŽŸï¸
            </div>
            <p className="text-slate-200 font-bold text-base">No promo codes yet</p>
            <p className="text-xs text-slate-400">Click &quot;Create Code&quot; above to add your first discount promo code.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  {["Code", "Type & Value", "Min Order", "Uses", "Expires", "Status", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {codes.map((c) => {
                  const expired = isExpired(c.expiresAt);
                  return (
                    <tr key={c._id} className="hover:bg-white/[0.04] transition-colors group">
                      {/* Code */}
                      <td className="px-4 py-4">
                        <span className="font-mono font-bold text-purple-300 bg-purple-500/10 border border-purple-500/30 px-3 py-1.5 rounded-xl text-xs inline-block shadow-sm">
                          {c.code}
                        </span>
                        {c.description && (
                          <p className="text-slate-400 text-xs mt-1 leading-snug">{c.description}</p>
                        )}
                      </td>

                      {/* Type & Value */}
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold uppercase ${
                              c.type === "percentage"
                                ? "bg-amber-500/10 text-amber-400 border border-amber-500/25"
                                : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25"
                            }`}
                          >
                            {c.type === "percentage" ? "%" : "৳"}
                          </span>
                          <span className="text-slate-100 font-bold text-sm">
                            {c.type === "percentage" ? `${c.value}% OFF` : `৳${c.value} OFF`}
                          </span>
                        </div>
                      </td>

                      {/* Min Order */}
                      <td className="px-4 py-4 font-semibold text-slate-300">
                        {c.minOrderAmount > 0 ? `৳${c.minOrderAmount}` : <span className="text-slate-500 font-normal">None</span>}
                      </td>

                      {/* Uses */}
                      <td className="px-4 py-4">
                        <span className="font-bold text-white text-sm">{c.usedCount}</span>
                        <span className="text-slate-400 font-medium">/{c.maxUses ?? "∞"}</span>
                      </td>

                      {/* Expires */}
                      <td className="px-4 py-4">
                        {c.expiresAt ? (
                          <span className={expired ? "text-rose-400 font-bold text-xs" : "text-slate-300 font-medium text-xs"}>
                            {new Date(c.expiresAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                            {expired && " (expired)"}
                          </span>
                        ) : (
                          <span className="text-slate-500 text-xs font-medium">No expiry</span>
                        )}
                      </td>

                      {/* Status toggle */}
                      <td className="px-4 py-4">
                        <button
                          type="button"
                          onClick={() => handleToggle(c)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                            c.isActive && !expired ? "bg-emerald-500" : "bg-slate-700"
                          }`}
                          title={c.isActive ? "Deactivate" : "Activate"}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${
                              c.isActive && !expired ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEdit(c)}
                            className="px-3 py-1.5 font-bold text-slate-300 bg-white/[0.05] hover:bg-white/[0.09] rounded-xl text-xs transition-colors border border-white/5"
                            title="Edit"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(c._id)}
                            className="px-3 py-1.5 font-bold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-xl text-xs transition-colors"
                            title="Delete"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

