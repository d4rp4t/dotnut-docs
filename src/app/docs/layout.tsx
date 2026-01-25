"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Book, Zap, Box, Wifi, Code, ChevronRight, Github, ArrowLeft } from "lucide-react"

const navigation = [
  {
    title: "Introduction",
    items: [
      { title: "Overview", href: "/docs", icon: Book },
      { title: "Getting Started", href: "/docs/getting-started", icon: Zap },
      { title: "Core Concepts", href: "/docs/concepts", icon: Box },
    ],
  },
  {
    title: "Guide",
    items: [
      { title: "Wallet API", href: "/docs/wallet", icon: Code },
      { title: "WebSockets", href: "/docs/websockets", icon: Wifi },
      { title: "Advanced Features", href: "/docs/advanced", icon: ChevronRight },
    ],
  },
  {
    title: "Reference",
    items: [
      { title: "API Reference", href: "/docs/api-reference", icon: Code },
    ],
  },
]

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
              <ArrowLeft className="w-4 h-4" />
              Home
            </Link>
            <Link href="/docs" className="font-mono font-bold text-2xl text-white tracking-tight">
              DotNut <span className="text-gray-500 font-normal text-lg">Docs</span>
            </Link>
          </div>
          <nav className="flex items-center gap-6">
            <a
              href="https://www.nuget.org/packages/DotNut/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              NuGet
            </a>
            <a
              href="https://github.com/ArcadeCity/DotNut"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </nav>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-white/10 min-h-[calc(100vh-65px)] sticky top-[65px] overflow-y-auto bg-black/50">
          <nav className="p-4 space-y-6">
            {navigation.map((section) => (
              <div key={section.title}>
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  {section.title}
                </h4>
                <ul className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href
                    const Icon = item.icon
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 text-sm transition-all duration-200",
                            isActive
                              ? "bg-white/10 text-white border-l-2 border-white"
                              : "text-gray-400 hover:text-white hover:bg-white/5"
                          )}
                        >
                          <Icon className="w-4 h-4" />
                          {item.title}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="max-w-4xl mx-auto px-8 py-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
