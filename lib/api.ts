import type { SEOAudit, AuditResult } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function auditURL(url: string): Promise<SEOAudit> {
  const response = await fetch(`${API_BASE_URL}/api/audit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to audit URL: ${error}`);
  }

  return response.json();
}

// Legacy functions for backward compatibility
export async function startAudit(url: string): Promise<{ auditId: string }> {
  const response = await fetch(`${API_BASE_URL}/api/audit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    throw new Error("Failed to start audit");
  }

  return response.json();
}

export async function getAuditStatus(auditId: string): Promise<AuditResult> {
  const response = await fetch(`${API_BASE_URL}/api/audit/${auditId}`);

  if (!response.ok) {
    throw new Error("Failed to get audit status");
  }

  return response.json();
}

export async function getAuditHistory(): Promise<AuditResult[]> {
  const response = await fetch(`${API_BASE_URL}/api/audits`);

  if (!response.ok) {
    throw new Error("Failed to get audit history");
  }

  return response.json();
}
