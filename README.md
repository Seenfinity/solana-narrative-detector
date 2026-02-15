# Solana Narrative Detector

> AI-powered tool that detects emerging narratives in the Solana ecosystem and generates actionable build ideas

## Overview

This tool monitors signals from on-chain activity, developer activity (GitHub), and social media to identify emerging narratives in the Solana ecosystem. It then generates 3-5 concrete build ideas for each detected narrative.

Built for the **Superteam Earn Narrative Detection Bounty**.

## What It Does

1. **Monitors Ecosystem Signals**
   - On-chain activity (program usage, wallet behavior)
   - Developer activity (GitHub repos, commits, stars)
   - Social signals

2. **Detects Emerging Narratives**
   - Identifies narratives gaining traction
   - Ranks by confidence and novelty
   - Provides evidence for each detection

3. **Generates Build Ideas**
   - 3-5 concrete product ideas per narrative
   - Target market identification
   - Difficulty assessment

## Installation

```bash
git clone https://github.com/Seenfinity/solana-narrative-detector.git
cd solana-narrative-detector
node narrative-detector.js
```

## Output

The tool outputs:

```json
{
  "timestamp": "2026-02-15T...",
  "signals": [...],
  "narratives": [
    {
      "narrative": "AI Agents on Solana",
      "confidence": "High",
      "evidence": "Multiple AI agent projects gaining traction",
      "timeframe": "Emerging"
    }
  ],
  "buildIdeas": [
    {
      "idea": "Agent SDK for Solana",
      "description": "SDK for AI agents to interact with Solana",
      "narrative": "AI Agents on Solana",
      "difficulty": "Medium",
      "market": "Developers building AI agents"
    }
  ]
}
```

## Detected Narratives (Sample)

### 1. AI Agents on Solana
- **Confidence:** High
- **Evidence:** Multiple AI agent projects gaining traction on GitHub
- **Timeframe:** Emerging

**Build Ideas:**
- Agent SDK for Solana
- Agent Marketplace

### 2. Meme Coin Infrastructure  
- **Confidence:** High
- **Evidence:** High meme coin activity on-chain
- **Timeframe:** Peak

**Build Ideas:**
- Meme Coin Scanner
- Meme Coin Portfolio Tracker

### 3. Simplified DeFi UX
- **Confidence:** Medium
- **Evidence:** User experience remains pain point in DeFi
- **Timeframe:** Ongoing

**Build Ideas:**
- One-Click DeFi Aggregator
- DeFi Strategy Templates

## Data Sources

- **GitHub:** Trending Solana repositories
- **On-chain:** Activity patterns (via RPC)
- **Social:** Community signals

## How It Works

```
Signals → Analysis → Narratives → Build Ideas
   ↓          ↓           ↓            ↓
 GitHub    Pattern    Emerging    Products
 On-chain  Detection  Trends      Opportunities
 Social    AI/ML      Ranking     Market Fit
```

## Future Enhancements

- Add Twitter/X API for real-time social signals
- Integrate Helius/GenesysGo for on-chain data
- Add sentiment analysis
- Historical trend tracking
- Automated report generation

## Tech Stack

- JavaScript/Node.js
- GitHub API
- Solana RPC (Helius)

## License

MIT © 2026 Seenfinity

## Author

Built by **@Damocles** (AI Agent) for Superteam Earn
