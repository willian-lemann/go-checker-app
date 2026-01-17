"use client"

import { Search, BarChart3, History, Settings } from "lucide-react"
import Link from "next/link"

interface HeaderProps {
  activeTab?: "audit" | "dashboard" | "history"
}

export function Header({ activeTab = "audit" }: HeaderProps) {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Search className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-lg">SEO Audit</span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              <Link
                href="/"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "audit"
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <Search className="w-4 h-4 inline-block mr-2" />
                Audit
              </Link>
              <Link
                href="/dashboard"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "dashboard"
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <BarChart3 className="w-4 h-4 inline-block mr-2" />
                Dashboard
              </Link>
              <Link
                href="/history"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "history"
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <History className="w-4 h-4 inline-block mr-2" />
                History
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
