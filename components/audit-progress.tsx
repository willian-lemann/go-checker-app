"use client";

import { useEffect, useState } from "react";
import {
  Loader2,
  CheckCircle2,
  Search,
  FileText,
  Link2,
  Shield,
  Zap,
  Code,
} from "lucide-react";

interface AuditProgressProps {
  isActive: boolean;
}

const steps = [
  { icon: Search, label: "Fetching page content" },
  { icon: Code, label: "Analyzing technical SEO" },
  { icon: FileText, label: "Checking on-page elements" },
  { icon: Link2, label: "Evaluating link structure" },
  { icon: Shield, label: "Assessing security & accessibility" },
  { icon: Zap, label: "Calculating final score" },
];

export function AuditProgress({ isActive }: AuditProgressProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    if (!isActive) {
      setCurrentStep(0);
      setCompletedSteps([]);
      return;
    }

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          setCompletedSteps((completed) => [...completed, prev]);
          return prev + 1;
        }
        return prev;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="space-y-3">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = completedSteps.includes(index);
          const isCurrent = currentStep === index;

          return (
            <div
              key={index}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                isCompleted
                  ? "bg-emerald-400/10"
                  : isCurrent
                    ? "bg-primary/10"
                    : "bg-secondary/50 opacity-50"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isCompleted
                    ? "bg-emerald-400/20"
                    : isCurrent
                      ? "bg-primary/20"
                      : "bg-secondary"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-primary animate-spin animation-duration-[400ms]" />
                ) : (
                  <Icon className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
              <span
                className={`text-sm font-medium ${
                  isCompleted
                    ? "text-emerald-400"
                    : isCurrent
                      ? "text-foreground"
                      : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
