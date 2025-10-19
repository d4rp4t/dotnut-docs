"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Copy, Check, Package, Zap, Shield, Lock, Bitcoin, Github } from "lucide-react"
import { CashewHero } from "@/components/cashew-hero"

export default function DotNutDocs() {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText("dotnet add package DotNut")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <span className="font-mono font-bold text-2xl">
            Dot<span className="text-[#7F38C9]">Nut</span>
          </span>
            <nav className="flex items-center gap-6">
              <a href="#docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Docs
              </a>
              <a href="#examples" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Examples
              </a>
              <a href="#api" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                API
              </a>
              <Button variant="ghost" size="sm">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Button>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left: Text Content */}
              <div className="space-y-6 md:space-y-8 order-2 lg:order-1">
                <div className="space-y-4">
                  <div className="inline-block">
                    <div className="text-xs font-mono text-muted-foreground bg-[#7F38C9]/10 px-3 py-1.5 rounded-full border border-[#7F38C9]/30">
                      Cashu protocol • .NET 8
                    </div>
                  </div>

                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
                  <span className="font-mono">
                    .N<span className="text-[#7F38C9]">u</span>t
                  </span>
                  </h1>

                  <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground text-pretty leading-relaxed">
                    Ecash for C#. Privacy-focused Bitcoin payments in .NET.
                  </p>

                  <p className="text-sm sm:text-base text-muted-foreground/80 leading-relaxed max-w-lg">
                    DotNut brings the Cashu protocol to .NET 8. Build wallets, payment systems, and ecash applications
                    with Bitcoin-backed bearer tokens.
                  </p>
                </div>

                {/* Installation */}
                <Card className="p-3 md:p-4 bg-card/50 border-border/50">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0 w-full">
                      <Package className="w-5 h-5 text-amber-600 shrink-0" />
                      <code className="text-xs sm:text-sm font-mono bg-secondary/50 px-3 py-1.5 rounded flex-1 truncate">
                        dotnet add package DotNut
                      </code>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={copyToClipboard}
                        className="shrink-0 self-end sm:self-auto"
                    >
                      {copied ? <Check className="w-4 h-4 text-amber-600" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </Card>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                  <Button size="lg" className="font-semibold bg-[#7F38C9] hover:bg-[#6B2FB0] text-white w-full sm:w-auto">
                    Get Started
                  </Button>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                    View on NuGet
                  </Button>
                </div>
              </div>

              {/* Right: Cashew Hero */}
              <div className="order-1 lg:order-2">
                <CashewHero />
                <p className="text-center text-xs text-muted-foreground/60 mt-12 font-mono italic">
                  "It's literally just a nut" - Anonymous .NET Developer
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-4 py-12 md:py-16 lg:py-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">Why DotNut?</h2>
              <p className="text-muted-foreground text-base md:text-lg">Because your users deserve privacy. And puns.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <Card className="p-4 bg-card/50 border-border/50">
                <div className="w-12 h-12 rounded-xl bg-[#7F38C9]/10 flex items-center justify-center mb-4">
                  <Lock className="w-6 h-6 text-[#7F38C9]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Blind signatures ensure complete transaction privacy. No tracking, no databases, no surveillance.
                </p>
              </Card>

              <Card className="p-4 bg-card/50 border-border/50">
                <div className="w-12 h-12 rounded-xl bg-amber-600/10 flex items-center justify-center mb-4">
                  <Bitcoin className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Bitcoin-Backed</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Ecash tokens backed by real Bitcoin. Lightning Network integration for instant transfers.
                </p>
              </Card>

              <Card className="p-4 bg-card/50 border-border/50">
                <div className="w-12 h-12 rounded-xl bg-[#7F38C9]/10 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-[#7F38C9]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Instant Payments</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Bearer tokens enable instant, final transactions. No confirmations, no waiting, no bullshit.
                </p>
              </Card>

              <Card className="p-4 bg-card/50 border-border/50">
                <div className="w-12 h-12 rounded-xl bg-amber-600/10 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Open Protocol</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Built on Cashu NUTs specs. Fully compatible with the ecosystem. Yes, they're called NUTs.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Code Example */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6 md:mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold mb-3">Quick Example</h3>
              <p className="text-muted-foreground text-sm md:text-base">Start building with ecash in minutes</p>
            </div>

            <Card className="p-4 md:p-6 bg-card/50 border-border/50">
            <pre className="text-xs sm:text-sm font-mono overflow-x-auto">
              <code className="text-foreground">
                {`// Initialize wallet with mint URL
var wallet = new Wallet
        .Create()
        .WithMint("https://mint.example.com");

// Request ecash tokens
var tokens = await wallet
        .CreateMintQuote()
        .WithAmount(10000) // 10k sats
        .ProcessAsyncBolt11();

//this is slop, to be changed later
// Receive tokens
await wallet.Swap(encodedToken);

// Redeem for Bitcoin via Lightning
await wallet.MeltAsync(invoice);`}
              </code>
            </pre>
            </Card>

            <div className="mt-6 md:mt-8 text-center px-4">
              <p className="text-xs sm:text-sm text-muted-foreground italic">
                "Finally, ecash that doesn't require a PhD in cryptography" - Satoshi's Ghost, probably
              </p>
            </div>
          </div>
        </section>

        {/* What is Cashu */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <Card className="p-6 sm:p-8 md:p-12 bg-gradient-to-br from-card/50 to-card/30 border-border/50">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-6">What is Cashu?</h3>
              <div className="space-y-3 md:space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
                <p>
                  Cashu is a free and open-source Chaumian ecash protocol built for Bitcoin. It enables digital bearer
                  tokens stored on users' devices - like physical cash, but digital.
                </p>
                <p>
                  The protocol uses blind signatures to preserve user privacy. Mints cannot track who owns which tokens or
                  how they're spent. Transactions are instant, nearly free, and completely peer-to-peer.
                </p>
                <p className="text-foreground font-medium pt-2">
                  DotNut brings this powerful protocol to the .NET ecosystem, making it easy to build wallets, payment
                  systems, and ecash applications in C#. Because even Bitcoin developers deserve good tooling.
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/40 mt-16 md:mt-24">
          <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-foreground">.Nut</span>
                  <span>© 2025</span>
                  <span className="text-muted-foreground/50">•</span>
                  <span className="text-xs">Not affiliated with Microsoft. Obviously.</span>
                </div>
                <div className="flex items-center gap-6">
                  <a href="https://docs.cashu.space" className="hover:text-foreground transition-colors">
                    Cashu Docs
                  </a>
                  <a href="#" className="hover:text-foreground transition-colors">
                    GitHub
                  </a>
                  <a href="#" className="hover:text-foreground transition-colors">
                    NuGet
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
  )
}
