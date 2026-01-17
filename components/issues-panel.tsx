"use client"

import { AlertTriangle, Clock, Wrench } from "lucide-react"
import { Card } from "@/components/ui/card"
import type { Issue } from "@/lib/types"

interface IssuesPanelProps {
  issues: Issue[]
}

export function IssuesPanel({ issues }: IssuesPanelProps) {
  const sortedIssues = [...issues].sort((a, b) => {
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
    return priorityOrder[a.priority] - priorityOrder[b.priority]
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "border-l-red-500 bg-red-500/5"
      case "high":
        return "border-l-orange-500 bg-orange-500/5"
      case "medium":
        return "border-l-yellow-500 bg-yellow-500/5"
      case "low":
        return "border-l-blue-500 bg-blue-500/5"
      default:
        return "border-l-border"
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

  const getEffortBadge = (effort: string) => {
    const colors = {
      quick: "bg-emerald-400/20 text-emerald-400",
      medium: "bg-yellow-400/20 text-yellow-400",
      complex: "bg-orange-400/20 text-orange-400",
    }
    return colors[effort as keyof typeof colors] || colors.medium
  }

  if (issues.length === 0) {
    return (
      <Card className="bg-card border-border p-8 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-400/20 flex items-center justify-center mb-4">
          <AlertTriangle className="w-8 h-8 text-emerald-400" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No Critical Issues Found</h3>
        <p className="text-muted-foreground">Great job! Your website has no major SEO issues.</p>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Issues to Fix</h3>
        <span className="text-sm text-muted-foreground">{issues.length} issues found</span>
      </div>

      {sortedIssues.map((issue, index) => (
        <Card key={index} className={`bg-card border-border border-l-4 ${getPriorityColor(issue.priority)} p-4`}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityBadge(issue.priority)}`}>
                  {issue.priority}
                </span>
                <span className="text-xs text-muted-foreground">{issue.category}</span>
              </div>
              <h4 className="font-medium text-foreground mb-1">{issue.check}</h4>
              <p className="text-sm text-muted-foreground mb-3">{issue.message}</p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5 text-primary">
                  <Wrench className="w-4 h-4" />
                  <span>{issue.recommendation}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className={`text-xs px-2 py-0.5 rounded-full ${getEffortBadge(issue.effort)}`}>{issue.effort}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
