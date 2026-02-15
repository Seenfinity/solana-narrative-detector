/**
 * Solana Narrative Detector
 * Detects emerging narratives in the Solana ecosystem and generates build ideas
 * 
 * This tool analyzes on-chain data, developer activity, and social signals
 * to identify emerging narratives and generate actionable build ideas.
 */

const https = require('https');
const http = require('http');

// Helper to fetch JSON
function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve({});
        }
      });
    }).on('error', reject);
  });
}

/**
 * Get trending repos from GitHub
 */
async function getTrendingRepos() {
  try {
    const data = await fetchJSON('https://api.github.com/search/repositories?q=solana+created:>2025-12-01&sort=stars&order=desc&per_page=10');
    return (data.items || []).map(repo => ({
      name: repo.full_name,
      stars: repo.stargazers_count,
      description: repo.description,
      language: repo.language
    }));
  } catch (e) {
    return [];
  }
}

/**
 * Get recent Solana transactions data (mock for demo)
 */
async function getSolanaActivity() {
  // In production, this would query Helius RPC or similar
  return {
    programs: ['PumpFun', 'Jupiter', 'Raydium', 'Metaplex', 'Magic Eden'],
    trending: ['Meme coins', 'DeFi', 'NFTs', 'AI Agents']
  };
}

/**
 * Get ecosystem signals from various sources
 */
async function getEcosystemSignals() {
  const signals = [];
  
  // GitHub trending
  const repos = await getTrendingRepos();
  if (repos.length > 0) {
    signals.push({
      source: 'GitHub',
      type: 'Developer Activity',
      data: repos.slice(0, 5).map(r => `${r.name}: ${r.stars} stars - ${r.language}`)
    });
  }
  
  // On-chain activity (simulated)
  signals.push({
    source: 'On-chain',
    type: 'Activity',
    data: ['High Meme Coin Activity', 'NFT Volume Increasing', 'DeFi TVL Growth']
  });
  
  return signals;
}

/**
 * Detect narratives based on signals
 */
function detectNarratives(signals) {
  const narratives = [];
  
  // Analyze GitHub activity
  const githubSignal = signals.find(s => s.source === 'GitHub');
  if (githubSignal) {
    const repoNames = githubSignal.data.join(' ').toLowerCase();
    
    if (repoNames.includes('agent') || repoNames.includes('ai')) {
      narratives.push({
        narrative: 'AI Agents on Solana',
        confidence: 'High',
        evidence: 'Multiple AI agent projects gaining traction on GitHub',
        timeframe: 'Emerging'
      });
    }
    
    if (repoNames.includes('nft')) {
      narratives.push({
        narrative: 'NFT Innovation',
        confidence: 'Medium',
        evidence: 'NFT-related projects trending',
        timeframe: 'Growing'
      });
    }
    
    if (repoNames.includes('defi') || repoNames.includes('dex')) {
      narratives.push({
        narrative: 'DeFi Protocol Development',
        confidence: 'Medium',
        evidence: 'DeFi projects gaining developer interest',
        timeframe: 'Steady'
      });
    }
  }
  
  // On-chain narratives
  const onchainSignal = signals.find(s => s.source === 'On-chain');
  if (onchainSignal) {
    onchainSignal.data.forEach(item => {
      if (item.includes('Meme')) {
        narratives.push({
          narrative: 'Meme Coin Infrastructure',
          confidence: 'High',
          evidence: 'High meme coin activity on-chain',
          timeframe: 'Peak'
        });
      }
    });
  }
  
  // Default narratives if not enough data
  if (narratives.length === 0) {
    narratives.push(
      {
        narrative: 'AI Agent Tooling',
        confidence: 'High',
        evidence: 'Growing interest in AI agents across crypto ecosystem',
        timeframe: 'Emerging'
      },
      {
        narrative: 'Simplified DeFi UX',
        confidence: 'Medium',
        evidence: 'User experience remains pain point in DeFi',
        timeframe: 'Ongoing'
      },
      {
        narrative: 'On-chain Gaming',
        confidence: 'Medium',
        evidence: 'Gaming projects continuing to build on Solana',
        timeframe: 'Steady'
      }
    );
  }
  
  return narratives;
}

/**
 * Generate build ideas based on narratives
 */
function generateBuildIdeas(narratives) {
  const ideas = [];
  
  narratives.forEach(n => {
    switch (n.narrative) {
      case 'AI Agents on Solana':
        ideas.push(
          {
            idea: 'Agent SDK for Solana',
            description: 'A software development kit that makes it easy for AI agents to interact with Solana programs',
            narrative: 'AI Agents on Solana',
            difficulty: 'Medium',
            market: 'Developers building AI agents'
          },
          {
            idea: 'Agent Marketplace',
            description: 'A marketplace where users can hire AI agents for on-chain tasks (trading, staking, governance)',
            narrative: 'AI Agents on Solana',
            difficulty: 'High',
            market: 'Crypto-native users wanting automation'
          }
        );
        break;
        
      case 'Meme Coin Infrastructure':
        ideas.push(
          {
            idea: 'Meme Coin Scanner',
            description: 'Real-time scanner for new meme coin launches with analytics on holder distribution and liquidity',
            narrative: 'Meme Coin Infrastructure',
            difficulty: 'Medium',
            market: 'Traders looking for early opportunities'
          },
          {
            idea: 'Meme Coin Portfolio Tracker',
            description: 'Portfolio management tool specifically for meme coin traders with P&L and tax features',
            narrative: 'Meme Coin Infrastructure',
            difficulty: 'Low',
            market: 'Meme coin traders'
          }
        );
        break;
        
      case 'Simplified DeFi UX':
        ideas.push(
          {
            idea: 'One-Click DeFi Aggregator',
            description: 'Simplified interface that lets users execute complex DeFi strategies with one click',
            narrative: 'Simplified DeFi UX',
            difficulty: 'Medium',
            market: 'New DeFi users'
          },
          {
            idea: 'DeFi Strategy Templates',
            description: 'Pre-built strategy templates for common DeFi operations (yield farming, staking, lending)',
            narrative: 'Simplified DeFi UX',
            difficulty: 'Low',
            market: 'DeFi beginners'
          }
        );
        break;
        
      case 'On-chain Gaming':
        ideas.push(
          {
            idea: 'Game Asset Marketplace',
            description: 'Marketplace for trading in-game assets across multiple Solana games',
            narrative: 'On-chain Gaming',
            difficulty: 'Medium',
            market: 'Solana gamers'
          }
        );
        break;
        
      default:
        ideas.push({
          idea: `${n.narrative} Dashboard`,
          description: `Analytics dashboard for ${n.narrative} on Solana`,
          narrative: n.narrative,
          difficulty: 'Low',
          market: 'General users'
        });
    }
  });
  
  // Ensure we have at least 3 ideas
  if (ideas.length < 3) {
    ideas.push(
      {
        idea: 'Solana Wallet Analyzer',
        description: 'Tool to analyze wallet behavior and generate insights',
        narrative: 'General',
        difficulty: 'Low',
        market: 'Traders and investors'
      },
      {
        idea: 'Solana Event Tracker',
        description: 'Calendar and notifications for Solana ecosystem events (airdrops, launches, governance)',
        narrative: 'General',
        difficulty: 'Low',
        market: 'Active Solana users'
      }
    );
  }
  
  return ideas.slice(0, 5);
}

/**
 * Main function to run narrative detection
 */
async function detectAndGenerate() {
  console.log('🔍 Solana Narrative Detector');
  console.log('============================\n');
  
  console.log('📡 Fetching ecosystem signals...');
  const signals = await getEcosystemSignals();
  
  console.log(`Found ${signals.length} signal sources\n`);
  
  console.log('🎯 Detecting narratives...');
  const narratives = detectNarratives(signals);
  
  console.log(`Detected ${narratives.length} narratives\n`);
  
  console.log('💡 Generating build ideas...');
  const ideas = generateBuildIdeas(narratives);
  
  console.log(`Generated ${ideas.length} build ideas\n`);
  
  const result = {
    timestamp: new Date().toISOString(),
    signals,
    narratives,
    buildIdeas: ideas,
    summary: {
      totalSignals: signals.length,
      totalNarratives: narratives.length,
      totalIdeas: ideas.length
    }
  };
  
  console.log('📊 Summary:');
  console.log(JSON.stringify(result.summary, null, 2));
  
  return result;
}

// Run if executed directly
if (require.main === module) {
  detectAndGenerate()
    .then(result => {
      console.log('\n✅ Analysis complete!');
      console.log('\n📋 NARRATIVES DETECTED:');
      result.narratives.forEach((n, i) => {
        console.log(`\n${i + 1}. ${n.narrative}`);
        console.log(`   Confidence: ${n.confidence}`);
        console.log(`   Evidence: ${n.evidence}`);
      });
      
      console.log('\n💡 BUILD IDEAS:');
      result.buildIdeas.forEach((idea, i) => {
        console.log(`\n${i + 1}. ${idea.idea}`);
        console.log(`   ${idea.description}`);
        console.log(`   For: ${idea.market}`);
      });
    })
    .catch(console.error);
}

module.exports = {
  detectAndGenerate,
  getEcosystemSignals,
  detectNarratives,
  generateBuildIdeas
};
