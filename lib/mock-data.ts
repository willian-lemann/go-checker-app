import { type AuditResult, type SEOAudit, getGradeFromScore } from "./types";

export function generateMockSEOAudit(url: string): SEOAudit {
  const technicalScore = Math.floor(Math.random() * 30) + 65;
  const onPageScore = Math.floor(Math.random() * 25) + 70;
  const contentScore = Math.floor(Math.random() * 30) + 60;
  const linkScore = Math.floor(Math.random() * 35) + 55;
  const schemaScore = Math.floor(Math.random() * 40) + 50;
  const securityScore = Math.floor(Math.random() * 25) + 70;
  const uxScore = Math.floor(Math.random() * 30) + 65;

  const overallScore =
    technicalScore * 0.3 +
    onPageScore * 0.25 +
    contentScore * 0.2 +
    linkScore * 0.1 +
    schemaScore * 0.05 +
    securityScore * 0.05 +
    uxScore * 0.05;

  const recommendations: string[] = [];
  if (technicalScore < 70)
    recommendations.push(
      "Improve page load time by optimizing images and enabling caching",
    );
  if (onPageScore < 70)
    recommendations.push(
      "Optimize title tags and meta descriptions for better CTR",
    );
  if (contentScore < 70)
    recommendations.push("Expand content depth and improve readability");
  if (linkScore < 70)
    recommendations.push(
      "Fix broken links and improve internal linking structure",
    );
  if (schemaScore < 70)
    recommendations.push("Implement JSON-LD structured data markup");
  if (securityScore < 70)
    recommendations.push(
      "Add security headers like CSP, HSTS, and X-Frame-Options",
    );
  if (uxScore < 70)
    recommendations.push("Improve mobile user experience and accessibility");

  return {
    url,
    timestamp: new Date().toISOString(),
    technical_seo: {
      score: technicalScore,
      max_score: 100,
      load_time_ms: Math.floor(Math.random() * 3000) + 500,
      page_size_bytes: Math.floor(Math.random() * 2000000) + 500000,
      http_requests: Math.floor(Math.random() * 50) + 20,
      has_robots_txt: Math.random() > 0.2,
      has_sitemap: Math.random() > 0.3,
      is_https: Math.random() > 0.1,
      is_mobile_friendly: Math.random() > 0.2,
      has_viewport: Math.random() > 0.15,
      http_status_code: 200,
      issues:
        technicalScore < 70
          ? ["Page load time exceeds 3 seconds", "Missing viewport meta tag"]
          : [],
    },
    on_page_seo: {
      score: onPageScore,
      max_score: 100,
      has_title: true,
      title_length: Math.floor(Math.random() * 40) + 30,
      has_meta_description: Math.random() > 0.1,
      meta_description_length: Math.floor(Math.random() * 60) + 120,
      has_h1: Math.random() > 0.1,
      h1_count: Math.floor(Math.random() * 2) + 1,
      h2_count: Math.floor(Math.random() * 8) + 3,
      has_og_tags: Math.random() > 0.3,
      has_twitter_card: Math.random() > 0.4,
      has_canonical: Math.random() > 0.2,
      keyword_in_title: Math.random() > 0.3,
      proper_heading_hierarchy: Math.random() > 0.25,
      issues:
        onPageScore < 70
          ? ["Title tag too long", "Meta description missing"]
          : [],
    },
    content_quality: {
      score: contentScore,
      max_score: 100,
      word_count: Math.floor(Math.random() * 2000) + 500,
      paragraph_count: Math.floor(Math.random() * 20) + 5,
      image_count: Math.floor(Math.random() * 15) + 3,
      images_with_alt: Math.floor(Math.random() * 12) + 2,
      internal_links: Math.floor(Math.random() * 20) + 5,
      external_links: Math.floor(Math.random() * 10) + 2,
      readability_score: Math.random() * 40 + 50,
      issues:
        contentScore < 70
          ? [
              "Thin content - word count below recommended threshold",
              "Many images missing alt text",
            ]
          : [],
    },
    link_structure: {
      score: linkScore,
      max_score: 100,
      internal_links: Math.floor(Math.random() * 20) + 5,
      external_links: Math.floor(Math.random() * 10) + 2,
      broken_links: linkScore < 70 ? Math.floor(Math.random() * 5) + 1 : 0,
      has_breadcrumbs: Math.random() > 0.4,
      descriptive_anchors: Math.random() > 0.3,
      issues:
        linkScore < 70
          ? ["Broken links detected", "Generic anchor text used"]
          : [],
    },
    schema_markup: {
      score: schemaScore,
      max_score: 100,
      has_schema: Math.random() > 0.4,
      schema_types:
        schemaScore > 60 ? ["Organization", "WebPage", "BreadcrumbList"] : [],
      has_organization: Math.random() > 0.5,
      has_breadcrumb: Math.random() > 0.5,
      issues:
        schemaScore < 70
          ? ["No structured data found", "Missing Organization schema"]
          : [],
    },
    security: {
      score: securityScore,
      max_score: 100,
      is_https: Math.random() > 0.1,
      has_ssl: Math.random() > 0.1,
      mixed_content: Math.random() < 0.2,
      has_security_headers: Math.random() > 0.4,
      issues:
        securityScore < 70
          ? ["Missing security headers", "Mixed content detected"]
          : [],
    },
    user_experience: {
      score: uxScore,
      max_score: 100,
      has_favicon: Math.random() > 0.2,
      font_size_readable: Math.random() > 0.2,
      has_lang_attribute: Math.random() > 0.3,
      no_intrusive_popups: Math.random() > 0.3,
      issues:
        uxScore < 70
          ? ["Small touch targets on mobile", "Intrusive popups detected"]
          : [],
    },
    overall_score: overallScore,
    grade: getGradeFromScore(overallScore),
    recommendations,
  };
}

export function generateMockAuditResult(url: string): AuditResult {
  const technicalScore = Math.floor(Math.random() * 30) + 65;
  const onPageScore = Math.floor(Math.random() * 25) + 70;
  const contentScore = Math.floor(Math.random() * 30) + 60;
  const linkScore = Math.floor(Math.random() * 35) + 55;
  const schemaScore = Math.floor(Math.random() * 40) + 50;
  const securityScore = Math.floor(Math.random() * 25) + 70;
  const uxScore = Math.floor(Math.random() * 30) + 65;

  const overallScore = Math.round(
    technicalScore * 0.3 +
      onPageScore * 0.25 +
      contentScore * 0.2 +
      linkScore * 0.1 +
      schemaScore * 0.05 +
      securityScore * 0.05 +
      uxScore * 0.05,
  );

  return {
    id: crypto.randomUUID(),
    url,
    overallScore,
    grade: getGradeFromScore(overallScore),
    status: "completed",
    startedAt: new Date().toISOString(),
    completedAt: new Date().toISOString(),
    categories: [
      {
        name: "Technical SEO",
        score: technicalScore,
        weight: 30,
        checks: [
          {
            name: "Page Load Time",
            status: technicalScore > 80 ? "pass" : "warning",
            message:
              technicalScore > 80
                ? "Page loads in under 2 seconds"
                : "Page load time is 3.2 seconds",
            priority: "high",
            recommendation: "Optimize images and enable caching",
          },
          {
            name: "HTTPS",
            status: "pass",
            message: "Site uses HTTPS encryption",
            priority: "critical",
          },
          {
            name: "Mobile Responsive",
            status: technicalScore > 70 ? "pass" : "fail",
            message:
              technicalScore > 70
                ? "Site is mobile responsive"
                : "Site has mobile responsiveness issues",
            priority: "critical",
            recommendation: "Implement responsive design patterns",
          },
          {
            name: "Robots.txt",
            status: "pass",
            message: "Valid robots.txt found",
            priority: "medium",
          },
          {
            name: "XML Sitemap",
            status: technicalScore > 75 ? "pass" : "warning",
            message:
              technicalScore > 75
                ? "XML sitemap found and valid"
                : "XML sitemap has minor issues",
            priority: "medium",
            recommendation: "Update sitemap with all pages",
          },
          {
            name: "Canonical Tags",
            status: "pass",
            message: "Canonical tags properly implemented",
            priority: "high",
          },
          {
            name: "Compression",
            status: technicalScore > 65 ? "pass" : "fail",
            message:
              technicalScore > 65
                ? "Gzip compression enabled"
                : "No compression detected",
            priority: "high",
            recommendation: "Enable Gzip or Brotli compression",
          },
        ],
      },
      {
        name: "On-Page SEO",
        score: onPageScore,
        weight: 25,
        checks: [
          {
            name: "Title Tag",
            status: onPageScore > 75 ? "pass" : "warning",
            message:
              onPageScore > 75
                ? "Title tag is optimized (55 characters)"
                : "Title tag is too long (72 characters)",
            priority: "critical",
            recommendation: "Keep title under 60 characters",
          },
          {
            name: "Meta Description",
            status: onPageScore > 70 ? "pass" : "warning",
            message:
              onPageScore > 70
                ? "Meta description is well-optimized"
                : "Meta description could be improved",
            priority: "high",
            recommendation:
              "Write compelling meta description between 150-160 characters",
          },
          {
            name: "H1 Tag",
            status: "pass",
            message: "Single H1 tag found with keyword",
            priority: "critical",
          },
          {
            name: "Heading Hierarchy",
            status: onPageScore > 80 ? "pass" : "warning",
            message:
              onPageScore > 80
                ? "Proper heading structure (H1-H6)"
                : "Minor heading hierarchy issues",
            priority: "medium",
            recommendation: "Ensure headings follow proper hierarchy",
          },
          {
            name: "Image Alt Text",
            status: onPageScore > 65 ? "pass" : "fail",
            message:
              onPageScore > 65
                ? "92% of images have alt text"
                : "Only 45% of images have alt text",
            priority: "high",
            recommendation: "Add descriptive alt text to all images",
          },
          {
            name: "Open Graph Tags",
            status: "pass",
            message: "Open Graph tags are complete",
            priority: "medium",
          },
        ],
      },
      {
        name: "Content Quality",
        score: contentScore,
        weight: 20,
        checks: [
          {
            name: "Word Count",
            status: contentScore > 70 ? "pass" : "warning",
            message:
              contentScore > 70
                ? "Content has 1,847 words (good depth)"
                : "Content has only 423 words (thin content)",
            priority: "high",
            recommendation:
              "Add more comprehensive content (aim for 1000+ words)",
          },
          {
            name: "Readability",
            status: contentScore > 65 ? "pass" : "warning",
            message:
              contentScore > 65
                ? "Flesch Reading Ease: 62 (Standard)"
                : "Flesch Reading Ease: 38 (Difficult)",
            priority: "medium",
            recommendation:
              "Simplify sentence structure and use shorter paragraphs",
          },
          {
            name: "Keyword Density",
            status: "pass",
            message: "Primary keyword density: 1.8%",
            priority: "medium",
          },
          {
            name: "Internal Links",
            status: contentScore > 60 ? "pass" : "warning",
            message:
              contentScore > 60
                ? "12 internal links found"
                : "Only 2 internal links found",
            priority: "medium",
            recommendation: "Add more relevant internal links",
          },
          {
            name: "External Links",
            status: "pass",
            message: "5 external links to authoritative sources",
            priority: "low",
          },
        ],
      },
      {
        name: "Link Structure",
        score: linkScore,
        weight: 10,
        checks: [
          {
            name: "Broken Links",
            status: linkScore > 70 ? "pass" : "fail",
            message:
              linkScore > 70
                ? "No broken links detected"
                : "3 broken links found",
            priority: "high",
            recommendation: "Fix or remove broken links",
          },
          {
            name: "Internal Link Depth",
            status: "pass",
            message: "Average link depth: 2.3 clicks",
            priority: "medium",
          },
          {
            name: "Anchor Text",
            status: linkScore > 60 ? "pass" : "warning",
            message:
              linkScore > 60
                ? "Descriptive anchor text used"
                : "Some generic anchor text detected",
            priority: "medium",
            recommendation:
              'Use descriptive anchor text instead of "click here"',
          },
          {
            name: "Nofollow Ratio",
            status: "pass",
            message: "Healthy nofollow/dofollow ratio",
            priority: "low",
          },
        ],
      },
      {
        name: "Schema Markup",
        score: schemaScore,
        weight: 5,
        checks: [
          {
            name: "JSON-LD",
            status: schemaScore > 60 ? "pass" : "fail",
            message:
              schemaScore > 60
                ? "JSON-LD schema detected"
                : "No JSON-LD schema found",
            priority: "high",
            recommendation: "Implement JSON-LD structured data",
          },
          {
            name: "Organization Schema",
            status: schemaScore > 70 ? "pass" : "warning",
            message:
              schemaScore > 70
                ? "Organization schema present"
                : "Organization schema missing",
            priority: "medium",
            recommendation: "Add Organization schema markup",
          },
          {
            name: "Breadcrumb Schema",
            status: schemaScore > 50 ? "pass" : "fail",
            message:
              schemaScore > 50
                ? "Breadcrumb schema implemented"
                : "No breadcrumb schema",
            priority: "medium",
            recommendation: "Add BreadcrumbList schema",
          },
        ],
      },
      {
        name: "Security & Accessibility",
        score: securityScore,
        weight: 5,
        checks: [
          {
            name: "SSL Certificate",
            status: "pass",
            message: "Valid SSL certificate (expires in 245 days)",
            priority: "critical",
          },
          {
            name: "Security Headers",
            status: securityScore > 75 ? "pass" : "warning",
            message:
              securityScore > 75
                ? "Security headers configured"
                : "Some security headers missing",
            priority: "high",
            recommendation: "Add CSP, HSTS, and X-Frame-Options headers",
          },
          {
            name: "ARIA Labels",
            status: securityScore > 70 ? "pass" : "warning",
            message:
              securityScore > 70
                ? "ARIA labels present on interactive elements"
                : "Some elements missing ARIA labels",
            priority: "medium",
            recommendation: "Add ARIA labels for accessibility",
          },
          {
            name: "Language Attribute",
            status: "pass",
            message: "HTML lang attribute set",
            priority: "medium",
          },
        ],
      },
      {
        name: "User Experience",
        score: uxScore,
        weight: 5,
        checks: [
          {
            name: "Favicon",
            status: "pass",
            message: "Favicon detected",
            priority: "low",
          },
          {
            name: "Font Size",
            status: "pass",
            message: "Base font size: 16px (readable)",
            priority: "medium",
          },
          {
            name: "Touch Targets",
            status: uxScore > 70 ? "pass" : "warning",
            message:
              uxScore > 70
                ? "Touch targets are appropriately sized"
                : "Some touch targets are too small",
            priority: "medium",
            recommendation: "Ensure touch targets are at least 44x44px",
          },
          {
            name: "Intrusive Popups",
            status: uxScore > 60 ? "pass" : "fail",
            message:
              uxScore > 60
                ? "No intrusive interstitials detected"
                : "Intrusive popup detected on mobile",
            priority: "high",
            recommendation: "Remove or delay intrusive popups",
          },
        ],
      },
    ],
    issues: [
      {
        category: "Technical SEO",
        check: "Page Load Time",
        priority: "high",
        message: "Page load time exceeds recommended threshold",
        recommendation:
          "Optimize images, enable caching, and minimize render-blocking resources",
        effort: "medium",
      },
      {
        category: "On-Page SEO",
        check: "Image Alt Text",
        priority: "high",
        message: "Multiple images missing alt text",
        recommendation:
          "Add descriptive alt text to all images for better accessibility and SEO",
        effort: "quick",
      },
      {
        category: "Content Quality",
        check: "Word Count",
        priority: "medium",
        message: "Content depth could be improved",
        recommendation:
          "Expand content with more detailed information and supporting sections",
        effort: "complex",
      },
      {
        category: "Schema Markup",
        check: "JSON-LD",
        priority: "high",
        message: "Structured data not implemented",
        recommendation:
          "Add JSON-LD schema markup for better search result appearance",
        effort: "medium",
      },
      {
        category: "Link Structure",
        check: "Broken Links",
        priority: "critical",
        message: "Broken links negatively impact user experience and SEO",
        recommendation: "Audit and fix all broken links on your site",
        effort: "quick",
      },
    ].filter(() => Math.random() > 0.4), // Randomly include some issues
  };
}
