"use client"

import Image from "next/image"

export function CashewHero() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative animate-float">
        <Image
          src="/nutboi.png"
          alt="Cashu Mascot"
          width={400}
          height={400}
          className="w-full h-auto max-w-[280px] sm:max-w-[350px] md:max-w-[400px] pixelated"
          priority
        />
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <div className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2">
            <p className="text-xs font-mono text-muted-foreground">send nuts hehe</p>
          </div>
        </div>
      </div>
    </div>
  )
}
