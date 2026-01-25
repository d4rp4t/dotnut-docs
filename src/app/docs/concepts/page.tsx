import { 
  DocsH1, DocsH2, DocsH3, DocsP, DocsCodeBlock, DocsTable, DocsTh, DocsTd, DocsNote
} from "@/components/docs-content"

export default function Concepts() {
  return (
    <div>
      <DocsH1>Core Concepts</DocsH1>
      
      <DocsP>
        Understanding the fundamental concepts of Cashu and DotNut.
      </DocsP>

      <DocsH2>How Cashu Works</DocsH2>

      <DocsP>
        Cashu is a Chaumian e-cash system built for Bitcoin. It provides:
      </DocsP>

      <div className="grid sm:grid-cols-3 gap-4 my-6">
        <div className="p-4 bg-white/5 border border-white/10">
          <div className="font-semibold text-white mb-2">Privacy</div>
          <div className="text-sm text-gray-400">The mint cannot link tokens to users</div>
        </div>
        <div className="p-4 bg-white/5 border border-white/10">
          <div className="font-semibold text-white mb-2">Instant Transfers</div>
          <div className="text-sm text-gray-400">No on-chain confirmation needed</div>
        </div>
        <div className="p-4 bg-white/5 border border-white/10">
          <div className="font-semibold text-white mb-2">Offline Capability</div>
          <div className="text-sm text-gray-400">Tokens can be shared without network</div>
        </div>
      </div>

      <DocsH3>The Flow</DocsH3>

      <DocsCodeBlock title="Cashu Flow Diagram">
{`┌─────────┐     Lightning      ┌─────────┐
│  User   │ ───────────────────▶│  Mint   │
└────┬────┘    Pay Invoice      └────┬────┘
     │                               │
     │  1. Request mint quote        │
     │  ◀─────────────────────────── │
     │  2. Pay Lightning invoice     │
     │  ──────────────────────────▶  │
     │  3. Receive blind signatures  │
     │  ◀─────────────────────────── │
     │  4. Unblind to get proofs     │
     ▼                               ▼
┌─────────┐                    ┌─────────┐
│ Proofs  │ ──── Transfer ────▶│  Bob    │
└─────────┘      (offline)     └─────────┘`}
      </DocsCodeBlock>

      <DocsH2>Key Components</DocsH2>

      <DocsH3>Proofs</DocsH3>

      <DocsP>
        A <strong className="text-white">Proof</strong> is a cryptographic token representing a specific amount. Each proof contains:
      </DocsP>

      <DocsCodeBlock title="Proof structure">
{`public class Proof
{
    public ulong Amount { get; set; }      // Token denomination (e.g., 1, 2, 4, 8...)
    public KeysetId Id { get; set; }       // Which keyset signed this
    public ISecret Secret { get; set; }    // The secret (hash preimage)
    public PubKey C { get; set; }          // Unblinded signature from mint
    public DLEQProof? DLEQ { get; set; }   // Optional proof of correct signing
}`}
      </DocsCodeBlock>

      <DocsNote type="info">
        Each proof has a <strong>fixed denomination</strong> from a power-of-2 series.
        Proofs are <strong>bearer tokens</strong> — whoever has them can spend them.
        Secrets must be <strong>unique</strong> — reusing secrets causes token theft.
      </DocsNote>

      <DocsH3>Secrets</DocsH3>

      <DocsP>
        Secrets are the foundation of token ownership. DotNut supports multiple secret types:
      </DocsP>

      <DocsCodeBlock title="Secret types">
{`// Simple string secret
var secret = new StringSecret("random-unique-value-12345");

// NUT-10 Secrets (Spending Conditions)
var p2pkSecret = new Nut10Secret("P2PK", proofSecret);  // Pay to Public Key
var htlcSecret = new Nut10Secret("HTLC", htlcProofSecret);  // HTLC

// Deterministic secrets (NUT-13) - recoverable!
var secret = mnemonic.DeriveSecret(keysetId, counter: 0);`}
      </DocsCodeBlock>

      <DocsH3>Keysets</DocsH3>

      <DocsP>
        A <strong className="text-white">Keyset</strong> is a set of public keys from the mint, one for each possible denomination:
      </DocsP>

      <DocsCodeBlock>
{`// Keyset maps amounts to public keys
var keyset = new Keyset
{
    { 1, pubKey1 },
    { 2, pubKey2 },
    { 4, pubKey4 },
    // ... powers of 2
};

// KeysetId uniquely identifies a keyset
var keysetId = new KeysetId("009a1f293253e41e");`}
      </DocsCodeBlock>

      <DocsH2>Blinding</DocsH2>

      <DocsP>
        Blinding is what makes Cashu private. The process:
      </DocsP>

      <div className="my-6 space-y-3">
        <div className="flex items-start gap-4 p-4 bg-white/5 border border-white/10">
          <div className="w-8 h-8 bg-white/10 flex items-center justify-center shrink-0 font-mono text-sm">1</div>
          <div>
            <div className="font-medium text-white">User creates secret</div>
            <div className="text-sm text-gray-400">Hashes to curve point Y</div>
          </div>
        </div>
        <div className="flex items-start gap-4 p-4 bg-white/5 border border-white/10">
          <div className="w-8 h-8 bg-white/10 flex items-center justify-center shrink-0 font-mono text-sm">2</div>
          <div>
            <div className="font-medium text-white">User blinds</div>
            <div className="text-sm text-gray-400 font-mono">B_ = Y + r*G (r is random blinding factor)</div>
          </div>
        </div>
        <div className="flex items-start gap-4 p-4 bg-white/5 border border-white/10">
          <div className="w-8 h-8 bg-white/10 flex items-center justify-center shrink-0 font-mono text-sm">3</div>
          <div>
            <div className="font-medium text-white">Mint signs blind</div>
            <div className="text-sm text-gray-400 font-mono">C_ = k*B_</div>
          </div>
        </div>
        <div className="flex items-start gap-4 p-4 bg-white/5 border border-white/10">
          <div className="w-8 h-8 bg-white/10 flex items-center justify-center shrink-0 font-mono text-sm">4</div>
          <div>
            <div className="font-medium text-white">User unblinds</div>
            <div className="text-sm text-gray-400 font-mono">C = C_ - r*K (K is mint&apos;s public key)</div>
          </div>
        </div>
      </div>

      <DocsNote type="tip">
        The mint never sees Y or C, only B_ and C_. This is what provides privacy.
      </DocsNote>

      <DocsCodeBlock title="DotNut handles blinding automatically">
{`// DotNut handles this automatically
var outputs = await wallet.CreateOutputs(amounts, keysetId);
// outputs contain: BlindedMessage (B_), BlindingFactor (r), Secret`}
      </DocsCodeBlock>

      <DocsH2>Denomination System</DocsH2>

      <DocsP>
        Cashu uses power-of-2 denominations for efficiency:
      </DocsP>

      <DocsTable>
        <thead>
          <tr>
            <DocsTh>Amount</DocsTh>
            <DocsTh>Binary</DocsTh>
          </tr>
        </thead>
        <tbody>
          {[
            { amount: "1", binary: "0001" },
            { amount: "2", binary: "0010" },
            { amount: "4", binary: "0100" },
            { amount: "8", binary: "1000" },
            { amount: "16", binary: "10000" },
            { amount: "32", binary: "100000" },
            { amount: "64", binary: "1000000" },
          ].map((row) => (
            <tr key={row.amount}>
              <DocsTd>{row.amount}</DocsTd>
              <DocsTd><code className="font-mono">{row.binary}</code></DocsTd>
            </tr>
          ))}
        </tbody>
      </DocsTable>

      <DocsP>
        <strong className="text-white">Any amount</strong> can be represented as sum of powers of 2:
      </DocsP>

      <DocsCodeBlock>
{`100 sats = 64 + 32 + 4 = [64, 32, 4]
1000 sats = 512 + 256 + 128 + 64 + 32 + 8 = [512, 256, 128, 64, 32, 8]`}
      </DocsCodeBlock>

      <DocsH2>Token Encoding</DocsH2>

      <DocsH3>V3 Format (JSON-based)</DocsH3>
      <DocsCodeBlock>
{`cashuAey...  (base64url encoded JSON)`}
      </DocsCodeBlock>

      <DocsH3>V4 Format (CBOR-based)</DocsH3>
      <DocsCodeBlock>
{`cashuBo2...  (base64url encoded CBOR)`}
      </DocsCodeBlock>

      <DocsNote type="tip">
        V4 is <strong>~30% smaller</strong> than V3 for the same token. Use V4 (&quot;B&quot;) for production.
      </DocsNote>

      <DocsCodeBlock title="Encoding examples">
{`// Encode
string v3 = token.Encode("A");  // cashuA...
string v4 = token.Encode("B");  // cashuB...

// As URI
string uri = token.Encode("B", makeUri: true);  // cashu:cashuB...`}
      </DocsCodeBlock>

      <DocsH2>Fees</DocsH2>

      <DocsP>
        Mints may charge fees per input proof (NUT-02):
      </DocsP>

      <DocsCodeBlock>
{`// Fee is calculated as: ceil(sum_of_input_fees / 1000)
var keysets = await wallet.GetKeysets();
var fee = proofs.ComputeFee(keysets.ToDictionary(k => k.Id, k => k.InputFee));

// DotNut handles fees automatically when enabled:
await wallet.Swap()
    .FromInputs(proofs)
    .WithFeeCalculation(true)  // Automatically deduct fees
    .ProcessAsync();`}
      </DocsCodeBlock>
    </div>
  )
}
