import Link from "next/link"
import { 
  DocsH1, DocsH2, DocsH3, DocsP, DocsCodeBlock, DocsNote
} from "@/components/docs-content"
import { ArrowRight } from "lucide-react"

export default function GettingStarted() {
  return (
    <div>
      <DocsH1>Getting Started</DocsH1>
      
      <DocsP>
        This guide will walk you through installing DotNut and performing basic wallet operations.
      </DocsP>

      <DocsH2>Installation</DocsH2>

      <DocsH3>NuGet Package</DocsH3>

      <DocsCodeBlock title="Terminal">
{`dotnet add package DotNut`}
      </DocsCodeBlock>

      <DocsH3>Package Reference</DocsH3>

      <DocsCodeBlock title=".csproj">
{`<PackageReference Include="DotNut" Version="*" />`}
      </DocsCodeBlock>

      <DocsH2>Your First Wallet</DocsH2>

      <DocsH3>1. Create a Wallet Instance</DocsH3>

      <DocsP>
        The <code className="bg-white/10 px-1.5 py-0.5 text-sm">Wallet</code> class uses a fluent builder pattern for configuration:
      </DocsP>

      <DocsCodeBlock title="Basic setup">
{`using DotNut.Abstractions;

var wallet = Wallet.Create()
    .WithMint("https://testnut.cashu.space");`}
      </DocsCodeBlock>

      <DocsH3>2. Get Mint Information</DocsH3>

      <DocsCodeBlock>
{`var info = await wallet.GetInfo();
Console.WriteLine($"Mint: {info.Name}");
Console.WriteLine($"Description: {info.Description}");`}
      </DocsCodeBlock>

      <DocsH3>3. Mint Tokens (Receive via Lightning)</DocsH3>

      <DocsP>
        Create a mint quote and pay the Lightning invoice:
      </DocsP>

      <DocsCodeBlock>
{`// Create mint quote
var mintHandler = await wallet
    .CreateMintQuote()
    .WithAmount(1000)  // 1000 sats
    .WithUnit("sat")
    .ProcessAsyncBolt11();

// Get the quote with Lightning invoice
var quote = mintHandler.GetQuote();
Console.WriteLine($"Pay invoice: {quote.Request}");
Console.WriteLine($"Quote ID: {quote.Quote}");
Console.WriteLine($"State: {quote.State}");

// After the invoice is paid, mint your tokens
var proofs = await mintHandler.Mint();
Console.WriteLine($"Received {proofs.Count} proofs totaling {proofs.Sum(p => p.Amount)} sats");`}
      </DocsCodeBlock>

      <DocsH3>4. Melt Tokens (Pay Lightning Invoice)</DocsH3>

      <DocsP>
        Convert your tokens back to Lightning:
      </DocsP>

      <DocsCodeBlock>
{`// Create melt quote with a Lightning invoice to pay
var meltHandler = await wallet
    .CreateMeltQuote()
    .WithInvoice("lnbc1000n1...")  // Lightning invoice
    .WithUnit("sat")
    .ProcessAsyncBolt11();

var meltQuote = meltHandler.GetQuote();
Console.WriteLine($"Amount: {meltQuote.Amount} sats");
Console.WriteLine($"Fee: {meltQuote.FeeReserve} sats");

// Execute the melt (pay the invoice)
var changeProofs = await meltHandler.Melt(myProofs);
Console.WriteLine($"Change returned: {changeProofs.Sum(p => p.Amount)} sats");`}
      </DocsCodeBlock>

      <DocsH3>5. Swap Tokens</DocsH3>

      <DocsP>
        Change token denominations or refresh secrets:
      </DocsP>

      <DocsCodeBlock>
{`var newProofs = await wallet
    .Swap()
    .FromInputs(existingProofs)
    .WithDLEQVerification()
    .WithFeeCalculation()
    .ProcessAsync();

Console.WriteLine($"Swapped to {newProofs.Count} new proofs");`}
      </DocsCodeBlock>

      <DocsH3>6. Encode and Share Tokens</DocsH3>

      <DocsCodeBlock>
{`using DotNut.Encoding;

// Create a token from proofs
var token = new CashuToken
{
    Unit = "sat",
    Memo = "Payment for services",
    Tokens = new List<CashuToken.Token>
    {
        new() { Mint = "https://testnut.cashu.space", Proofs = myProofs }
    }
};

// Encode as V4 (compact CBOR format)
string tokenString = token.Encode("B");
Console.WriteLine($"Share this: {tokenString}");

// Decode received token
var received = CashuTokenHelper.Decode(tokenString, out string version);
Console.WriteLine($"Received {received.TotalAmount()} sats (format: {version})");`}
      </DocsCodeBlock>

      <DocsH2>Deterministic Wallet (Recommended)</DocsH2>

      <DocsP>
        For production use, configure deterministic secret generation with a mnemonic:
      </DocsP>

      <DocsCodeBlock>
{`using DotNut.NBitcoin.BIP39;

// Generate or restore a mnemonic
var mnemonic = new Mnemonic(Wordlist.English, WordCount.Twelve);
// Or restore: new Mnemonic("abandon abandon abandon...")

// Create wallet with deterministic secrets
var wallet = Wallet.Create()
    .WithMint("https://testnut.cashu.space")
    .WithMnemonic(mnemonic)
    .WithCounter(new Dictionary<KeysetId, uint>());

Console.WriteLine($"Backup your mnemonic: {mnemonic}");`}
      </DocsCodeBlock>

      <DocsNote type="tip">
        Benefits of deterministic secrets: <strong>Recoverable</strong> - restore proofs from mnemonic if wallet data is lost. 
        <strong> No secret storage</strong> - secrets are derived on-demand. 
        <strong> Consistent</strong> - same mnemonic always produces same secrets.
      </DocsNote>

      <DocsH2>Restoring a Wallet</DocsH2>

      <DocsP>
        If you have a mnemonic but lost your proofs:
      </DocsP>

      <DocsCodeBlock>
{`var wallet = Wallet.Create()
    .WithMint("https://testnut.cashu.space")
    .WithMnemonic(existingMnemonic)
    .WithCounter(new Dictionary<KeysetId, uint>());

// Restore proofs by "grinding" possible secrets
var recoveredProofs = await wallet
    .Restore()
    .ProcessAsync();

Console.WriteLine($"Recovered {recoveredProofs.Count()} proofs");`}
      </DocsCodeBlock>

      <DocsH2>Error Handling</DocsH2>

      <DocsCodeBlock>
{`using DotNut.Api;

try
{
    var proofs = await mintHandler.Mint();
}
catch (CashuProtocolException ex)
{
    Console.WriteLine($"Mint error: {ex.Error.Detail}");
    Console.WriteLine($"Error code: {ex.Error.Code}");
}
catch (Exception ex)
{
    Console.WriteLine($"Unexpected error: {ex.Message}");
}`}
      </DocsCodeBlock>

      <DocsH2>Next Steps</DocsH2>

      <div className="flex flex-wrap gap-4 mt-6">
        <Link 
          href="/docs/concepts"
          className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white font-medium text-sm hover:bg-white/10 transition-colors"
        >
          Core Concepts
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link 
          href="/docs/wallet"
          className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white font-medium text-sm hover:bg-white/10 transition-colors"
        >
          Wallet API
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link 
          href="/docs/websockets"
          className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white font-medium text-sm hover:bg-white/10 transition-colors"
        >
          WebSockets
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
