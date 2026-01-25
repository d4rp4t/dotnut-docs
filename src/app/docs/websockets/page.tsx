import { 
  DocsH1, DocsH2, DocsH3, DocsP, DocsCodeBlock, DocsTable, DocsTh, DocsTd, DocsNote
} from "@/components/docs-content"

export default function WebSocketsDocs() {
  return (
    <div>
      <DocsH1>WebSocket Subscriptions</DocsH1>
      
      <DocsP>
        DotNut supports real-time notifications via WebSockets (NUT-17). Subscribe to quote updates, 
        proof state changes, and other events.
      </DocsP>

      <DocsH2>Setup</DocsH2>

      <DocsCodeBlock>
{`using DotNut.Abstractions.Websockets;

// Create WebSocket service
var wsService = new WebsocketService();

// Connect to mint
await wsService.ConnectAsync("https://testnut.cashu.space");`}
      </DocsCodeBlock>

      <DocsH2>Subscribe to Updates</DocsH2>

      <DocsH3>Mint Quote Updates</DocsH3>

      <DocsCodeBlock>
{`// Subscribe to quote status changes
var subscription = await wsService.SubscribeAsync(
    mintUrl: "https://testnut.cashu.space",
    kind: "bolt11_mint_quote",
    filters: new[] { quoteId }
);

// Process messages via async enumeration
await foreach (var message in subscription.ReadAllAsync())
{
    if (message.Params is MintQuoteBolt11Response quote)
    {
        Console.WriteLine($"Quote {quote.Quote} state: {quote.State}");
        
        if (quote.State == "PAID")
        {
            Console.WriteLine("Payment received!");
            await subscription.CloseAsync();
            break;
        }
    }
}`}
      </DocsCodeBlock>

      <DocsH3>Melt Quote Updates</DocsH3>

      <DocsCodeBlock>
{`var subscription = await wsService.SubscribeAsync(
    mintUrl: "https://testnut.cashu.space",
    kind: "bolt11_melt_quote",
    filters: new[] { meltQuoteId }
);

await foreach (var message in subscription.ReadAllAsync())
{
    if (message.Params is MeltQuoteBolt11Response quote)
    {
        Console.WriteLine($"Melt state: {quote.State}");
        
        if (quote.State == "PAID")
        {
            Console.WriteLine($"Lightning payment settled!");
            if (!string.IsNullOrEmpty(quote.PaymentPreimage))
            {
                Console.WriteLine($"Preimage: {quote.PaymentPreimage}");
            }
        }
    }
}`}
      </DocsCodeBlock>

      <DocsH3>Proof State Changes</DocsH3>

      <DocsCodeBlock>
{`// Subscribe to state changes for specific proofs
var proofYs = proofs.Select(p => p.GetY()).ToArray();

var subscription = await wsService.SubscribeAsync(
    mintUrl: "https://testnut.cashu.space",
    kind: "proof_state",
    filters: proofYs
);

await foreach (var message in subscription.ReadAllAsync())
{
    if (message.Params is ProofStateResponse state)
    {
        Console.WriteLine($"Proof state changed: {state.State}");
    }
}`}
      </DocsCodeBlock>

      <DocsH2>Subscription Kinds</DocsH2>

      <DocsTable>
        <thead>
          <tr>
            <DocsTh>Kind</DocsTh>
            <DocsTh>Description</DocsTh>
            <DocsTh>Filters</DocsTh>
          </tr>
        </thead>
        <tbody>
          <tr>
            <DocsTd><code className="font-mono text-sm">bolt11_mint_quote</code></DocsTd>
            <DocsTd>Mint quote status updates</DocsTd>
            <DocsTd>Quote IDs</DocsTd>
          </tr>
          <tr>
            <DocsTd><code className="font-mono text-sm">bolt11_melt_quote</code></DocsTd>
            <DocsTd>Melt quote status updates</DocsTd>
            <DocsTd>Quote IDs</DocsTd>
          </tr>
          <tr>
            <DocsTd><code className="font-mono text-sm">proof_state</code></DocsTd>
            <DocsTd>Proof spent/unspent changes</DocsTd>
            <DocsTd>Proof Y values</DocsTd>
          </tr>
        </tbody>
      </DocsTable>

      <DocsH2>Working with Subscriptions</DocsH2>

      <DocsH3>Subscription Properties</DocsH3>

      <DocsCodeBlock>
{`var subscription = await wsService.SubscribeAsync(...);

// Unique subscription ID
Console.WriteLine($"Subscription ID: {subscription.Id}");

// Check if active
Console.WriteLine($"Is Active: {subscription.IsActive}");

// Access underlying channel
var channel = subscription.NotificationChannel;`}
      </DocsCodeBlock>

      <DocsH3>Using Async Enumerable</DocsH3>

      <DocsCodeBlock>
{`// With cancellation
var cts = new CancellationTokenSource(TimeSpan.FromMinutes(5));

try
{
    await foreach (var message in subscription.ReadAllAsync(cts.Token))
    {
        // Process message
        HandleMessage(message);
    }
}
catch (OperationCanceledException)
{
    Console.WriteLine("Subscription timed out");
}`}
      </DocsCodeBlock>

      <DocsH3>Manual Channel Reading</DocsH3>

      <DocsCodeBlock>
{`// Lower-level channel access
while (await subscription.NotificationChannel.Reader.WaitToReadAsync())
{
    while (subscription.NotificationChannel.Reader.TryRead(out var message))
    {
        // Process message
    }
}`}
      </DocsCodeBlock>

      <DocsH2>Connection Management</DocsH2>

      <DocsH3>Check Connection State</DocsH3>

      <DocsCodeBlock>
{`var state = wsService.GetConnectionState("https://testnut.cashu.space");
Console.WriteLine($"Connection state: {state}");

// WebSocketState: None, Connecting, Open, CloseSent, CloseReceived, Closed, Aborted`}
      </DocsCodeBlock>

      <DocsH3>List Active Subscriptions</DocsH3>

      <DocsCodeBlock>
{`var subs = wsService.GetSubscriptions("https://testnut.cashu.space");

foreach (var sub in subs)
{
    Console.WriteLine($"ID: {sub.Id}, Kind: {sub.Kind}, Active: {sub.IsActive}");
}`}
      </DocsCodeBlock>

      <DocsH3>Unsubscribe</DocsH3>

      <DocsCodeBlock>
{`// Unsubscribe by ID
await wsService.UnsubscribeAsync(
    "https://testnut.cashu.space",
    subscription.Id
);

// Or close subscription directly
await subscription.CloseAsync();`}
      </DocsCodeBlock>

      <DocsH3>Disconnect</DocsH3>

      <DocsCodeBlock>
{`// Disconnect from specific mint
await wsService.DisconnectAsync("https://testnut.cashu.space");

// Dispose service (disconnects all)
await wsService.DisposeAsync();`}
      </DocsCodeBlock>

      <DocsH2>Complete Example</DocsH2>

      <DocsCodeBlock title="Full minting flow with WebSockets">
{`using DotNut.Abstractions;
using DotNut.Abstractions.Websockets;

public async Task MintWithRealtimeUpdates()
{
    var mintUrl = "https://testnut.cashu.space";
    
    // Create wallet and WebSocket service
    var wallet = Wallet.Create().WithMint(mintUrl);
    await using var wsService = new WebsocketService();
    
    // Connect WebSocket
    await wsService.ConnectAsync(mintUrl);
    
    // Create mint quote
    var handler = await wallet
        .CreateMintQuote()
        .WithAmount(1000)
        .WithUnit("sat")
        .ProcessAsyncBolt11();
    
    var quote = handler.GetQuote();
    Console.WriteLine($"Pay invoice: {quote.Request}");
    
    // Subscribe to quote updates
    var subscription = await wsService.SubscribeAsync(
        mintUrl,
        "bolt11_mint_quote",
        new[] { quote.Quote }
    );
    
    // Wait for payment
    using var cts = new CancellationTokenSource(TimeSpan.FromMinutes(10));
    
    await foreach (var msg in subscription.ReadAllAsync(cts.Token))
    {
        if (msg.Params is MintQuoteBolt11Response update)
        {
            Console.WriteLine($"State: {update.State}");
            
            if (update.State == "PAID")
            {
                // Payment received - mint tokens
                var proofs = await handler.Mint();
                Console.WriteLine($"Minted {proofs.Sum(p => p.Amount)} sats!");
                break;
            }
        }
    }
    
    // Cleanup
    await subscription.CloseAsync();
    await wsService.DisconnectAsync(mintUrl);
}`}
      </DocsCodeBlock>

      <DocsNote type="tip">
        WebSocket subscriptions eliminate polling and provide instant updates. 
        Always use <code className="bg-white/10 px-1">await using</code> or call{" "}
        <code className="bg-white/10 px-1">DisposeAsync()</code> to properly clean up connections.
      </DocsNote>

      <DocsH2>Error Handling</DocsH2>

      <DocsCodeBlock>
{`try
{
    await wsService.ConnectAsync(mintUrl);
}
catch (WebSocketException ex)
{
    Console.WriteLine($"Failed to connect: {ex.Message}");
}

// Subscriptions handle reconnection gracefully
// If connection drops, subscription.IsActive becomes false`}
      </DocsCodeBlock>
    </div>
  )
}
