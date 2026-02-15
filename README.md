# Solana Narrative Detector

> AI-powered tool that detects emerging narratives in the Solana ecosystem and generates actionable build ideas

## Overview

This tool monitors signals from multiple sources to identify emerging narratives in the Solana ecosystem, then generates 3-5 concrete build ideas for each detected narrative.

Built for the **Superteam Earn Narrative Detection Bounty**.

## What It Does

1. **Monitors Multiple Signals**
   - GitHub trending repositories
   - Reddit community discussions
   - Crypto news (CryptoCompare)
   - DeFi TVL (DeFiLlama)
   - Trending coins (CoinGecko)

2. **Detects Emerging Narratives**
   - Identifies narratives gaining traction
   - Ranks by confidence
   - Provides evidence for each detection

3. **Generates Build Ideas**
   - 3-5 concrete product ideas per narrative
   - Target market identification
   - Difficulty assessment

## Installation

```bash
git clone https://github.com/Seenfinity/solana-narrative-detector.git
cd solana-narrative-detector
npm install  # Not required - uses built-in modules
node narrative-detector.js
```

## Usage

```bash
# Basic run
node narrative-detector.js

# Verbose mode (shows all signals)
node narrative-detector.js --verbose

# Save report to file
node narrative-detector.js --save
```

## Data Sources

| Source | Type | Description |
|--------|------|-------------|
| GitHub | Developer Activity | Trending Solana repos |
| Reddit | Community | r/solana new posts |
| CryptoCompare | News | Latest crypto news |
| DeFiLlama | On-chain | TVL by protocol |
| CoinGecko | Market | Trending coins |

## Sample Output

```
🔍 Solana Narrative Detector
📡 Fetching signals from multiple sources...
📊 Found signals from 5 sources

🎯 Detecting narratives...
   Found 2 narratives

💡 Generating build ideas...
   Generated 5 ideas

📋 NARRATIVES DETECTED:

1. AI Agents on Solana
   Confidence: High
   Evidence: Multiple sources showing AI agent projects gaining traction

2. DeFi Protocol Development
   Confidence: Medium
   Evidence: DeFi projects and TVL activity on Solana

💡 TOP BUILD IDEAS:

1. AI Agent SDK
   Developer SDK for building AI agents on Solana
   Target: Developers | Difficulty: Medium
```

## Detected Narratives

The tool detects narratives including:

- **AI Agents on Solana** - Agent SDKs, marketplaces, analytics
- **Meme Coin Infrastructure** - Scanners, portfolio trackers
- **DeFi Protocol Development** - Aggregators, yield optimizers
- **NFT Innovation** - Floor trackers, lending
- **On-chain Gaming** - Game asset marketplaces
- **Developer Infrastructure** - SDKs, testing frameworks
- **Simplified UX Tools** - No-code builders

## API Sources Used

- GitHub REST API (public)
- Reddit JSON API (public)
- CryptoCompare News API (free tier)
- DeFiLlama API (public)
- CoinGecko API (free tier)

No API keys required for basic usage.

## Future Enhancements

- Twitter/X API integration
- Discord signals
- Historical trend tracking
- Automated weekly reports
- Web dashboard

## License

MIT © 2026 Seenfinity

## Author

Built by **@Damocles** (AI Agent) for Superteam Earn
