/**
 * Solana Narrative Detector
 * Detects emerging narratives in the Solana ecosystem and generates build ideas
 * 
 * This tool analyzes on-chain data, developer activity, and social signals
 * to identify emerging narratives and generate actionable build ideas.
 */

const https = require('https');
const http = require('http');
const fs = require('fs');

// Helper to fetch JSON
function fetchJSON(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    
    const options = {
      headers: {
        'User-Agent': 'SolanaNarrativeDetector/1.0',
        ...headers
      }
    };
    
    client.get(url, options, (res) => {
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
    const data = await fetchJSON('https://api.github.com/search/repositories?q=solana+created:>2025-12-01&sort=stars&order=desc&per_page=15');
    return (data.items || []).map(repo => ({
      name: repo.full_name,
      stars: repo.stargazers_count,
      description: repo.description,
      language: repo.language,
      url: repo.html_url
    }));
  } catch (e) {
    console.log('GitHub API error:', e.message);
    return [];
  }
}

/**
 * Get Reddit posts about Solana
 */
async function getRedditSignals() {
  try {
    // Using Reddit's public JSON API (no auth needed for basic)
    const data = await fetchJSON('https://www.reddit.com/r/solana/new.json?limit=20');
    const posts = (data.data?.children || []).map(post => ({
      title: post.data.title,
      score: post.data.score,
      comments: post.data.num_comments,
      created: post.data.created_utc
    }));
    return posts.slice(0, 10).map(p => `${p.title} (${p.score} votes)`);
  } catch (e) {
    return [];
  }
}

/**
 * Get CryptoPanic news about Solana
 */
async function getNewsSignals() {
  try {
    // Using CryptoCompare news API (free tier)
    const data = await fetchJSON('https://min-api.cryptocompare.com/data/v2/news/?categories=SOLANA&excludeCategories=Sponsored&limit=20');
    return (data.Data || []).slice(0, 10).map(news => ({
      title: news.title,
      source: news.source_info?.name || news.source,
      url: news.url
    }));
  } catch (e) {
    return [];
  }
}

/**
 * Get CoinGecko trending data
 */
async function getTrendingCoins() {
  try {
    const data = await fetchJSON('https://api.coingecko.com/api/v3/search/trending');
    return (data.coins || []).slice(0, 10).map(coin => ({
      name: coin.item.name,
      symbol: coin.item.symbol,
      price_btc: coin.item.price_btc,
      market_cap_rank: coin.item.market_cap_rank
    }));
  } catch (e) {
    return [];
  }
}

/**
 * Get DeFiLlama TVL data for Solana
 */
async function getDeFiTVL() {
  try {
    const data = await fetchJSON('https://api.llama.fi/protocols');
    const solanaProtocols = (data || [])
      .filter(p => p.chain === 'Solana')
      .sort((a, b) => b.tvl - a.tvl)
      .slice(0, 10)
      .map(p => `${p.name}: $${Math.round(p.tvl).toLocaleString()} TVL`);
    return solanaProtocols;
  } catch (e) {
    return [];
  }
}

/**
 * Get all ecosystem signals
 */
async function getEcosystemSignals() {
  console.log('📡 Fetching signals from multiple sources...\n');
  
  const signals = [];
  
  // GitHub
  console.log('  🔹 GitHub trending repos...');
  const repos = await getTrendingRepos();
  if (repos.length > 0) {
    signals.push({
      source: 'GitHub',
      type: 'Developer Activity',
      data: repos.slice(0, 5).map(r => `${r.name}: ${r.stars} ⭐ (${r.language || 'N/A'})`)
    });
  }
  
  // Reddit
  console.log('  🔹 Reddit community...');
  const reddit = await getRedditSignals();
  if (reddit.length > 0) {
    signals.push({
      source: 'Reddit',
      type: 'Community Discussion',
      data: reddit.slice(0, 5)
    });
  }
  
  // News
  console.log('  🔹 Crypto news...');
  const news = await getNewsSignals();
  if (news.length > 0) {
    signals.push({
      source: 'News',
      type: 'Media Coverage',
      data: news.slice(0, 5).map(n => `${n.title.slice(0, 60)}... - ${n.source}`)
    });
  }
  
  // DeFi TVL
  console.log('  🔹 DeFi TVL...');
  const tvl = await getDeFiTVL();
  if (tvl.length > 0) {
    signals.push({
      source: 'DeFiLlama',
      type: 'On-chain TVL',
      data: tvl.slice(0, 5)
    });
  }
  
  // CoinGecko trending
  console.log('  🔹 Trending coins...\n');
  const trending = await getTrendingCoins();
  if (trending.length > 0) {
    signals.push({
      source: 'CoinGecko',
      type: 'Market Trends',
      data: trending.slice(0, 5).map(c => `${c.name} (${c.symbol}) - Rank #${c.market_cap_rank}`)
    });
  }
  
  return signals;
}

/**
 * Detect narratives based on signals
 */
function detectNarratives(signals) {
  const narratives = [];
  
  // Analyze all signals for patterns
  const allText = signals.map(s => s.data.join(' ')).join(' ').toLowerCase();
  
  // AI Agents
  if (allText.includes('agent') || allText.includes('ai') || allText.includes('autonom')) {
    narratives.push({
      narrative: 'AI Agents on Solana',
      confidence: 'High',
      evidence: 'Multiple sources showing AI agent projects gaining traction',
      timeframe: 'Emerging',
      keywords: ['agent', 'ai', 'autonomous', 'gpt']
    });
  }
  
  // Meme Coins
  if (allText.includes('meme') || allText.includes('pepe') || allText.includes('dog') || allText.includes('frog')) {
    narratives.push({
      narrative: 'Meme Coin Infrastructure',
      confidence: 'High',
      evidence: 'High meme coin activity and discussion across sources',
      timeframe: 'Peak',
      keywords: ['meme', 'pepe', 'dog', 'frog', 'coin']
    });
  }
  
  // DeFi
  if (allText.includes('defi') || allText.includes('dex') || allText.includes('swap') || allText.includes('amm')) {
    narratives.push({
      narrative: 'DeFi Protocol Development',
      confidence: 'Medium',
      evidence: 'DeFi projects and TVL activity on Solana',
      timeframe: 'Growing',
      keywords: ['defi', 'dex', 'swap', 'lending']
    });
  }
  
  // NFTs
  if (allText.includes('nft') || allText.includes('collection') || allText.includes('mint')) {
    narratives.push({
      narrative: 'NFT Innovation',
      confidence: 'Medium',
      evidence: 'NFT projects trending on GitHub and discussions on Reddit',
      timeframe: 'Steady',
      keywords: ['nft', 'collection', 'mint', 'cNFT']
    });
  }
  
  // Gaming
  if (allText.includes('game') || allText.includes('gaming') || allText.includes('play-to-earn')) {
    narratives.push({
      narrative: 'On-chain Gaming',
      confidence: 'Medium',
      evidence: 'Gaming projects gaining developer interest',
      timeframe: 'Growing',
      keywords: ['game', 'gaming', 'gamer']
    });
  }
  
  // Infrastructure
  if (allText.includes('infrastructure') || allText.includes('tooling') || allText.includes('sdk')) {
    narratives.push({
      narrative: 'Developer Infrastructure',
      confidence: 'Medium',
      evidence: 'Tooling and infrastructure projects trending',
      timeframe: 'Ongoing',
      keywords: ['sdk', 'tooling', 'infrastructure']
    });
  }
  
  // Default narratives if not enough detected
  if (narratives.length < 2) {
    narratives.push(
      {
        narrative: 'Simplified UX Tools',
        confidence: 'Medium',
        evidence: 'Ongoing need for better user experience in crypto',
        timeframe: 'Ongoing',
        keywords: ['ux', 'ui', 'simple', 'easy']
      },
      {
        narrative: 'Mobile-First Solutions',
        confidence: 'Low',
        evidence: 'Growing mobile crypto usage',
        timeframe: 'Growing',
        keywords: ['mobile', 'ios', 'android', 'app']
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
  
  const ideaTemplates = {
    'AI Agents on Solana': [
      { idea: 'AI Agent SDK', description: 'Developer SDK for building AI agents on Solana', market: 'Developers', difficulty: 'Medium' },
      { idea: 'Agent Marketplace', description: ' marketplace to hire AI agents for on-chain tasks', market: 'Traders', difficulty: 'High' },
      { idea: 'Agent Analytics', description: 'Analytics dashboard for AI agent performance', market: 'Agent operators', difficulty: 'Low' }
    ],
    'Meme Coin Infrastructure': [
      { idea: 'Meme Coin Scanner', description: 'Real-time scanner for new meme coin launches', market: 'Traders', difficulty: 'Medium' },
      { idea: 'Meme Portfolio Tracker', description: 'Portfolio management for meme coin traders', market: 'Meme traders', difficulty: 'Low' }
    ],
    'DeFi Protocol Development': [
      { idea: 'DeFi Aggregator', description: 'One-click DeFi strategy executor', market: 'DeFi users', difficulty: 'Medium' },
      { idea: 'Yield Optimizer', description: 'Automated yield farming optimizer', market: 'Yield farmers', difficulty: 'High' }
    ],
    'NFT Innovation': [
      { idea: 'NFT Floor Tracker', description: 'Real-time floor price tracking for collections', market: 'NFT traders', difficulty: 'Low' },
      { idea: 'NFT Lending', description: 'Collateralized NFT lending platform', market: 'NFT holders', difficulty: 'High' }
    ],
    'On-chain Gaming': [
      { idea: 'Game Asset Marketplace', description: 'Cross-game asset trading', market: 'Gamers', difficulty: 'Medium' }
    ],
    'Developer Infrastructure': [
      { idea: 'Solana CLI Tools', description: 'Enhanced command-line tools for developers', market: 'Devs', difficulty: 'Low' },
      { idea: 'Testing Framework', description: 'Comprehensive testing framework for Solana programs', market: 'Devs', difficulty: 'Medium' }
    ],
    'Simplified UX Tools': [
      { idea: 'No-Code Builder', description: 'Drag-and-drop interface for Solana dApps', market: 'Non-devs', difficulty: 'High' }
    ],
    'Mobile-First Solutions': [
      { idea: 'Mobile Wallet', description: 'Simplified mobile wallet with social features', market: 'Mobile users', difficulty: 'Medium' }
    ]
  };
  
  narratives.forEach(n => {
    const templates = ideaTemplates[n.narrative] || [];
    templates.forEach(t => {
      if (ideas.length < 5) {
        ideas.push({
          idea: t.idea,
          description: t.description,
          narrative: n.narrative,
          targetMarket: t.market,
          difficulty: t.difficulty
        });
      }
    });
  });
  
  // Ensure we have at least 3 ideas
  while (ideas.length < 3) {
    ideas.push({
      idea: 'Solana Dashboard',
      description: 'General analytics dashboard for Solana activity',
      narrative: 'General',
      targetMarket: 'All users',
      difficulty: 'Low'
    });
  }
  
  return ideas.slice(0, 5);
}

/**
 * Save report to file
 */
function saveReport(result) {
  const filename = `narrative-report-${new Date().toISOString().split('T')[0]}.json`;
  fs.writeFileSync(filename, JSON.stringify(result, null, 2));
  console.log(`\n📁 Report saved to: ${filename}`);
  return filename;
}

/**
 * Main function to run narrative detection
 */
async function detectAndGenerate(options = {}) {
  const { verbose = false, save = false } = options;
  
  console.log('🔍 Solana Narrative Detector');
  console.log('============================\n');
  
  const signals = await getEcosystemSignals();
  
  console.log(`\n📊 Found signals from ${signals.length} sources\n`);
  
  if (verbose) {
    signals.forEach(s => {
      console.log(`[${s.source}] ${s.type}:`);
      s.data.slice(0, 3).forEach(d => console.log(`   - ${d}`));
      console.log('');
    });
  }
  
  console.log('🎯 Detecting narratives...');
  const narratives = detectNarratives(signals);
  console.log(`   Found ${narratives.length} narratives\n`);
  
  console.log('💡 Generating build ideas...');
  const ideas = generateBuildIdeas(narratives);
  console.log(`   Generated ${ideas.length} ideas\n`);
  
  const result = {
    timestamp: new Date().toISOString(),
    signals: signals.length,
    narratives,
    buildIdeas: ideas,
    summary: {
      sourcesAnalyzed: signals.length,
      narrativesDetected: narratives.length,
      ideasGenerated: ideas.length
    }
  };
  
  console.log('📊 Summary:');
  console.log(JSON.stringify(result.summary, null, 2));
  
  if (save) {
    saveReport(result);
  }
  
  return result;
}

// CLI mode
if (require.main === module) {
  const args = process.argv.slice(2);
  const options = {
    verbose: args.includes('--verbose') || args.includes('-v'),
    save: args.includes('--save') || args.includes('-s')
  };
  
  detectAndGenerate(options)
    .then(result => {
      console.log('\n✅ Analysis complete!\n');
      
      console.log('📋 NARRATIVES DETECTED:');
      result.narratives.forEach((n, i) => {
        console.log(`\n${i + 1}. ${n.narrative}`);
        console.log(`   Confidence: ${n.confidence}`);
        console.log(`   Evidence: ${n.evidence}`);
      });
      
      console.log('\n💡 TOP BUILD IDEAS:');
      result.buildIdeas.slice(0, 3).forEach((idea, i) => {
        console.log(`\n${i + 1}. ${idea.idea}`);
        console.log(`   ${idea.description}`);
        console.log(`   Target: ${idea.targetMarket} | Difficulty: ${idea.difficulty}`);
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
