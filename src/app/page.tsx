"use client"

import { useState } from "react"
import Link from "next/link"
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
        <header className="border-b border-white/10 bg-black/90 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <span className="font-mono font-bold text-2xl text-white tracking-tight">
            DotNut
          </span>
            <nav className="flex items-center gap-8">
              <Link href="/docs" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                Docs
              </Link>
              <Link href="/docs/getting-started" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                Getting Started
              </Link>
              <Link href="/docs/api-reference" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                API
              </Link>
              <a href="https://github.com/ArcadeCity/DotNut" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </nav>
          </div>
        </header>

        <section className="relative min-h-screen w-full overflow-hidden">
          <div className="relative z-10 flex min-h-screen items-center px-8 sm:px-12 lg:px-16 max-w-[1400px] mx-auto gap-8">
            <div className="flex-1 max-w-2xl">
              <div className="space-y-4">
                <div className="inline-block animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
                  <div className="text-xs font-mono text-gray-500 bg-white/5 px-3 py-1 border border-white/10">
                    Cashu protocol • .NET 8
                  </div>
                </div>

                <h1 className="animate-fade-in-up text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white font-mono" style={{ animationDelay: '0.1s' }}>
                  DotNut
                </h1>

                <p className="animate-fade-in-up text-lg md:text-xl text-gray-300 leading-relaxed" style={{ animationDelay: '0.2s' }}>
                  Ecash for C#. Privacy-focused Bitcoin payments in .NET.
                </p>

                <p className="animate-fade-in-up text-sm text-gray-500 leading-relaxed max-w-lg" style={{ animationDelay: '0.25s' }}>
                  DotNut brings the Cashu protocol to .NET 8. Build wallets, payment systems, and ecash applications
                  with Bitcoin-backed bearer tokens.
                </p>
              </div>

              <Card className="animate-fade-in-up mt-8 p-5 bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-300" style={{ animationDelay: '0.3s' }}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3 flex-1 min-w-0 w-full">
                    <div className="p-2 bg-white/10 border border-white/20">
                      <Package className="w-4 h-4 text-white" />
                    </div>
                    <code className="text-xs sm:text-sm font-mono bg-black/70 text-gray-200 px-4 py-2 border border-white/20 flex-1 truncate">
                      dotnet add package DotNut
                    </code>
                  </div>
                  <Button
                      variant="ghost"
                      size="icon"
                      onClick={copyToClipboard}
                      className="shrink-0 self-end sm:self-auto text-gray-400 hover:text-white hover:bg-white/10 border border-white/20 transition-all duration-200"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </Card>

              <div className="animate-fade-in-up flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-8" style={{ animationDelay: '0.35s' }}>
                <Link href="/docs/getting-started" className="group px-8 py-3 bg-white text-black font-medium text-sm border border-white hover:bg-gray-100 hover:scale-[1.02] transition-all duration-200 w-full sm:w-auto">
                  <span className="flex items-center justify-center gap-2">
                    Get Started
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
                <a href="https://www.nuget.org/packages/DotNut/" target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-transparent text-white font-medium text-sm border border-white/30 hover:border-white hover:bg-white/5 hover:scale-[1.02] transition-all duration-200 w-full sm:w-auto text-center">
                  View on NuGet
                </a>
              </div>
            </div>

            <div className="flex-shrink-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="relative">
                <ShaderEffect
                  imageSrc="/cashu-no-bg.png"
                  darkMode={true}
                  width={320}
                  height={420}
                  className=""
                />
                <p className="text-center text-xs text-gray-500 mt-4 font-mono italic">
                  {`"It's literally just a nut" - Anonymous .NET Developer`}
                </p>
              </div>
            </div>
          </div>

        </section>

        <section className="container mx-auto px-4  md:py-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              <div>
                <Card className="p-6 sm:p-8 bg-white/5 border border-white/10 h-full">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 text-white">What is Cashu?</h3>
                  <div className="space-y-3 md:space-y-4 text-sm md:text-base text-gray-400 leading-relaxed">
                    <p>
                      Cashu is a free and open-source Chaumian ecash protocol built for Bitcoin. It enables digital bearer
                      {` tokens stored on users' devices - like physical cash, but digital.`}
                    </p>
                    <p>
                      The protocol uses blind signatures to preserve user privacy. Mints cannot track who owns which tokens or
                      {` how they're spent. Transactions are instant, nearly free, and completely peer-to-peer.`}
                    </p>
                    <p className="text-white font-medium pt-2">
                      DotNut brings this powerful protocol to the .NET ecosystem, making it easy to build wallets, payment
                      systems, and ecash applications in C#.
                    </p>
                  </div>
                </Card>
              </div>

              <div>
                <Card className="p-6 bg-white/5 border border-white/10 h-full">
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white">Quick Example</h3>
                  <p className="text-gray-400 text-sm mb-6">Start building with ecash in minutes</p>
                  
                  <pre className="text-xs sm:text-sm font-mono overflow-x-auto mb-6">
                    <code className="text-gray-200">
                      {`// Initialize wallet with mint URL
var wallet = Wallet.Create()
    .WithMint("https://testnut.cashu.space");

// Create mint quote (get Lightning invoice)
var handler = await wallet
    .CreateMintQuote()
    .WithAmount(1000)
    .WithUnit("sat")
    .ProcessAsyncBolt11();

var quote = handler.GetQuote();
Console.WriteLine($"Pay: {quote.Request}");

// After payment, mint your tokens
var proofs = await handler.Mint();

// Melt tokens (pay Lightning invoice)
var melt = await wallet
    .CreateMeltQuote()
    .WithInvoice("lnbc...")
    .ProcessAsyncBolt11();
    
await melt.Melt(proofs);`}
                    </code>
                  </pre>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/10 mt-16 md:mt-24">
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
                  <a href="https://github.com/ArcadeCity/DotNut" className="hover:text-white transition-colors">
                    GitHub
                  </a>
                  <a href="https://www.nuget.org/packages/DotNut/" className="hover:text-white transition-colors">
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
