import { 
  DocsH1, DocsH2, DocsH3, DocsP, DocsCodeBlock, DocsTable, DocsTh, DocsTd, DocsNote
} from "@/components/docs-content"

export default function WalletDocs() {
  return (
    <div>
      <DocsH1>Wallet API</DocsH1>
      
      <DocsP>
        The <code className="bg-white/10 px-1.5 py-0.5 text-sm">Wallet</code> class is the main entry point for interacting with Cashu mints.
      </DocsP>

      <DocsH2>Configuration</DocsH2>

      <DocsH3>Basic Setup</DocsH3>

      <DocsCodeBlock>
{`using DotNut.Abstractions;

var wallet = Wallet.Create()
    .WithMint("https://testnut.cashu.space");`}
      </DocsCodeBlock>

      <DocsH3>With Custom HTTP Client</DocsH3>

      <DocsCodeBlock>
{`var httpClient = new HttpClient();
httpClient.Timeout = TimeSpan.FromSeconds(30);

var wallet = Wallet.Create()
    .WithMint("https://testnut.cashu.space")
    .WithHttpClient(httpClient);`}
      </DocsCodeBlock>

      <DocsH3>Deterministic Wallet (Recommended)</DocsH3>

      <DocsCodeBlock>
{`using DotNut.NBitcoin.BIP39;

var mnemonic = new Mnemonic(Wordlist.English, WordCount.Twelve);

var wallet = Wallet.Create()
    .WithMint("https://testnut.cashu.space")
    .WithMnemonic(mnemonic)
    .WithCounter(new Dictionary<KeysetId, uint>());

// Or with a secret generator function
var wallet = Wallet.Create()
    .WithMint("https://mint.example.com")
    .WithSecretGenerator((keysetId, count) => {
        // Your secret generation logic
        return secrets;
    });`}
      </DocsCodeBlock>

      <DocsH2>Mint Information</DocsH2>

      <DocsCodeBlock>
{`// Get detailed mint info
var info = await wallet.GetInfo();

Console.WriteLine($"Name: {info.Name}");
Console.WriteLine($"Description: {info.Description}");
Console.WriteLine($"Contact: {info.Contact}");
Console.WriteLine($"Version: {info.Version}");

// Supported NUTs
foreach (var nut in info.Nuts)
{
    Console.WriteLine($"NUT-{nut.Key}: {(nut.Value.Supported ? "✓" : "✗")}");
}`}
      </DocsCodeBlock>

      <DocsH2>Keysets</DocsH2>

      <DocsCodeBlock>
{`// List all keysets
var keysets = await wallet.GetKeysets();

foreach (var keyset in keysets)
{
    Console.WriteLine($"ID: {keyset.Id}");
    Console.WriteLine($"Unit: {keyset.Unit}");
    Console.WriteLine($"Active: {keyset.Active}");
    Console.WriteLine($"Input Fee (ppk): {keyset.InputFee}");
}

// Get keys for specific keyset
var keys = await wallet.GetKeys(keysetId);`}
      </DocsCodeBlock>

      <DocsH2>Minting (Receiving Ecash)</DocsH2>

      <DocsH3>BOLT11 Lightning</DocsH3>

      <DocsCodeBlock>
{`// Step 1: Create quote
var handler = await wallet
    .CreateMintQuote()
    .WithAmount(10000)          // Amount in sats
    .WithUnit("sat")            // Unit
    .WithDescription("Payment") // Optional description
    .ProcessAsyncBolt11();

// Step 2: Get quote details
var quote = handler.GetQuote();
Console.WriteLine($"Invoice: {quote.Request}");
Console.WriteLine($"Quote ID: {quote.Quote}");
Console.WriteLine($"Expires: {quote.Expiry}");

// Step 3: Wait for payment and mint
// After invoice is paid:
var proofs = await handler.Mint();`}
      </DocsCodeBlock>

      <DocsH3>BOLT12 (if supported)</DocsH3>

      <DocsCodeBlock>
{`var handler = await wallet
    .CreateMintQuote()
    .WithAmount(10000)
    .WithUnit("sat")
    .ProcessAsyncBolt12();

// BOLT12 uses offers instead of one-time invoices
var quote = handler.GetQuote();
Console.WriteLine($"Offer: {quote.Request}");`}
      </DocsCodeBlock>

      <DocsH3>Quote State Management</DocsH3>

      <DocsCodeBlock>
{`// Check current quote state
var quote = handler.GetQuote();

switch (quote.State)
{
    case "UNPAID":
        Console.WriteLine("Waiting for payment...");
        break;
    case "PAID":
        Console.WriteLine("Payment received, ready to mint!");
        var proofs = await handler.Mint();
        break;
    case "ISSUED":
        Console.WriteLine("Tokens already minted");
        break;
}`}
      </DocsCodeBlock>

      <DocsH2>Melting (Paying Lightning)</DocsH2>

      <DocsH3>BOLT11</DocsH3>

      <DocsCodeBlock>
{`// Step 1: Create melt quote
var handler = await wallet
    .CreateMeltQuote()
    .WithInvoice("lnbc10u1...")  // Lightning invoice to pay
    .WithUnit("sat")
    .ProcessAsyncBolt11();

// Step 2: Check quote
var quote = handler.GetQuote();
Console.WriteLine($"Amount: {quote.Amount} sats");
Console.WriteLine($"Fee Reserve: {quote.FeeReserve} sats");
Console.WriteLine($"Total needed: {quote.Amount + quote.FeeReserve} sats");

// Step 3: Execute melt with proofs
var change = await handler.Melt(myProofs);
Console.WriteLine($"Fee returned: {change.Sum(p => p.Amount)} sats");`}
      </DocsCodeBlock>

      <DocsH3>Quote Methods Reference</DocsH3>

      <DocsTable>
        <thead>
          <tr>
            <DocsTh>Method</DocsTh>
            <DocsTh>Description</DocsTh>
          </tr>
        </thead>
        <tbody>
          <tr>
            <DocsTd><code className="font-mono text-sm">WithInvoice(string)</code></DocsTd>
            <DocsTd>Lightning invoice to pay</DocsTd>
          </tr>
          <tr>
            <DocsTd><code className="font-mono text-sm">WithUnit(string)</code></DocsTd>
            <DocsTd>Currency unit (sat, usd, eur)</DocsTd>
          </tr>
          <tr>
            <DocsTd><code className="font-mono text-sm">WithOptions(opts)</code></DocsTd>
            <DocsTd>Custom MPP options (NUT-15)</DocsTd>
          </tr>
          <tr>
            <DocsTd><code className="font-mono text-sm">ProcessAsyncBolt11()</code></DocsTd>
            <DocsTd>Process via BOLT11</DocsTd>
          </tr>
          <tr>
            <DocsTd><code className="font-mono text-sm">ProcessAsyncBolt12()</code></DocsTd>
            <DocsTd>Process via BOLT12</DocsTd>
          </tr>
        </tbody>
      </DocsTable>

      <DocsH2>Swapping</DocsH2>

      <DocsP>
        Swap is used to change token denominations, refresh secrets, or add spending conditions.
      </DocsP>

      <DocsCodeBlock>
{`// Basic swap
var newProofs = await wallet
    .Swap()
    .FromInputs(existingProofs)
    .ProcessAsync();

// Swap with all options
var newProofs = await wallet
    .Swap()
    .FromInputs(existingProofs)
    .WithSend(5000)                    // Target output amount
    .WithDLEQVerification(true)        // Verify DLEQ proofs
    .WithFeeCalculation(true)          // Handle fees automatically
    .WithP2PK(pubKey, signatureFlags)  // Lock outputs to pubkey
    .WithHTLC(hashlock, timelock)      // HTLC conditions
    .ProcessAsync();`}
      </DocsCodeBlock>

      <DocsH3>Selective Proof Selection</DocsH3>

      <DocsCodeBlock>
{`// Custom amount selection
var selector = new ProofSelector();
var (selected, remaining) = selector.SelectByAmount(proofs, targetAmount);

// Use in swap
var newProofs = await wallet
    .Swap()
    .FromInputs(selected)
    .ProcessAsync();`}
      </DocsCodeBlock>

      <DocsH2>Check Token State</DocsH2>

      <DocsCodeBlock>
{`// Check if tokens have been spent
var states = await wallet.CheckState(proofs);

foreach (var state in states)
{
    switch (state.State)
    {
        case "UNSPENT":
            Console.WriteLine($"Proof is valid and unspent");
            break;
        case "SPENT":
            Console.WriteLine($"Proof has been spent!");
            break;
        case "PENDING":
            Console.WriteLine($"Proof is pending (melt in progress)");
            break;
    }
}`}
      </DocsCodeBlock>

      <DocsH2>Restore</DocsH2>

      <DocsP>
        Restore proofs using deterministic secret derivation (requires mnemonic):
      </DocsP>

      <DocsCodeBlock>
{`var wallet = Wallet.Create()
    .WithMint("https://mint.example.com")
    .WithMnemonic(mnemonic)
    .WithCounter(new Dictionary<KeysetId, uint>());

// Restore all proofs
var recovered = await wallet
    .Restore()
    .ProcessAsync();

Console.WriteLine($"Recovered {recovered.Count()} proofs");
Console.WriteLine($"Total: {recovered.Sum(p => p.Amount)} sats");`}
      </DocsCodeBlock>

      <DocsNote type="warning">
        Restore requires scanning through possible secrets which can be slow. 
        The wallet tries batches of secrets until finding empty batches.
      </DocsNote>

      <DocsH2>Direct API Access</DocsH2>

      <DocsP>
        For advanced usage, access the underlying API client:
      </DocsP>

      <DocsCodeBlock>
{`// Get underlying HTTP client wrapper
var api = wallet.GetApi();

// Make custom API calls
var response = await api.PostRestoreAsync(request);`}
      </DocsCodeBlock>
    </div>
  )
}
