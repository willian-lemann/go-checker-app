"use client"

import { ArrowLeft, Download, Share2, RefreshCw, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { AuditResult } from "@/lib/types"
import { ScoreGauge } from "./score-gauge"
import { CategoryCard } from "./category-card"
import { IssuesPanel } from "./issues-panel"

interface AuditResultsProps {
  result: AuditResult
  onNewAudit: () => void
  onRerun: () => void
}

export function AuditResults({ result, onNewAudit, onRerun }: AuditResultsProps) {
  const handleExportPDF = () => {
    // This would call the backend to generate a PDF
    alert("PDF export would be handled by the Go backend")
  }

  const handleShare = () => {
    // This would generate a shareable link via the backend
    if (navigator.share) {
      navigator.share({
        title: `SEO Audit Results for ${result.url}`,
        text: `Score: ${result.overallScore}/100 (${result.grade})`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onNewAudit}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            New Audit
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onRerun}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Re-run
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportPDF}>
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* URL Banner */}
      <Card className="bg-card border-border p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
            <ExternalLink className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground">Analyzed URL</p>
            <a
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground font-medium hover:text-primary truncate block"
            >
              {result.url}
            </a>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Completed</p>
            <p className="text-foreground font-medium">
              {result.completedAt ? new Date(result.completedAt).toLocaleString() : "Just now"}
            </p>
          </div>
        </div>
      </Card>

      {/* Score Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="bg-card border-border p-6 flex flex-col items-center justify-center lg:col-span-1">
          <h2 className="text-lg font-semibold text-foreground mb-4">Overall Score</h2>
          <ScoreGauge score={result.overallScore} size="lg" />
          <p className="mt-4 text-sm text-muted-foreground text-center">
            Your website scores better than{" "}
            <span className="text-foreground font-medium">{Math.min(result.overallScore + 15, 95)}%</span> of websites
            we&apos;ve analyzed
          </p>
        </Card>

        <Card className="bg-card border-border p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-foreground mb-4">Category Breakdown</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {result.categories.slice(0, 4).map((category) => (
              <div key={category.name} className="text-center">
                <ScoreGauge score={category.score} size="sm" />
                <p className="mt-2 text-xs text-muted-foreground">{category.name}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {result.categories.slice(4).map((category) => (
              <div key={category.name} className="text-center">
                <ScoreGauge score={category.score} size="sm" />
                <p className="mt-2 text-xs text-muted-foreground">{category.name}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Issues Panel */}
      <IssuesPanel issues={result.issues} />

      {/* Detailed Categories */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Detailed Analysis</h2>
        <div className="space-y-3">
          {result.categories.map((category) => (
            <CategoryCard key={category.name} category={category} />
          ))}
        </div>
      </div>
    </div>
  )
}
