import { 
  DocsH1, DocsH2, DocsH3, DocsP, DocsCodeBlock, DocsTable, DocsTh, DocsTd, DocsNote
} from "@/components/docs-content"

export default function AdvancedDocs() {
  return (
    <div>
      <DocsH1>Advanced Features</DocsH1>
      
      <DocsP>
        DotNut supports advanced Cashu features including spending conditions, 
        cryptographic locks, and deterministic secret derivation.
      </DocsP>

      <DocsH2 id="p2pk">Pay-to-Public-Key (NUT-11)</DocsH2>

      <DocsP>
        Lock tokens to a specific public key. Only the holder of the corresponding private key 
        can spend them.
      </DocsP>

      <DocsH3>Create P2PK Locked Outputs</DocsH3>

      <DocsCodeBlock>
{`using DotNut.NUT11;

// Generate or use existing keypair
var recipientPrivKey = new PrivKey();  // Random key
var recipientPubKey = recipientPrivKey.GetPubKey();

// Lock tokens during swap
var lockedProofs = await wallet
    .Swap()
    .FromInputs(proofs)
    .WithP2PK(recipientPubKey)
    .ProcessAsync();

// Share the locked tokens - only recipient can spend`}
      </DocsCodeBlock>

      <DocsH3>P2PK Signature Flags</DocsH3>

      <DocsCodeBlock>
{`// With custom signature requirements
var lockedProofs = await wallet
    .Swap()
    .FromInputs(proofs)
    .WithP2PK(
        pubKey: recipientPubKey,
        sigFlag: SigFlag.SigInputs   // Require signatures on inputs
    )
    .ProcessAsync();`}
      </DocsCodeBlock>

      <DocsTable>
        <thead>
          <tr>
            <DocsTh>Flag</DocsTh>
            <DocsTh>Description</DocsTh>
          </tr>
        </thead>
        <tbody>
          <tr>
            <DocsTd><code className="font-mono text-sm">SigInputs</code></DocsTd>
            <DocsTd>Sign all inputs (proofs)</DocsTd>
          </tr>
          <tr>
            <DocsTd><code className="font-mono text-sm">SigAll</code></DocsTd>
            <DocsTd>Sign inputs AND outputs</DocsTd>
          </tr>
        </tbody>
      </DocsTable>

      <DocsH3>Spending P2PK Tokens</DocsH3>

      <DocsCodeBlock>
{`// When spending, provide signatures via witness
var builder = new P2PKBuilder();
var signedProofs = builder.SignProofs(
    lockedProofs,
    recipientPrivKey,
    outputs: blindedMessages  // Only needed for SigAll
);

// Use signed proofs in swap/melt
var newProofs = await wallet
    .Swap()
    .FromInputs(signedProofs)
    .ProcessAsync();`}
      </DocsCodeBlock>

      <DocsH2 id="htlc">Hash Time-Locked Contracts (NUT-14)</DocsH2>

      <DocsP>
        Create tokens that require revealing a preimage OR can be reclaimed after a timeout.
      </DocsP>

      <DocsH3>Create HTLC Locked Tokens</DocsH3>

      <DocsCodeBlock>
{`using DotNut.NUT14;
using System.Security.Cryptography;

// Generate hash preimage
var preimage = RandomNumberGenerator.GetBytes(32);
var hashlock = SHA256.HashData(preimage);

// Create HTLC lock
var lockedProofs = await wallet
    .Swap()
    .FromInputs(proofs)
    .WithHTLC(
        hashlock: hashlock,
        locktime: DateTimeOffset.UtcNow.AddHours(24),  // Refund after 24h
        refundPubKey: senderPubKey  // Who can refund after timeout
    )
    .ProcessAsync();

// Send tokens + preimage to recipient (via other channel)`}
      </DocsCodeBlock>

      <DocsH3>Claiming HTLC Tokens</DocsH3>

      <DocsCodeBlock>
{`// Recipient knows the preimage
var builder = new HTLCBuilder();
var claimableProofs = builder.CreateWitness(
    lockedProofs,
    preimage: preimage
);

// Swap to claim
var claimedProofs = await wallet
    .Swap()
    .FromInputs(claimableProofs)
    .ProcessAsync();`}
      </DocsCodeBlock>

      <DocsH3>Refunding After Timeout</DocsH3>

      <DocsCodeBlock>
{`// After locktime expires, sender can refund
var builder = new HTLCBuilder();
var refundableProofs = builder.CreateRefundWitness(
    lockedProofs,
    senderPrivKey
);

var refundedProofs = await wallet
    .Swap()
    .FromInputs(refundableProofs)
    .ProcessAsync();`}
      </DocsCodeBlock>

      <DocsH2 id="deterministic">Deterministic Secrets (NUT-13)</DocsH2>

      <DocsP>
        Derive secrets from a BIP-39 mnemonic for recoverability.
      </DocsP>

      <DocsH3>Setup</DocsH3>

      <DocsCodeBlock>
{`using DotNut.NBitcoin.BIP39;
using DotNut.NUT13;

// Generate new mnemonic
var mnemonic = new Mnemonic(Wordlist.English, WordCount.Twelve);
Console.WriteLine($"Backup: {mnemonic}");

// Create wallet with deterministic secrets
var counters = new Dictionary<KeysetId, uint>();  // Track used indices

var wallet = Wallet.Create()
    .WithMint("https://mint.example.com")
    .WithMnemonic(mnemonic)
    .WithCounter(counters);`}
      </DocsCodeBlock>

      <DocsH3>How It Works</DocsH3>

      <DocsCodeBlock>
{`// Derivation path: m/129372'/0'/keyset_id'/counter'
// 
// For each keyset, secrets are derived sequentially:
//   counter 0: first secret
//   counter 1: second secret
//   ...
//
// The wallet automatically increments counters

var secret = Nut13.DeriveSecret(mnemonic, keysetId, counter: 0);
var blindingFactor = Nut13.DeriveBlindingFactor(mnemonic, keysetId, counter: 0);`}
      </DocsCodeBlock>

      <DocsH3>Restoration</DocsH3>

      <DocsCodeBlock>
{`// Restore proofs by "grinding" through possible secrets
var wallet = Wallet.Create()
    .WithMint("https://mint.example.com")
    .WithMnemonic(mnemonic)
    .WithCounter(new Dictionary<KeysetId, uint>());

var recoveredProofs = await wallet
    .Restore()
    .ProcessAsync();

Console.WriteLine($"Recovered {recoveredProofs.Count()} proofs");
Console.WriteLine($"Total: {recoveredProofs.Sum(p => p.Amount)} sats");`}
      </DocsCodeBlock>

      <DocsNote type="warning">
        Keep your mnemonic safe! Anyone with access can restore and spend your tokens.
      </DocsNote>

      <DocsH2 id="dleq">DLEQ Proofs (NUT-12)</DocsH2>

      <DocsP>
        Discrete Log Equality proofs verify mint honesty without revealing secrets.
      </DocsP>

      <DocsCodeBlock>
{`// Request DLEQ proofs during minting/swapping
var proofs = await wallet
    .Swap()
    .FromInputs(inputProofs)
    .WithDLEQVerification(true)
    .ProcessAsync();

// Each proof now contains DLEQ proof
foreach (var proof in proofs)
{
    if (proof.DLEQ != null)
    {
        Console.WriteLine("DLEQ proof present - mint signing verified");
    }
}`}
      </DocsCodeBlock>

      <DocsH2 id="mpp">Multipath Payments (NUT-15)</DocsH2>

      <DocsP>
        Pay Lightning invoices using multiple mints in parallel.
      </DocsP>

      <DocsCodeBlock>
{`// Check if mint supports MPP
var info = await wallet.GetInfo();
var mppSettings = info.Nuts["15"];

// Get partial amount options
var handler = await wallet
    .CreateMeltQuote()
    .WithInvoice("lnbc...")
    .WithUnit("sat")
    .WithOptions(new MeltQuoteRequestOptions
    {
        // Request MPP support
    })
    .ProcessAsyncBolt11();

// Melt partial amount
var change = await handler.Melt(partialProofs);`}
      </DocsCodeBlock>

      <DocsH2 id="payment-requests">Payment Requests (NUT-18)</DocsH2>

      <DocsP>
        Create reusable payment requests with specified amounts and conditions.
      </DocsP>

      <DocsCodeBlock>
{`using DotNut.NUT18;

// Create payment request
var request = new PaymentRequest
{
    Amount = 1000,
    Unit = "sat",
    Mints = new[] { "https://mint.example.com" },
    Description = "Payment for service"
};

// Encode for sharing
string encoded = PaymentRequestEncoder.Encode(request);
Console.WriteLine($"Request: {encoded}");

// Decode received request
var decoded = PaymentRequestEncoder.Decode(encoded);
Console.WriteLine($"Amount: {decoded.Amount} {decoded.Unit}");`}
      </DocsCodeBlock>

      <DocsH2 id="token-encoding">Token Encoding</DocsH2>

      <DocsH3>V3 Format (JSON)</DocsH3>

      <DocsCodeBlock>
{`using DotNut.Encoding;

var token = new CashuToken
{
    Unit = "sat",
    Memo = "Hello",
    Tokens = new List<CashuToken.Token>
    {
        new() { Mint = mintUrl, Proofs = proofs }
    }
};

string v3 = token.Encode("A");  // cashuA...`}
      </DocsCodeBlock>

      <DocsH3>V4 Format (CBOR)</DocsH3>

      <DocsCodeBlock>
{`// V4 is more compact
string v4 = token.Encode("B");  // cashuB...

// As URI (for QR codes, links)
string uri = token.Encode("B", makeUri: true);  // cashu:cashuB...`}
      </DocsCodeBlock>

      <DocsH3>Decoding</DocsH3>

      <DocsCodeBlock>
{`var decoded = CashuTokenHelper.Decode(tokenString, out string version);

Console.WriteLine($"Format: V{(version == "A" ? "3" : "4")}");
Console.WriteLine($"Unit: {decoded.Unit}");
Console.WriteLine($"Memo: {decoded.Memo}");
Console.WriteLine($"Total: {decoded.TotalAmount()} sats");

foreach (var t in decoded.Tokens)
{
    Console.WriteLine($"Mint: {t.Mint}");
    Console.WriteLine($"Proofs: {t.Proofs.Count}");
}`}
      </DocsCodeBlock>

      <DocsH2 id="fees">Fee Handling</DocsH2>

      <DocsCodeBlock>
{`using DotNut.NUT02;

// Calculate fees for proofs
var keysets = await wallet.GetKeysets();
var feeMap = keysets.ToDictionary(k => k.Id, k => k.InputFee);

var fee = FeeHelper.ComputeFee(proofs, feeMap);
Console.WriteLine($"Transaction fee: {fee} sats");

// Let swap handle fees automatically
var newProofs = await wallet
    .Swap()
    .FromInputs(proofs)
    .ProcessAsync();`}
      </DocsCodeBlock>
    </div>
  )
}
