interface StatCardProps {
  title: string;
  value: string | number;
  sub?: string;
  trend?: { value: number; label: string };
  icon: React.ReactNode;
  accent?: "violet" | "blue" | "emerald" | "amber";
}

const ACCENT = {
  violet: {
    gradient: "from-violet-600 to-indigo-600",
    glow: "shadow-violet-900/50",
    border: "hover:border-violet-500/30",
  },
  blue: {
    gradient: "from-blue-600 to-cyan-500",
    glow: "shadow-blue-900/50",
    border: "hover:border-cyan-500/30",
  },
  emerald: {
    gradient: "from-emerald-600 to-teal-500",
    glow: "shadow-emerald-900/50",
    border: "hover:border-emerald-500/30",
  },
  amber: {
    gradient: "from-amber-500 to-orange-500",
    glow: "shadow-amber-900/50",
    border: "hover:border-amber-500/30",
  },
};

export default function StatCard({
  title,
  value,
  sub,
  trend,
  icon,
  accent = "violet",
}: StatCardProps) {
  const cfg = ACCENT[accent];

  return (
    <div
      className={`rounded-2xl p-5 sm:p-6 border transition-all duration-300 hover:-translate-y-1 ${cfg.border} flex flex-col items-center justify-center text-center relative overflow-hidden`}
      style={{
        background: "rgba(255, 255, 255, 0.03)",
        borderColor: "rgba(255, 255, 255, 0.07)",
        backdropFilter: "blur(16px)",
      }}
    >
      {/* Icon + Amount side-by-side row */}
      <div className="flex items-center justify-center gap-3.5 mb-2">
        <div
          className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${cfg.gradient} flex items-center justify-center text-white shadow-lg ${cfg.glow} shrink-0`}
        >
          {icon}
        </div>
        <p
          className="text-2xl sm:text-3xl font-black tracking-tight leading-none"
          style={{ color: "#f1f5f9" }}
        >
          {value}
        </p>
      </div>

      {/* Title */}
      <p
        className="text-xs sm:text-sm font-semibold tracking-wide text-center"
        style={{ color: "rgba(148, 163, 184, 0.7)" }}
      >
        {title}
      </p>

      {sub && (
        <p
          className="text-xs mt-1 text-center"
          style={{ color: "rgba(148, 163, 184, 0.4)" }}
        >
          {sub}
        </p>
      )}

      {/* Trend Badge */}
      {trend && (
        <div
          className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full"
          style={
            trend.value >= 0
              ? {
                  background: "rgba(52, 211, 153, 0.12)",
                  color: "#34d399",
                  border: "1px solid rgba(52, 211, 153, 0.2)",
                }
              : {
                  background: "rgba(248, 113, 113, 0.12)",
                  color: "#f87171",
                  border: "1px solid rgba(248, 113, 113, 0.2)",
                }
          }
        >
          <svg
            className={`w-3 h-3 ${trend.value < 0 ? "rotate-180" : ""}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
              clipRule="evenodd"
            />
          </svg>
          {Math.abs(trend.value)}% {trend.label}
        </div>
      )}
    </div>
  );
}
