import { Zap, Shield, BarChart3, Clock, Code, Globe } from "lucide-react"
import { Card } from "@/components/ui/card"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get comprehensive audit results in under 30 seconds",
  },
  {
    icon: BarChart3,
    title: "100+ SEO Checks",
    description: "Analyze technical SEO, content, links, schema, and more",
  },
  {
    icon: Shield,
    title: "Security Analysis",
    description: "Check SSL, security headers, and accessibility compliance",
  },
  {
    icon: Clock,
    title: "Track Progress",
    description: "Monitor your SEO improvements over time with historical data",
  },
  {
    icon: Code,
    title: "Actionable Fixes",
    description: "Get specific recommendations with code examples",
  },
  {
    icon: Globe,
    title: "Any Website",
    description: "Works with any publicly accessible website or web app",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-16 border-t border-border">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-3">Comprehensive SEO Analysis</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Our audit engine checks over 100 SEO factors across 7 categories to give you a complete picture of your
          website&apos;s search engine optimization.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <Card key={feature.title} className="bg-card border-border p-6 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
