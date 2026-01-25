import { cn } from "@/lib/utils"

interface DocsContentProps {
  children: React.ReactNode
  className?: string
}

export function DocsContent({ children, className }: DocsContentProps) {
  return (
    <div className={cn("prose prose-invert max-w-none", className)}>
      {children}
    </div>
  )
}

export function DocsH1({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
      {children}
    </h1>
  )
}

export function DocsH2({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2 id={id} className="text-2xl font-bold text-white mt-12 mb-4 pb-2 border-b border-white/10">
      {children}
    </h2>
  )
}

export function DocsH3({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h3 id={id} className="text-xl font-semibold text-white mt-8 mb-3">
      {children}
    </h3>
  )
}

export function DocsP({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-gray-300 leading-relaxed mb-4">
      {children}
    </p>
  )
}

export function DocsCode({ children }: { children: string }) {
  return (
    <code className="bg-white/10 text-gray-200 px-1.5 py-0.5 text-sm font-mono border border-white/10">
      {children}
    </code>
  )
}

export function DocsCodeBlock({ children, title }: { children: string; title?: string }) {
  return (
    <div className="my-6">
      {title && (
        <div className="bg-white/5 border border-white/10 border-b-0 px-4 py-2 text-xs text-gray-400 font-mono">
          {title}
        </div>
      )}
      <pre className={cn(
        "bg-black/50 border border-white/10 p-4 overflow-x-auto",
        title && "border-t-0"
      )}>
        <code className="text-sm font-mono text-gray-200">
          {children}
        </code>
      </pre>
    </div>
  )
}

export function DocsTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 overflow-x-auto">
      <table className="w-full text-sm border border-white/10">
        {children}
      </table>
    </div>
  )
}

export function DocsTh({ children }: { children: React.ReactNode }) {
  return (
    <th className="bg-white/5 text-left px-4 py-3 text-white font-semibold border-b border-white/10">
      {children}
    </th>
  )
}

export function DocsTd({ children }: { children: React.ReactNode }) {
  return (
    <td className="px-4 py-3 text-gray-300 border-b border-white/5">
      {children}
    </td>
  )
}

export function DocsUl({ children }: { children: React.ReactNode }) {
  return (
    <ul className="list-disc list-inside space-y-2 text-gray-300 my-4 ml-4">
      {children}
    </ul>
  )
}

export function DocsLi({ children }: { children: React.ReactNode }) {
  return (
    <li className="text-gray-300">
      {children}
    </li>
  )
}

export function DocsNote({ children, type = "info" }: { children: React.ReactNode; type?: "info" | "warning" | "tip" }) {
  const styles = {
    info: "bg-blue-500/10 border-blue-500/30 text-blue-200",
    warning: "bg-yellow-500/10 border-yellow-500/30 text-yellow-200",
    tip: "bg-green-500/10 border-green-500/30 text-green-200",
  }

  const titles = {
    info: "Note",
    warning: "Warning",
    tip: "Tip",
  }

  return (
    <div className={cn("border-l-4 p-4 my-6", styles[type])}>
      <div className="font-semibold mb-1">{titles[type]}</div>
      <div className="text-sm opacity-90">{children}</div>
    </div>
  )
}

export function DocsLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="text-white underline underline-offset-4 hover:text-gray-300 transition-colors">
      {children}
    </a>
  )
}
