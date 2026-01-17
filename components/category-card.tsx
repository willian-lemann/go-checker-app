"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, CheckCircle2, XCircle, AlertCircle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { type CategoryScore, getScoreColor, getScoreBgColor } from "@/lib/types"

interface CategoryCardProps {
  category: CategoryScore
}

export function CategoryCard({ category }: CategoryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const scoreColor = getScoreColor(category.score)
  const scoreBgColor = getScoreBgColor(category.score)

  const passCount = category.checks.filter((c) => c.status === "pass").length
  const failCount = category.checks.filter((c) => c.status === "fail").length
  const warningCount = category.checks.filter((c) => c.status === "warning").length

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pass":
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />
      case "fail":
        return <XCircle className="w-4 h-4 text-red-400" />
      case "warning":
        return <AlertCircle className="w-4 h-4 text-yellow-400" />
      default:
        return null
    }
  }

  const getPriorityBadge = (priority: string) => {
    const colors = {
      critical: "bg-red-400/20 text-red-400",
      high: "bg-orange-400/20 text-orange-400",
      medium: "bg-yellow-400/20 text-yellow-400",
      low: "bg-blue-400/20 text-blue-400",
    }
    return colors[priority as keyof typeof colors] || colors.low
  }

  return (
    <Card className="bg-card border-border overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-secondary/30 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-lg ${scoreBgColor} flex items-center justify-center`}>
            <span className={`text-lg font-bold ${scoreColor}`}>{category.score}</span>
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-foreground">{category.name}</h3>
            <p className="text-sm text-muted-foreground">
              {passCount} passed · {warningCount > 0 && `${warningCount} warnings · `}
              {failCount > 0 && `${failCount} failed`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground hidden sm:block">{category.weight}% weight</span>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="border-t border-border">
          <div className="divide-y divide-border">
            {category.checks.map((check, index) => (
              <div key={index} className="p-4 flex items-start gap-4">
                <div className="mt-0.5">{getStatusIcon(check.status)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-foreground">{check.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityBadge(check.priority)}`}>
                      {check.priority}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{check.message}</p>
                  {check.recommendation && check.status !== "pass" && (
                    <p className="text-sm text-primary mt-2">💡 {check.recommendation}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}
