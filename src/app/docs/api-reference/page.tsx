import { 
  DocsH1, DocsH2, DocsH3, DocsP, DocsCodeBlock, DocsTable, DocsTh, DocsTd, DocsNote
} from "@/components/docs-content"

export default function ApiReferenceDocs() {
  return (
    <div>
      <DocsH1>API Reference</DocsH1>
      
      <DocsP>
        Complete reference for DotNut classes and interfaces.
      </DocsP>

      <DocsH2>Wallet</DocsH2>

      <DocsH3>Static Methods</DocsH3>

      <DocsTable>
        <thead>
          <tr>
            <DocsTh>Method</DocsTh>
            <DocsTh>Returns</DocsTh>
            <DocsTh>Description</DocsTh>
          </tr>
        </thead>
        <tbody>
          <tr>
            <DocsTd><code className="font-mono text-sm">Create()</code></DocsTd>
            <DocsTd><code className="font-mono text-sm">IWalletBuilder</code></DocsTd>
            <DocsTd>Start building a wallet instance</DocsTd>
          </tr>
        </tbody>
      </DocsTable>

      <DocsH3>Builder Methods (IWalletBuilder)</DocsH3>

      <DocsTable>
        <thead>
          <tr>
            <DocsTh>Method</DocsTh>
            <DocsTh>Description</DocsTh>
          </tr>
        </thead>
        <tbody>
          <tr>
            <DocsTd><code className="font-mono text-sm">WithMint(string url)</code></DocsTd>
            <DocsTd>Set the mint URL</DocsTd>
          </tr>
          <tr>
            <DocsTd><code className="font-mono text-sm">WithHttpClient(HttpClient)</code></DocsTd>
            <DocsTd>Use custom HTTP client</DocsTd>
          </tr>
          <tr>
            <DocsTd><code className="font-mono text-sm">WithMnemonic(Mnemonic)</code></DocsTd>
            <DocsTd>Enable deterministic secrets</DocsTd>
          </tr>
          <tr>
            <DocsTd><code className="font-mono text-sm">{`WithCounter(Dictionary<KeysetId, uint>)`}</code></DocsTd>
            <DocsTd>Set secret counters per keyset</DocsTd>
          </tr>
          <tr>
            <DocsTd><code className="font-mono text-sm">{`WithSecretGenerator(Func<...>)`}</code></DocsTd>
            <DocsTd>Custom secret generation</DocsTd>
          </tr>
        </tbody>
      </DocsTable>

      <DocsH3>Instance Methods</DocsH3>

      <DocsTable>
        <thead>
          <tr>
            <DocsTh>Method</DocsTh>
            <DocsTh>Returns</DocsTh>
            <DocsTh>Description</DocsTh>
          </tr>
        </thead>
        <tbody>
          <tr>
            <DocsTd><code className="font-mono text-sm">GetInfo()</code></DocsTd>
            <DocsTd><code className="font-mono text-sm">{`Task<MintInfo>`}</code></DocsTd>
            <DocsTd>Get mint information</DocsTd>
          </tr>
          <tr>
            <DocsTd><code className="font-mono text-sm">GetKeysets()</code></DocsTd>
            <DocsTd><code className="font-mono text-sm">{`Task<IEnumerable<KeysetInfo>>`}</code></DocsTd>
            <DocsTd>List available keysets</DocsTd>
          </tr>
          <tr>
            <DocsTd><code className="font-mono text-sm">GetKeys(KeysetId?)</code></DocsTd>
            <DocsTd><code className="font-mono text-sm">{`Task<Keyset>`}</code></DocsTd>
            <DocsTd>Get keyset keys</DocsTd>
          </tr>
          <tr>
            <DocsTd><code className="font-mono text-sm">CreateMintQuote()</code></DocsTd>
            <DocsTd><code className="font-mono text-sm">MintQuoteBuilder</code></DocsTd>
            <DocsTd>Start mint quote flow</DocsTd>
          </tr>
          <tr>
            <DocsTd><code className="font-mono text-sm">CreateMeltQuote()</code></DocsTd>
            <DocsTd><code className="font-mono text-sm">MeltQuoteBuilder</code></DocsTd>
            <DocsTd>Start melt quote flow</DocsTd>
          </tr>
          <tr>
            <DocsTd><code className="font-mono text-sm">Swap()</code></DocsTd>
            <DocsTd><code className="font-mono text-sm">SwapBuilder</code></DocsTd>
            <DocsTd>Start swap flow</DocsTd>
          </tr>
          <tr>
            <DocsTd><code className="font-mono text-sm">Restore()</code></DocsTd>
            <DocsTd><code className="font-mono text-sm">RestoreBuilder</code></DocsTd>
            <DocsTd>Start restore flow</DocsTd>
          </tr>
          <tr>
            <DocsTd><code className="font-mono text-sm">{`CheckState(IEnumerable<Proof>)`}</code></DocsTd>
            <DocsTd><code className="font-mono text-sm">{`Task<IEnumerable<StateResponseItem>>`}</code></DocsTd>
            <DocsTd>Check proof states</DocsTd>
          </tr>
          <tr>
            <DocsTd><code className="font-mono text-sm">GetApi()</code></DocsTd>
            <DocsTd><code className="font-mono text-sm">ICashuApi</code></DocsTd>
            <DocsTd>Get underlying API client</DocsTd>
          </tr>
        </tbody>
      </DocsTable>

      <DocsH2>MintQuoteBuilder</DocsH2>

      <DocsTable>
        <thead>
          <tr>
            <DocsTh>Method</DocsTh>
            <DocsTh>Description</DocsTh>
          </tr>
        </thead>
        <tbody>
          <tr>
            <DocsTd><code className="font-mono text-sm">WithAmount(ulong)</code></DocsTd>
            <DocsTd>Set amount to mint</DocsTd>
          </tr>
          <tr>
            <DocsTd><code className="font-mono text-sm">WithUnit(string)</code></DocsTd>
            <DocsTd>Set unit (sat, usd, eur)</DocsTd>
          </tr>
          <tr>
            <DocsTd><code className="font-mono text-sm">WithDescription(string)</code></DocsTd>
            <DocsTd>Set optional description</DocsTd>
          </tr>
          <tr>
            <DocsTd><code className="font-mono text-sm">ProcessAsyncBolt11()</code></DocsTd>
            <DocsTd>Process via BOLT11 Lightning</DocsTd>
          </tr>
          <tr>
            <DocsTd><code className="font-mono text-sm">ProcessAsyncBolt12()</code></DocsTd>
            <DocsTd>Process via BOLT12 offers</DocsTd>
          </tr>
        </tbody>
      </DocsTable>

      <DocsH2>MintHandler (Bolt11/Bolt12)</DocsH2>

      <DocsTable>
        <thead>
          <tr>
            <DocsTh>Method</DocsTh>
            <DocsTh>Returns</DocsTh>
            <DocsTh>Description</DocsTh>
          </tr>
        </thead>
        <tbody>
          <tr>
            <DocsTd><code className="font-mono text-sm">GetQuote()</code></DocsTd>
            <DocsTd><code className="font-mono text-sm">MintQuoteResponse</code></DocsTd>
            <DocsTd>Get current quote details</DocsTd>
          </tr>
          <tr>
            <DocsTd><code className="font-mono text-sm">Mint()</code></DocsTd>
            <DocsTd><code className="font-mono text-sm">{`Task<List<Proof>>`}</code></DocsTd>
            <DocsTd>Mint tokens after payment</DocsTd>
          </tr>
        </tbody>
      </DocsTable>

      <DocsH2>MeltQuoteBuilder</DocsH2>

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
            <DocsTd>Set Lightning invoice to pay</DocsTd>
          </tr>
          <tr>
            <DocsTd><code className="font-mono text-sm">WithUnit(string)</code></DocsTd>
            <DocsTd>Set unit</DocsTd>
          </tr>
          <tr>
            <DocsTd><code className="font-mono text-sm">WithOptions(opts)</code></DocsTd>
            <DocsTd>Set MPP/additional options</DocsTd>
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

      <DocsH2>MeltHandler (Bolt11/Bolt12)</DocsH2>

      <DocsTable>
        <thead>
          <tr>
            <DocsTh>Method</DocsTh>
            <DocsTh>Returns</DocsTh>
            <DocsTh>Description</DocsTh>
          </tr>
        </thead>
        <tbody>
          <tr>
            <DocsTd><code className="font-mono text-sm">GetQuote()</code></DocsTd>
            <DocsTd><code className="font-mono text-sm">MeltQuoteResponse</code></DocsTd>
            <DocsTd>Get current quote</DocsTd>
          </tr>
          <tr>
            <DocsTd><code className="font-mono text-sm">{`Melt(IEnumerable<Proof>)`}</code></DocsTd>
            <DocsTd><code className="font-mono text-sm">{`Task<List<Proof>>`}</code></DocsTd>
            <DocsTd>Execute melt, returns change</DocsTd>
          </tr>
        </tbody>
      </DocsTable>

      <DocsH2>SwapBuilder</DocsH2>

      <DocsTable>
        <thead>
          <tr>
            <DocsTh>Method</DocsTh>
            <DocsTh>Description</DocsTh>
          </tr>
        </thead>
        <tbody>
          <tr>
            <DocsTd><code className="font-mono text-sm">{`FromInputs(IEnumerable<Proof>)`}</code></DocsTd>
            <DocsTd>Set input proofs</DocsTd>
          </tr>
          <tr>
            <DocsTd><code className="font-mono text-sm">WithSend(ulong)</code></DocsTd>
            <DocsTd>Target output amount</DocsTd>
          </tr>
          <tr>
            <DocsTd><code className="font-mono text-sm">WithDLEQVerification(bool)</code></DocsTd>
            <DocsTd>Request/verify DLEQ proofs</DocsTd>
          </tr>
          <tr>
            <DocsTd><code className="font-mono text-sm">WithFeeCalculation(bool)</code></DocsTd>
            <DocsTd>Auto-calculate fees</DocsTd>
          </tr>
          <tr>
            <DocsTd><code className="font-mono text-sm">WithP2PK(PubKey, SigFlag?)</code></DocsTd>
            <DocsTd>Lock outputs to public key</DocsTd>
          </tr>
          <tr>
            <DocsTd><code className="font-mono text-sm">WithHTLC(...)</code></DocsTd>
            <DocsTd>Add HTLC spending conditions</DocsTd>
          </tr>
          <tr>
            <DocsTd><code className="font-mono text-sm">ProcessAsync()</code></DocsTd>
            <DocsTd>Execute swap</DocsTd>
          </tr>
        </tbody>
      </DocsTable>

      <DocsH2>RestoreBuilder</DocsH2>

      <DocsTable>
        <thead>
          <tr>
            <DocsTh>Method</DocsTh>
            <DocsTh>Description</DocsTh>
          </tr>
        </thead>
        <tbody>
          <tr>
            <DocsTd><code className="font-mono text-sm">ProcessAsync()</code></DocsTd>
            <DocsTd>Execute restore, returns recovered proofs</DocsTd>
          </tr>
        </tbody>
      </DocsTable>

      <DocsH2>WebsocketService</DocsH2>

      <DocsTable>
        <thead>
          <tr>
            <DocsTh>Method</DocsTh>
            <DocsTh>Returns</DocsTh>
            <DocsTh>Description</DocsTh>
          </tr>
        </thead>
        <tbody>
          <tr>
            <DocsTd><code className="font-mono text-sm">ConnectAsync(string)</code></DocsTd>
            <DocsTd><code className="font-mono text-sm">Task</code></DocsTd>
            <DocsTd>Connect to mint WebSocket</DocsTd>
          </tr>
          <tr>
            <DocsTd><code className="font-mono text-sm">DisconnectAsync(string)</code></DocsTd>
            <DocsTd><code className="font-mono text-sm">Task</code></DocsTd>
            <DocsTd>Disconnect from mint</DocsTd>
          </tr>
          <tr>
            <DocsTd><code className="font-mono text-sm">{`SubscribeAsync(url, kind, filters)`}</code></DocsTd>
            <DocsTd><code className="font-mono text-sm">{`Task<Subscription>`}</code></DocsTd>
            <DocsTd>Create subscription</DocsTd>
          </tr>
          <tr>
            <DocsTd><code className="font-mono text-sm">UnsubscribeAsync(url, subId)</code></DocsTd>
            <DocsTd><code className="font-mono text-sm">Task</code></DocsTd>
            <DocsTd>Remove subscription</DocsTd>
          </tr>
          <tr>
            <DocsTd><code className="font-mono text-sm">GetConnectionState(url)</code></DocsTd>
            <DocsTd><code className="font-mono text-sm">WebSocketState</code></DocsTd>
            <DocsTd>Check connection state</DocsTd>
          </tr>
          <tr>
            <DocsTd><code className="font-mono text-sm">GetSubscriptions(url)</code></DocsTd>
            <DocsTd><code className="font-mono text-sm">{`IEnumerable<Subscription>`}</code></DocsTd>
            <DocsTd>List active subscriptions</DocsTd>
          </tr>
          <tr>
            <DocsTd><code className="font-mono text-sm">DisposeAsync()</code></DocsTd>
            <DocsTd><code className="font-mono text-sm">ValueTask</code></DocsTd>
            <DocsTd>Clean up all connections</DocsTd>
          </tr>
        </tbody>
      </DocsTable>

      <DocsH2>Subscription</DocsH2>

      <DocsTable>
        <thead>
          <tr>
            <DocsTh>Property/Method</DocsTh>
            <DocsTh>Type</DocsTh>
            <DocsTh>Description</DocsTh>
          </tr>
        </thead>
        <tbody>
          <tr>
            <DocsTd><code className="font-mono text-sm">Id</code></DocsTd>
            <DocsTd><code className="font-mono text-sm">string</code></DocsTd>
            <DocsTd>Unique subscription ID</DocsTd>
          </tr>
          <tr>
            <DocsTd><code className="font-mono text-sm">Kind</code></DocsTd>
            <DocsTd><code className="font-mono text-sm">string</code></DocsTd>
            <DocsTd>Subscription type</DocsTd>
          </tr>
          <tr>
            <DocsTd><code className="font-mono text-sm">IsActive</code></DocsTd>
            <DocsTd><code className="font-mono text-sm">bool</code></DocsTd>
            <DocsTd>Whether subscription is active</DocsTd>
          </tr>
          <tr>
            <DocsTd><code className="font-mono text-sm">NotificationChannel</code></DocsTd>
            <DocsTd><code className="font-mono text-sm">{`Channel<WsMessage>`}</code></DocsTd>
            <DocsTd>Message channel</DocsTd>
          </tr>
          <tr>
            <DocsTd><code className="font-mono text-sm">ReadAllAsync(ct)</code></DocsTd>
            <DocsTd><code className="font-mono text-sm">{`IAsyncEnumerable<WsMessage>`}</code></DocsTd>
            <DocsTd>Async message stream</DocsTd>
          </tr>
          <tr>
            <DocsTd><code className="font-mono text-sm">CloseAsync()</code></DocsTd>
            <DocsTd><code className="font-mono text-sm">Task</code></DocsTd>
            <DocsTd>Close subscription</DocsTd>
          </tr>
        </tbody>
      </DocsTable>

      <DocsH2>Core Types</DocsH2>

      <DocsH3>Proof</DocsH3>

      <DocsCodeBlock>
{`public class Proof
{
    public ulong Amount { get; set; }
    public KeysetId Id { get; set; }
    public ISecret Secret { get; set; }
    public PubKey C { get; set; }
    public DLEQProof? DLEQ { get; set; }
    public string? Witness { get; set; }
}`}
      </DocsCodeBlock>

      <DocsH3>CashuToken</DocsH3>

      <DocsCodeBlock>
{`public class CashuToken
{
    public string? Unit { get; set; }
    public string? Memo { get; set; }
    public List<Token> Tokens { get; set; }
    
    public class Token
    {
        public string Mint { get; set; }
        public List<Proof> Proofs { get; set; }
    }
    
    public string Encode(string version, bool makeUri = false);
    public ulong TotalAmount();
}`}
      </DocsCodeBlock>

      <DocsH3>KeysetId</DocsH3>

      <DocsCodeBlock>
{`public readonly struct KeysetId
{
    public KeysetId(string hex);
    public string ToHex();
    public override string ToString();
}`}
      </DocsCodeBlock>

      <DocsH3>PrivKey / PubKey</DocsH3>

      <DocsCodeBlock>
{`public class PrivKey
{
    public PrivKey();                    // Random key
    public PrivKey(byte[] key);         // From bytes
    public PrivKey(string hex);         // From hex
    
    public PubKey GetPubKey();
    public byte[] SignSchnorr(byte[] message);
}

public class PubKey
{
    public PubKey(byte[] key);          // From 33-byte compressed
    public PubKey(string hex);          // From hex
    
    public bool Verify(byte[] message, byte[] signature);
    public string ToHex();
}`}
      </DocsCodeBlock>

      <DocsNote type="info">
        For complete API details including all overloads and extension methods, 
        see the source code or use IDE IntelliSense.
      </DocsNote>
    </div>
  )
}
