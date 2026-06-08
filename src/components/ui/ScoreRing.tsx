import { scoreColor } from "@/lib/score-style";
import { cn } from "@/lib/format";

interface ScoreRingProps {
  score: number; // 0-100
  size?: number;
  stroke?: number;
  className?: string;
  showLabel?: boolean;
}

/** Circular gauge for the 0-100 final score. */
export function ScoreRing({
  score,
  size = 120,
  stroke = 10,
  className,
  showLabel = true,
}: ScoreRingProps) {
  const clamped = Math.max(0, Math.min(100, score));
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;
  const color = scoreColor(clamped);

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--color-border)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      </svg>
      {showLabel ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold tabular-nums" style={{ color }}>
            {Math.round(clamped)}
          </span>
          <span className="text-[10px] font-medium uppercase tracking-wide text-muted">/ 100</span>
        </div>
      ) : null}
    </div>
  );
}
