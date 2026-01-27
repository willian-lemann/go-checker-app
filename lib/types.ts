// SEOAudit represents the complete audit result
export interface SEOAudit {
  url: string;
  timestamp: string;
  technical_seo: TechnicalSEOScore;
  on_page_seo: OnPageSEOScore;
  content_quality: ContentQualityScore;
  link_structure: LinkStructureScore;
  schema_markup: SchemaMarkupScore;
  security: SecurityScore;
  user_experience: UserExperienceScore;
  web_vitals?: WebVitalsScore;
  overall_score: number;
  grade: string;
  recommendations: string[];
  markdown?: string;
}

// TechnicalSEOScore holds technical SEO metrics
export interface TechnicalSEOScore {
  score: number;
  max_score: number;
  load_time_ms: number;
  page_size_bytes: number;
  http_requests: number;
  has_robots_txt: boolean;
  has_sitemap: boolean;
  is_https: boolean;
  is_mobile_friendly: boolean;
  has_viewport: boolean;
  http_status_code: number;
  issues: string[];
}

// OnPageSEOScore holds on-page SEO metrics
export interface OnPageSEOScore {
  score: number;
  max_score: number;
  has_title: boolean;
  title_length: number;
  has_meta_description: boolean;
  meta_description_length: number;
  has_h1: boolean;
  h1_count: number;
  h2_count: number;
  has_og_tags: boolean;
  has_twitter_card: boolean;
  has_canonical: boolean;
  keyword_in_title: boolean;
  proper_heading_hierarchy: boolean;
  issues: string[];
}

// ContentQualityScore holds content quality metrics
export interface ContentQualityScore {
  score: number;
  max_score: number;
  word_count: number;
  paragraph_count: number;
  image_count: number;
  images_with_alt: number;
  internal_links: number;
  external_links: number;
  readability_score: number;
  issues: string[];
}

// LinkStructureScore holds link structure metrics
export interface LinkStructureScore {
  score: number;
  max_score: number;
  internal_links: number;
  external_links: number;
  broken_links: number;
  has_breadcrumbs: boolean;
  descriptive_anchors: boolean;
  issues: string[];
}

// SchemaMarkupScore holds schema markup metrics
export interface SchemaMarkupScore {
  score: number;
  max_score: number;
  has_schema: boolean;
  schema_types: string[];
  has_organization: boolean;
  has_breadcrumb: boolean;
  issues: string[];
}

// SecurityScore holds security metrics
export interface SecurityScore {
  score: number;
  max_score: number;
  is_https: boolean;
  has_ssl: boolean;
  mixed_content: boolean;
  has_security_headers: boolean;
  issues: string[];
}

// UserExperienceScore holds UX metrics
export interface UserExperienceScore {
  score: number;
  max_score: number;
  has_favicon: boolean;
  font_size_readable: boolean;
  has_lang_attribute: boolean;
  no_intrusive_popups: boolean;
  issues: string[];
}

// WebVitalsScore holds Core Web Vitals metrics
export interface WebVitalsScore {
  score: number;
  max_score: number;
  lcp_ms: number; // Largest Contentful Paint (ms)
  lcp_rating: string; // good, needs-improvement, poor
  fcp_ms: number; // First Contentful Paint (ms)
  fcp_rating: string; // good, needs-improvement, poor
  cls: number; // Cumulative Layout Shift (unitless)
  cls_rating: string; // good, needs-improvement, poor
  ttfb_ms: number; // Time to First Byte (ms)
  ttfb_rating: string; // good, needs-improvement, poor
  dom_content_loaded_ms: number; // DOMContentLoaded event (ms)
  dom_complete_ms: number; // DOM complete (ms)
  transfer_size_bytes: number; // Total transfer size
  resource_count: number; // Number of resources loaded
  issues: string[];
}

// Legacy types for backward compatibility
export interface AuditResult {
  id: string;
  url: string;
  overallScore: number;
  grade: string;
  status: "pending" | "processing" | "completed" | "failed";
  categories: CategoryScore[];
  issues: Issue[];
  startedAt: string;
  completedAt?: string;
  error?: string;
}

export interface CategoryScore {
  name: string;
  score: number;
  weight: number;
  checks: Check[];
}

export interface Check {
  name: string;
  status: "pass" | "fail" | "warning";
  message: string;
  priority: "critical" | "high" | "medium" | "low";
  recommendation?: string;
}

export interface Issue {
  category: string;
  check: string;
  priority: "critical" | "high" | "medium" | "low";
  message: string;
  recommendation: string;
  effort: "quick" | "medium" | "complex";
}

export function getGradeFromScore(score: number): string {
  if (score >= 90) return "A+";
  if (score >= 85) return "A";
  if (score >= 80) return "A-";
  if (score >= 75) return "B+";
  if (score >= 70) return "B";
  if (score >= 65) return "B-";
  if (score >= 60) return "C+";
  if (score >= 55) return "C";
  if (score >= 50) return "C-";
  if (score >= 45) return "D+";
  if (score >= 40) return "D";
  return "F";
}

export function getGradeColor(grade: string): string {
  if (grade.startsWith("A")) return "text-emerald-400";
  if (grade.startsWith("B")) return "text-blue-400";
  if (grade.startsWith("C")) return "text-yellow-400";
  if (grade.startsWith("D")) return "text-orange-400";
  return "text-red-400";
}

export function getScoreColor(score: number): string {
  if (score >= 80) return "text-emerald-400";
  if (score >= 60) return "text-yellow-400";
  if (score >= 40) return "text-orange-400";
  return "text-red-400";
}

export function getScoreBgColor(score: number): string {
  if (score >= 80) return "bg-emerald-400/20";
  if (score >= 60) return "bg-yellow-400/20";
  if (score >= 40) return "bg-orange-400/20";
  return "bg-red-400/20";
}
// Helper function to convert SEOAudit to legacy AuditResult format
export function convertSEOAuditToAuditResult(seoAudit: SEOAudit): AuditResult {
  const categories: CategoryScore[] = [
    {
      name: "Technical SEO",
      score: seoAudit.technical_seo.score,
      weight: 30,
      checks: seoAudit.technical_seo.issues.map((issue) => ({
        name: "Technical Issue",
        status: "fail" as const,
        message: issue,
        priority: "high" as const,
      })),
    },
    {
      name: "On-Page SEO",
      score: seoAudit.on_page_seo.score,
      weight: 25,
      checks: seoAudit.on_page_seo.issues.map((issue) => ({
        name: "On-Page Issue",
        status: "fail" as const,
        message: issue,
        priority: "high" as const,
      })),
    },
    {
      name: "Content Quality",
      score: seoAudit.content_quality.score,
      weight: 20,
      checks: seoAudit.content_quality.issues.map((issue) => ({
        name: "Content Issue",
        status: "fail" as const,
        message: issue,
        priority: "medium" as const,
      })),
    },
    {
      name: "Link Structure",
      score: seoAudit.link_structure.score,
      weight: 10,
      checks: seoAudit.link_structure.issues.map((issue) => ({
        name: "Link Issue",
        status: "fail" as const,
        message: issue,
        priority: "high" as const,
      })),
    },
    {
      name: "Schema Markup",
      score: seoAudit.schema_markup.score,
      weight: 5,
      checks: seoAudit.schema_markup.issues.map((issue) => ({
        name: "Schema Issue",
        status: "fail" as const,
        message: issue,
        priority: "medium" as const,
      })),
    },
    {
      name: "Security",
      score: seoAudit.security.score,
      weight: 5,
      checks: seoAudit.security.issues.map((issue) => ({
        name: "Security Issue",
        status: "fail" as const,
        message: issue,
        priority: "critical" as const,
      })),
    },
    {
      name: "User Experience",
      score: seoAudit.user_experience.score,
      weight: 5,
      checks: seoAudit.user_experience.issues.map((issue) => ({
        name: "UX Issue",
        status: "fail" as const,
        message: issue,
        priority: "medium" as const,
      })),
    },
  ];

  const allIssues: Issue[] = [];

  seoAudit.technical_seo.issues.forEach((issue) => {
    allIssues.push({
      category: "Technical SEO",
      check: "Technical SEO",
      priority: "high",
      message: issue,
      recommendation:
        "Address this technical issue to improve site performance",
      effort: "medium",
    });
  });

  return {
    id: crypto.randomUUID(),
    url: seoAudit.url,
    overallScore: Math.round(seoAudit.overall_score),
    grade: seoAudit.grade,
    status: "completed",
    categories,
    issues: allIssues,
    startedAt: seoAudit.timestamp,
    completedAt: seoAudit.timestamp,
  };
}
