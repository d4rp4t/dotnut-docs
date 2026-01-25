import Link from "next/link"
import { 
  DocsH1, DocsH2, DocsP, DocsCodeBlock, DocsTable, DocsTh, DocsTd,
  DocsLink
} from "@/components/docs-content"
import { ArrowRight, CheckCircle2 } from "lucide-react"

export default function DocsOverview() {
  return (
    <div>
      <DocsH1>DotNut Documentation</DocsH1>
      
      <DocsP>
        Welcome to the official documentation for <strong className="text-white">DotNut</strong> — 
        a complete C# implementation of the{" "}
        <DocsLink href="https://cashu.space">Cashu protocol</DocsLink>.
      </DocsP>

      <DocsH2>What is DotNut?</DocsH2>
      
      <DocsP>
        DotNut is a full-featured .NET library for building Cashu wallets and applications. It provides:
      </DocsP>

      <div className="grid sm:grid-cols-2 gap-4 my-6">
        {[
          { title: "Complete Protocol Support", desc: "All NUTs (0-18) implemented" },
          { title: "Lightning Integration", desc: "Mint and melt via Lightning Network" },
          { title: "Fluent API", desc: "Intuitive builder pattern for all operations" },
          { title: "Real-time Updates", desc: "WebSocket support for notifications" },
          { title: "Advanced Privacy", desc: "P2PK, HTLC, and blinded signatures" },
          { title: "Token Encoding", desc: "V3 (JSON) and V4 (CBOR) formats" },
        ].map((feature) => (
          <div key={feature.title} className="flex items-start gap-3 p-4 bg-white/5 border border-white/10">
            <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
            <div>
              <div className="font-medium text-white">{feature.title}</div>
              <div className="text-sm text-gray-400">{feature.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <DocsH2>Quick Start</DocsH2>

      <DocsP>Install DotNut via NuGet:</DocsP>

      <DocsCodeBlock title="Terminal">
{`dotnet add package DotNut`}
      </DocsCodeBlock>

      <DocsP>Create your first wallet:</DocsP>

      <DocsCodeBlock title="Program.cs">
{`using DotNut.Abstractions;

// Create a wallet connected to a mint
var wallet = Wallet.Create()
    .WithMint("https://testnut.cashu.space");

// Create a mint quote for 1000 sats
var mintHandler = await wallet
    .CreateMintQuote()
    .WithAmount(1000)
    .WithUnit("sat")
    .ProcessAsyncBolt11();

// Get the Lightning invoice to pay
var quote = mintHandler.GetQuote();
Console.WriteLine($"Pay this invoice: {quote.Request}");

// After payment, mint your tokens
var proofs = await mintHandler.Mint();
Console.WriteLine($"Minted {proofs.Sum(p => p.Amount)} sats!");`}
      </DocsCodeBlock>

      <div className="flex gap-4 mt-8">
        <Link 
          href="/docs/getting-started"
          className="flex items-center gap-2 px-6 py-3 bg-white text-black font-medium text-sm hover:bg-gray-100 transition-colors"
        >
          Get Started
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link 
          href="/docs/concepts"
          className="flex items-center gap-2 px-6 py-3 border border-white/30 text-white font-medium text-sm hover:bg-white/5 transition-colors"
        >
          Learn Concepts
        </Link>
      </div>

      <DocsH2>Implemented Specifications</DocsH2>

      <DocsTable>
        <thead>
          <tr>
            <DocsTh>NUT</DocsTh>
            <DocsTh>Description</DocsTh>
            <DocsTh>Status</DocsTh>
          </tr>
        </thead>
        <tbody>
          {[
            { nut: "00", desc: "Cryptographic primitives" },
            { nut: "01", desc: "Mint public key distribution" },
            { nut: "02", desc: "Keysets and keyset IDs" },
            { nut: "03", desc: "Swapping tokens" },
            { nut: "04", desc: "Minting tokens" },
            { nut: "05", desc: "Melting tokens" },
            { nut: "06", desc: "Mint info" },
            { nut: "07", desc: "Token state check" },
            { nut: "08", desc: "Lightning fee return" },
            { nut: "09", desc: "Token restoration" },
            { nut: "10", desc: "Spending conditions" },
            { nut: "11", desc: "Pay-to-Public-Key (P2PK)" },
            { nut: "12", desc: "DLEQ proofs" },
            { nut: "13", desc: "Deterministic secrets" },
            { nut: "14", desc: "Hash Time-Locked Contracts" },
            { nut: "15", desc: "Multipath payments" },
            { nut: "17", desc: "WebSocket subscriptions" },
            { nut: "18", desc: "Payment requests" },
          ].map((item) => (
            <tr key={item.nut}>
              <DocsTd>
                <DocsLink href={`https://github.com/cashubtc/nuts/blob/main/${item.nut}.md`}>
                  NUT-{item.nut}
                </DocsLink>
              </DocsTd>
              <DocsTd>{item.desc}</DocsTd>
              <DocsTd>
                <span className="inline-flex items-center gap-1 text-green-400">
                  <CheckCircle2 className="w-4 h-4" />
                  Implemented
                </span>
              </DocsTd>
            </tr>
          ))}
        </tbody>
      </DocsTable>

      <DocsH2>Requirements</DocsH2>

      <DocsP>
        DotNut requires <strong className="text-white">.NET 8.0</strong> or later.
      </DocsP>
    </div>
  )
}
