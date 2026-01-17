"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { UrlInput } from "@/components/url-input";
import { AuditProgress } from "@/components/audit-progress";
import { SEOAuditResults } from "@/components/seo-audit-results";
import { FeaturesSection } from "@/components/features-section";
import type { SEOAudit } from "@/lib/types";
import { auditURL } from "@/lib/api";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [auditResult, setAuditResult] = useState<SEOAudit | null>(null);
  const [currentUrl, setCurrentUrl] = useState("");

  const handleAudit = async (url: string) => {
    setIsLoading(true);
    setCurrentUrl(url);
    setAuditResult(null);

    try {
      const result = await auditURL(url);
      setAuditResult(result);
    } catch (error) {
      console.error("Audit failed:", error);
      alert(
        `Failed to complete audit: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewAudit = () => {
    setAuditResult(null);
    setCurrentUrl("");
  };

  const handleRerun = () => {
    if (currentUrl) {
      handleAudit(currentUrl);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header activeTab="audit" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!auditResult ? (
          <>
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">
                Analyze Your Website&apos;s
                <span className="text-primary"> SEO Performance</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Get a comprehensive SEO audit with actionable recommendations.
                Our tool analyzes 100+ factors to help you improve your search
                rankings.
              </p>
            </div>

            {/* URL Input */}
            <div className="mb-16">
              <UrlInput onSubmit={handleAudit} isLoading={isLoading} />
            </div>

            {/* Progress Indicator */}
            {isLoading && (
              <div className="mb-16">
                <AuditProgress isActive={isLoading} />
              </div>
            )}

            {/* Features */}
            {!isLoading && <FeaturesSection />}
          </>
        ) : (
          <SEOAuditResults
            result={auditResult}
            onNewAudit={handleNewAudit}
            onRerun={handleRerun}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 SEO Audit Tool. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                API Docs
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
