"use client"

import { getGradeColor, getGradeFromScore } from "@/lib/types"

interface ScoreGaugeProps {
  score: number
  size?: "sm" | "md" | "lg"
}

export function ScoreGauge({ score, size = "lg" }: ScoreGaugeProps) {
  const grade = getGradeFromScore(score)
  const gradeColor = getGradeColor(grade)

  const dimensions = {
    sm: { width: 120, height: 120, strokeWidth: 8, fontSize: "text-2xl", gradeSize: "text-sm" },
    md: { width: 160, height: 160, strokeWidth: 10, fontSize: "text-3xl", gradeSize: "text-base" },
    lg: { width: 220, height: 220, strokeWidth: 12, fontSize: "text-5xl", gradeSize: "text-xl" },
  }

  const { width, height, strokeWidth, fontSize, gradeSize } = dimensions[size]
  const radius = (width - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (score / 100) * circumference

  const getStrokeColor = () => {
    if (score >= 80) return "#34d399" // emerald-400
    if (score >= 60) return "#facc15" // yellow-400
    if (score >= 40) return "#fb923c" // orange-400
    return "#f87171" // red-400
  }

  return (
    <div className="relative flex items-center justify-center" style={{ width, height }}>
      <svg width={width} height={height} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-secondary"
        />
        {/* Progress circle */}
        <circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          fill="none"
          stroke={getStrokeColor()}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`${fontSize} font-bold text-foreground`}>{score}</span>
        <span className={`${gradeSize} font-semibold ${gradeColor}`}>{grade}</span>
      </div>
    </div>
  )
}
