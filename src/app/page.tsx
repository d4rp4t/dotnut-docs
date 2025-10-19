"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Copy, Check, Package, Zap, Shield, Lock, Bitcoin, Github } from "lucide-react"
import ShaderEffect from "@/components/shader-effect"

export default function DotNutDocs() {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText("dotnet add package DotNut")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
      <div className="min-h-screen bg-black">
        {/* Header */}
        <header className="border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <span className="font-mono font-bold text-2xl text-white">
            Dot<span className="text-[#7F38C9]">Nut</span>
          </span>
            <nav className="flex items-center gap-6">
              <a href="#docs" className="text-sm text-gray-400 hover:text-white transition-colors">
                Docs
              </a>
              <a href="#examples" className="text-sm text-gray-400 hover:text-white transition-colors">
                Examples
              </a>
              <a href="#api" className="text-sm text-gray-400 hover:text-white transition-colors">
                API
              </a>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-white/10">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Button>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative min-h-screen w-full overflow-hidden">
          <div className="relative z-10 flex min-h-screen items-center px-8 sm:px-12 lg:px-16 max-w-[1400px] mx-auto gap-8">
            {/* Left: Text Content */}
            <div className="flex-1 max-w-2xl">
              <div className="space-y-4">
                <div className="inline-block animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
                  <div className="text-xs font-mono text-gray-400 bg-[#7F38C9]/10 px-3 py-1.5 rounded-full border border-[#7F38C9]/30">
                    Cashu protocol • .NET 8
                  </div>
                </div>

                <h1 className="animate-fade-in-up text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white font-mono" style={{ animationDelay: '0.1s' }}>
                  .N<span className="text-[#7F38C9]">u</span>t
                </h1>

                <p className="animate-fade-in-up text-xl md:text-2xl text-gray-300 leading-snug" style={{ animationDelay: '0.2s' }}>
                  Ecash for C#. Privacy-focused Bitcoin payments in .NET.
                </p>

                <p className="animate-fade-in-up text-base text-gray-400 leading-relaxed max-w-lg" style={{ animationDelay: '0.25s' }}>
                  DotNut brings the Cashu protocol to .NET 8. Build wallets, payment systems, and ecash applications
                  with Bitcoin-backed bearer tokens.
                </p>
              </div>

              {/* Installation */}
              <Card className="animate-fade-in-up mt-6 p-3 md:p-4 bg-white/5 border-white/20 backdrop-blur-sm" style={{ animationDelay: '0.3s' }}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                  <div className="flex items-center gap-3 flex-1 min-w-0 w-full">
                    <Package className="w-5 h-5 text-amber-600 shrink-0" />
                    <code className="text-xs sm:text-sm font-mono bg-white/10 text-gray-200 px-3 py-1.5 rounded flex-1 truncate">
                      dotnet add package DotNut
                    </code>
                  </div>
                  <Button
                      variant="ghost"
                      size="icon"
                      onClick={copyToClipboard}
                      className="shrink-0 self-end sm:self-auto text-gray-300 hover:text-white hover:bg-white/10"
                  >
                    {copied ? <Check className="w-4 h-4 text-amber-600" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </Card>

              <div className="animate-fade-in-up flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-6" style={{ animationDelay: '0.35s' }}>
                <Button 
                  size="lg" 
                  className="group relative overflow-hidden font-semibold bg-white text-black hover:bg-white/90 w-full sm:w-auto transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/20"
                >
                  <span className="relative z-10">Get Started</span>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-[#7F38C9] to-purple-500 transition-transform duration-300 group-hover:translate-x-0" />
                  <span className="absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-white font-semibold">
                    Get Started
                  </span>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto border-2 border-white/20 bg-white/5 text-white hover:border-white/40 hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/10"
                >
                  View on NuGet
                </Button>
              </div>
            </div>

            {/* Right: Shader Effect */}
            <div className="flex-shrink-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="relative">
                <ShaderEffect
                  imageSrc="/cashu-no-bg.png"
                  darkMode={true}
                  width={400}
                  height={550}
                  className="rounded-lg"
                />
                <p className="text-center text-xs text-gray-500 mt-8 font-mono italic">
                  "It's literally just a nut" - Anonymous .NET Developer
                </p>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="animate-bounce-slow absolute bottom-8 left-1/2 -translate-x-1/2 z-10" style={{ animationDelay: '0.6s' }}>
            <div className="flex flex-col items-center gap-2 text-white/60">
              <span className="text-sm font-medium">Scroll to explore</span>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-4 py-12 md:py-16 lg:py-24 bg-black">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-white">Why DotNut?</h2>
              <p className="text-gray-400 text-base md:text-lg">Because your users deserve privacy. And puns.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <Card className="p-4 bg-white/5 border-white/20 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#7F38C9]/10 flex items-center justify-center mb-4 border border-[#7F38C9]/20">
                  <Lock className="w-6 h-6 text-[#7F38C9]" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Privacy First</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Blind signatures ensure complete transaction privacy. No tracking, no databases, no surveillance.
                </p>
              </Card>

              <Card className="p-4 bg-white/5 border-white/20 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-amber-600/10 flex items-center justify-center mb-4 border border-amber-600/20">
                  <Bitcoin className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Bitcoin-Backed</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Ecash tokens backed by real Bitcoin. Lightning Network integration for instant transfers.
                </p>
              </Card>

              <Card className="p-4 bg-white/5 border-white/20 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#7F38C9]/10 flex items-center justify-center mb-4 border border-[#7F38C9]/20">
                  <Zap className="w-6 h-6 text-[#7F38C9]" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Instant Payments</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Bearer tokens enable instant, final transactions. No confirmations, no waiting, no bullshit.
                </p>
              </Card>

              <Card className="p-4 bg-white/5 border-white/20 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-amber-600/10 flex items-center justify-center mb-4 border border-amber-600/20">
                  <Shield className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Open Protocol</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Built on Cashu NUTs specs. Fully compatible with the ecosystem. Yes, they're called NUTs.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Code Example */}
        <section className="container mx-auto px-4 py-12 md:py-16 bg-black">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6 md:mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-white">Quick Example</h3>
              <p className="text-gray-400 text-sm md:text-base">Start building with ecash in minutes</p>
            </div>

            <Card className="p-4 md:p-6 bg-white/5 border-white/20 backdrop-blur-sm">
            <pre className="text-xs sm:text-sm font-mono overflow-x-auto">
              <code className="text-gray-200">
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
              <p className="text-xs sm:text-sm text-gray-500 italic">
                "Finally, ecash that doesn't require a PhD in cryptography" - Satoshi's Ghost, probably
              </p>
            </div>
          </div>
        </section>

        {/* What is Cashu */}
        <section className="container mx-auto px-4 py-12 md:py-16 bg-black">
          <div className="max-w-4xl mx-auto">
            <Card className="p-6 sm:p-8 md:p-12 bg-gradient-to-br from-white/10 to-white/5 border-white/20 backdrop-blur-sm">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-white">What is Cashu?</h3>
              <div className="space-y-3 md:space-y-4 text-sm md:text-base text-gray-400 leading-relaxed">
                <p>
                  Cashu is a free and open-source Chaumian ecash protocol built for Bitcoin. It enables digital bearer
                  tokens stored on users' devices - like physical cash, but digital.
                </p>
                <p>
                  The protocol uses blind signatures to preserve user privacy. Mints cannot track who owns which tokens or
                  how they're spent. Transactions are instant, nearly free, and completely peer-to-peer.
                </p>
                <p className="text-white font-medium pt-2">
                  DotNut brings this powerful protocol to the .NET ecosystem, making it easy to build wallets, payment
                  systems, and ecash applications in C#. Because even Bitcoin developers deserve good tooling.
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 mt-16 md:mt-24 bg-black">
          <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 text-xs sm:text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-white">.Nut</span>
                  <span>© 2025</span>
                  <span className="text-gray-600">•</span>
                  <span className="text-xs">Not affiliated with Microsoft. Obviously.</span>
                </div>
                <div className="flex items-center gap-6">
                  <a href="https://docs.cashu.space" className="hover:text-white transition-colors">
                    Cashu Docs
                  </a>
                  <a href="#" className="hover:text-white transition-colors">
                    GitHub
                  </a>
                  <a href="#" className="hover:text-white transition-colors">
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
