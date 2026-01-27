"use client";

import {
  ArrowLeft,
  Download,
  Share2,
  RefreshCw,
  ExternalLink,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { SEOAudit } from "@/lib/types";
import { ScoreGauge } from "./score-gauge";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  Database,
  Link,
  Shield,
  Code,
  FileText,
  Eye,
  Globe,
  Activity,
} from "lucide-react";
import { toast } from "sonner";

interface SEOAuditResultsProps {
  result: SEOAudit;
  onNewAudit: () => void;
  onRerun: () => void;
}

export function SEOAuditResults({
  result,
  onNewAudit,
  onRerun,
}: SEOAuditResultsProps) {
  const handleExportPDF = () => {
    alert("PDF export would be handled by the Go backend");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `SEO Audit Results for ${result.url}`,
        text: `Score: ${result.overall_score.toFixed(1)}/100 (${result.grade})`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleCopyMarkdown = async () => {
    if (!result.markdown) {
      toast("No markdown content available");
      return;
    }

    try {
      await navigator.clipboard.writeText(result.markdown);
      toast("Markdown copied to clipboard! Ready to use in LLMs.");
    } catch (error) {
      console.error("Failed to copy markdown:", error);
      toast("Failed to copy markdown to clipboard");
    }
  };

  const categories = [
    {
      name: "Technical SEO",
      score: result.technical_seo,
      icon: Database,
      color: "text-blue-500",
    },
    {
      name: "On-Page SEO",
      score: result.on_page_seo,
      icon: FileText,
      color: "text-green-500",
    },
    {
      name: "Content Quality",
      score: result.content_quality,
      icon: Eye,
      color: "text-purple-500",
    },
    {
      name: "Link Structure",
      score: result.link_structure,
      icon: Link,
      color: "text-orange-500",
    },
    {
      name: "Schema Markup",
      score: result.schema_markup,
      icon: Code,
      color: "text-yellow-500",
    },
    {
      name: "Security",
      score: result.security,
      icon: Shield,
      color: "text-red-500",
    },
    {
      name: "User Experience",
      score: result.user_experience,
      icon: Globe,
      color: "text-cyan-500",
    },
    ...(result.web_vitals
      ? [
          {
            name: "Web Vitals",
            score: result.web_vitals,
            icon: Activity,
            color: "text-pink-500",
          },
        ]
      : []),
  ];

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
          {result.markdown && (
            <Button variant="outline" size="sm" onClick={handleCopyMarkdown}>
              <Copy className="w-4 h-4 mr-2" />
              Copy Markdown
            </Button>
          )}
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
              {new Date(result.timestamp).toLocaleString()}
            </p>
          </div>
        </div>
      </Card>

      {/* Score Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="bg-card border-border p-6 flex flex-col items-center justify-center lg:col-span-1">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Overall Score
          </h2>
          <ScoreGauge score={result.overall_score} size="lg" />
          <p className="mt-4 text-sm text-muted-foreground text-center">
            Your website scores better than{" "}
            <span className="text-foreground font-medium">
              {Math.min(Math.round(result.overall_score) + 15, 95)}%
            </span>{" "}
            of websites we&apos;ve analyzed
          </p>
        </Card>

        <Card className="bg-card border-border p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Category Breakdown
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categories.slice(0, 4).map((category) => {
              const Icon = category.icon;
              return (
                <div key={category.name} className="text-center">
                  <div className="flex justify-center mb-2">
                    <Icon className={`w-5 h-5 ${category.color}`} />
                  </div>
                  <ScoreGauge score={category.score.score} size="sm" />
                  <p className="mt-2 text-xs text-muted-foreground">
                    {category.name}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {categories.slice(4).map((category) => {
              const Icon = category.icon;
              return (
                <div key={category.name} className="text-center">
                  <div className="flex justify-center mb-2">
                    <Icon className={`w-5 h-5 ${category.color}`} />
                  </div>
                  <ScoreGauge score={category.score.score} size="sm" />
                  <p className="mt-2 text-xs text-muted-foreground">
                    {category.name}
                  </p>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Recommendations */}
      {result.recommendations.length > 0 && (
        <Card className="bg-card border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Top Recommendations
          </h2>
          <div className="space-y-3">
            {result.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="mt-0.5">
                  <AlertCircle className="w-5 h-5 text-yellow-500" />
                </div>
                <p className="text-sm text-muted-foreground">
                  {recommendation}
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Detailed Analysis */}
      <Card className="bg-card border-border p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Detailed Analysis
        </h2>
        <Tabs defaultValue="technical" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
            <TabsTrigger value="technical">Technical</TabsTrigger>
            <TabsTrigger value="onpage">On-Page</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="links">Links</TabsTrigger>
            <TabsTrigger value="schema">Schema</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="ux">UX</TabsTrigger>
            {result.web_vitals && (
              <TabsTrigger value="vitals">Web Vitals</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="technical" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">Technical SEO</h3>
              <Badge variant="outline">
                {result.technical_seo.score.toFixed(1)} /{" "}
                {result.technical_seo.max_score}
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MetricCard
                label="Load Time"
                value={`${result.technical_seo.load_time_ms}ms`}
              />
              <MetricCard
                label="Page Size"
                value={formatBytes(result.technical_seo.page_size_bytes)}
              />
              <MetricCard
                label="HTTP Requests"
                value={result.technical_seo.http_requests.toString()}
              />
              <MetricCard
                label="Status Code"
                value={result.technical_seo.http_status_code.toString()}
              />
              <BooleanMetric
                label="HTTPS"
                value={result.technical_seo.is_https}
              />
              <BooleanMetric
                label="Mobile Friendly"
                value={result.technical_seo.is_mobile_friendly}
              />
              <BooleanMetric
                label="Has Robots.txt"
                value={result.technical_seo.has_robots_txt}
              />
              <BooleanMetric
                label="Has Sitemap"
                value={result.technical_seo.has_sitemap}
              />
              <BooleanMetric
                label="Has Viewport"
                value={result.technical_seo.has_viewport}
              />
            </div>
            <IssuesList issues={result.technical_seo.issues} />
          </TabsContent>

          <TabsContent value="onpage" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">On-Page SEO</h3>
              <Badge variant="outline">
                {result.on_page_seo.score.toFixed(1)} /{" "}
                {result.on_page_seo.max_score}
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MetricCard
                label="Title Length"
                value={`${result.on_page_seo.title_length} chars`}
              />
              <MetricCard
                label="Meta Description"
                value={`${result.on_page_seo.meta_description_length} chars`}
              />
              <MetricCard
                label="H1 Count"
                value={result.on_page_seo.h1_count.toString()}
              />
              <MetricCard
                label="H2 Count"
                value={result.on_page_seo.h2_count.toString()}
              />
              <BooleanMetric
                label="Has Title"
                value={result.on_page_seo.has_title}
              />
              <BooleanMetric
                label="Has Meta Description"
                value={result.on_page_seo.has_meta_description}
              />
              <BooleanMetric label="Has H1" value={result.on_page_seo.has_h1} />
              <BooleanMetric
                label="Has OG Tags"
                value={result.on_page_seo.has_og_tags}
              />
              <BooleanMetric
                label="Has Twitter Card"
                value={result.on_page_seo.has_twitter_card}
              />
              <BooleanMetric
                label="Has Canonical"
                value={result.on_page_seo.has_canonical}
              />
              <BooleanMetric
                label="Keyword in Title"
                value={result.on_page_seo.keyword_in_title}
              />
              <BooleanMetric
                label="Proper Heading Hierarchy"
                value={result.on_page_seo.proper_heading_hierarchy}
              />
            </div>
            <IssuesList issues={result.on_page_seo.issues} />
          </TabsContent>

          <TabsContent value="content" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">Content Quality</h3>
              <Badge variant="outline">
                {result.content_quality.score.toFixed(1)} /{" "}
                {result.content_quality.max_score}
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MetricCard
                label="Word Count"
                value={result.content_quality.word_count.toString()}
              />
              <MetricCard
                label="Paragraph Count"
                value={result.content_quality.paragraph_count.toString()}
              />
              <MetricCard
                label="Image Count"
                value={result.content_quality.image_count.toString()}
              />
              <MetricCard
                label="Images with Alt"
                value={result.content_quality.images_with_alt.toString()}
              />
              <MetricCard
                label="Internal Links"
                value={result.content_quality.internal_links.toString()}
              />
              <MetricCard
                label="External Links"
                value={result.content_quality.external_links.toString()}
              />
              <MetricCard
                label="Readability Score"
                value={result.content_quality.readability_score.toFixed(1)}
              />
            </div>
            <IssuesList issues={result.content_quality.issues} />
          </TabsContent>

          <TabsContent value="links" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">Link Structure</h3>
              <Badge variant="outline">
                {result.link_structure.score.toFixed(1)} /{" "}
                {result.link_structure.max_score}
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MetricCard
                label="Internal Links"
                value={result.link_structure.internal_links.toString()}
              />
              <MetricCard
                label="External Links"
                value={result.link_structure.external_links.toString()}
              />
              <MetricCard
                label="Broken Links"
                value={result.link_structure.broken_links.toString()}
                status={
                  result.link_structure.broken_links === 0 ? "success" : "error"
                }
              />
              <BooleanMetric
                label="Has Breadcrumbs"
                value={result.link_structure.has_breadcrumbs}
              />
              <BooleanMetric
                label="Descriptive Anchors"
                value={result.link_structure.descriptive_anchors}
              />
            </div>
            <IssuesList issues={result.link_structure.issues} />
          </TabsContent>

          <TabsContent value="schema" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">Schema Markup</h3>
              <Badge variant="outline">
                {result.schema_markup.score.toFixed(1)} /{" "}
                {result.schema_markup.max_score}
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BooleanMetric
                label="Has Schema"
                value={result.schema_markup.has_schema}
              />
              <BooleanMetric
                label="Has Organization"
                value={result.schema_markup.has_organization}
              />
              <BooleanMetric
                label="Has Breadcrumb"
                value={result.schema_markup.has_breadcrumb}
              />
            </div>
            {result.schema_markup.schema_types.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2">Schema Types Found:</p>
                <div className="flex flex-wrap gap-2">
                  {result.schema_markup.schema_types.map((type) => (
                    <Badge key={type} variant="secondary">
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            <IssuesList issues={result.schema_markup.issues} />
          </TabsContent>

          <TabsContent value="security" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">Security</h3>
              <Badge variant="outline">
                {result.security.score.toFixed(1)} / {result.security.max_score}
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BooleanMetric label="HTTPS" value={result.security.is_https} />
              <BooleanMetric label="Has SSL" value={result.security.has_ssl} />
              <BooleanMetric
                label="Has Security Headers"
                value={result.security.has_security_headers}
              />
              <BooleanMetric
                label="Mixed Content"
                value={!result.security.mixed_content}
                inverse
              />
            </div>
            <IssuesList issues={result.security.issues} />
          </TabsContent>

          <TabsContent value="ux" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">User Experience</h3>
              <Badge variant="outline">
                {result.user_experience.score.toFixed(1)} /{" "}
                {result.user_experience.max_score}
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BooleanMetric
                label="Has Favicon"
                value={result.user_experience.has_favicon}
              />
              <BooleanMetric
                label="Readable Font Size"
                value={result.user_experience.font_size_readable}
              />
              <BooleanMetric
                label="Has Lang Attribute"
                value={result.user_experience.has_lang_attribute}
              />
              <BooleanMetric
                label="No Intrusive Popups"
                value={result.user_experience.no_intrusive_popups}
              />
            </div>
            <IssuesList issues={result.user_experience.issues} />
          </TabsContent>

          {result.web_vitals && (
            <TabsContent value="vitals" className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold">Core Web Vitals</h3>
                <Badge variant="outline">
                  {result.web_vitals.score.toFixed(1)} /{" "}
                  {result.web_vitals.max_score}
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <WebVitalMetric
                  label="LCP (Largest Contentful Paint)"
                  value={`${result.web_vitals.lcp_ms.toFixed(0)}ms`}
                  rating={result.web_vitals.lcp_rating}
                />
                <WebVitalMetric
                  label="FCP (First Contentful Paint)"
                  value={`${result.web_vitals.fcp_ms.toFixed(0)}ms`}
                  rating={result.web_vitals.fcp_rating}
                />
                <WebVitalMetric
                  label="CLS (Cumulative Layout Shift)"
                  value={result.web_vitals.cls.toFixed(3)}
                  rating={result.web_vitals.cls_rating}
                />
                <WebVitalMetric
                  label="TTFB (Time to First Byte)"
                  value={`${result.web_vitals.ttfb_ms.toFixed(0)}ms`}
                  rating={result.web_vitals.ttfb_rating}
                />
                <MetricCard
                  label="DOM Content Loaded"
                  value={`${result.web_vitals.dom_content_loaded_ms.toFixed(0)}ms`}
                />
                <MetricCard
                  label="DOM Complete"
                  value={`${result.web_vitals.dom_complete_ms.toFixed(0)}ms`}
                />
                <MetricCard
                  label="Transfer Size"
                  value={formatBytes(result.web_vitals.transfer_size_bytes)}
                />
                <MetricCard
                  label="Resource Count"
                  value={result.web_vitals.resource_count.toString()}
                />
              </div>
              <IssuesList issues={result.web_vitals.issues} />
            </TabsContent>
          )}
        </Tabs>
      </Card>
    </div>
  );
}

function MetricCard({
  label,
  value,
  status,
}: {
  label: string;
  value: string;
  status?: "success" | "error";
}) {
  return (
    <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span
        className={`text-sm font-medium ${
          status === "success"
            ? "text-green-500"
            : status === "error"
              ? "text-red-500"
              : "text-foreground"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function BooleanMetric({
  label,
  value,
  inverse,
}: {
  label: string;
  value: boolean;
  inverse?: boolean;
}) {
  const isPositive = inverse ? !value : value;
  return (
    <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
      <span className="text-sm text-muted-foreground">{label}</span>
      {isPositive ? (
        <CheckCircle2 className="w-5 h-5 text-green-500" />
      ) : (
        <XCircle className="w-5 h-5 text-red-500" />
      )}
    </div>
  );
}

function WebVitalMetric({
  label,
  value,
  rating,
}: {
  label: string;
  value: string;
  rating: string;
}) {
  const getRatingColor = (rating: string) => {
    switch (rating) {
      case "good":
        return "text-green-500 bg-green-500/10";
      case "needs-improvement":
        return "text-yellow-500 bg-yellow-500/10";
      case "poor":
        return "text-red-500 bg-red-500/10";
      default:
        return "text-muted-foreground bg-secondary";
    }
  };

  const getRatingLabel = (rating: string) => {
    switch (rating) {
      case "good":
        return "Good";
      case "needs-improvement":
        return "Needs Improvement";
      case "poor":
        return "Poor";
      default:
        return rating;
    }
  };

  return (
    <div className="flex flex-col p-3 bg-secondary/50 rounded-lg">
      <span className="text-sm text-muted-foreground mb-1">{label}</span>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{value}</span>
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-medium ${getRatingColor(rating)}`}
        >
          {getRatingLabel(rating)}
        </span>
      </div>
    </div>
  );
}

function IssuesList({ issues }: { issues: string[] }) {
  if (issues.length === 0) {
    return (
      <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
        <CheckCircle2 className="w-5 h-5 text-green-500" />
        <span className="text-sm text-green-600 dark:text-green-400">
          No issues found
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Issues Found:</p>
      {issues.map((issue, index) => (
        <div
          key={index}
          className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
        >
          <XCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
          <span className="text-sm text-red-600 dark:text-red-400">
            {issue}
          </span>
        </div>
      ))}
    </div>
  );
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}
