import OpenAI from 'openai';
import axios from 'axios';

const client = new OpenAI({
  apiKey: import.meta.env.VITE_PERPLEXITY_API_KEY,
  baseURL: 'https://api.perplexity.ai',
  dangerouslyAllowBrowser: true, // Note: For demo only; use server-side in production
});

const PERPLEXITY_MODELS = [
  {
    id: 'sonar-pro',
    name: 'Sonar Pro',
    description: 'Advanced search with grounding, supporting complex queries'
  },
  {
    id: 'sonar',
    name: 'Sonar',
    description: 'Lightweight, cost-effective search model'
  },
  {
    id: 'sonar-deep-research',
    name: 'Sonar Deep Research',
    description: 'Expert-level research model for comprehensive reports'
  },
  {
    id: 'sonar-reasoning-pro',
    name: 'Sonar Reasoning Pro',
    description: 'Premier reasoning with Chain of Thought'
  },
  {
    id: 'sonar-reasoning',
    name: 'Sonar Reasoning',
    description: 'Fast, real-time reasoning model'
  }
];

const STOCK_API_BASE_URL = import.meta.env.VITE_STOCK_API_BASE_URL || 'https://api.example.com/v1';
const STOCK_API_KEY = import.meta.env.VITE_STOCK_API_KEY;

class PerplexityService {
  constructor() {
    this.apiKey = import.meta.env.VITE_PERPLEXITY_API_KEY;
    this.stockApiKey = STOCK_API_KEY;
    this.baseURL = 'https://api.perplexity.ai';
  }

  getAvailableModels() {
    return PERPLEXITY_MODELS;
  }

  async sendMessage(message, model = 'sonar-pro', options = {}) {
    try {
      const systemPrompt = this.buildSystemPrompt();
      const enhancedMessage = this.enhanceStockQuery(message);

      const response = await client.chat.completions.create({
        model: model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: enhancedMessage }
        ],
        max_tokens: options.maxTokens || 1000,
        temperature: options.temperature || 0.2,
        search_domain_filter: options.searchDomains || ['moneycontrol.com', 'economictimes.indiatimes.com', 'nseindia.com'],
        return_related_questions: true,
        search_recency_filter: options.recencyFilter || 'week',
        ...options
      });

      return {
        success: true,
        content: response.choices[0].message.content,
        model: model,
        usage: response.usage,
        relatedQuestions: response.related_questions || []
      };
    } catch (error) {
      console.error('Perplexity API Error:', error);
      return {
        success: false,
        error: this.handleError(error),
        model: model
      };
    }
  }

  async sendStreamingMessage(message, model = 'sonar-pro', options = {}, onChunk) {
    try {
      const systemPrompt = this.buildSystemPrompt();
      const enhancedMessage = this.enhanceStockQuery(message);

      const stream = await client.chat.completions.create({
        model: model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: enhancedMessage }
        ],
        max_tokens: options.maxTokens || 1000,
        temperature: options.temperature || 0.2,
        search_domain_filter: options.searchDomains || ['moneycontrol.com', 'economictimes.indiatimes.com', 'nseindia.com'],
        return_related_questions: true,
        search_recency_filter: options.recencyFilter || 'week',
        stream: true,
        ...options
      });

      let fullContent = '';
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        if (content) {
          fullContent += content;
          onChunk(content);
        }
      }

      return {
        success: true,
        content: fullContent,
        model: model
      };
    } catch (error) {
      console.error('Perplexity Streaming Error:', error);
      return {
        success: false,
        error: this.handleError(error),
        model: model
      };
    }
  }

  buildSystemPrompt() {
    return `You are a specialized AI assistant for Indian stock market analysis and financial insights. Your primary role is to:

1. **Stock Analysis**: Provide detailed analysis of Indian stocks including:
   - Current price and performance metrics
   - Buy/sell/hold recommendations with reasoning
   - Technical analysis for intraday, swing, and long-term trading
   - Fundamental analysis and key financial ratios

2. **Market Insights**: Offer insights on:
   - Market trends and sector analysis
   - Economic factors affecting stock prices
   - News impact on stock movements

3. **Navigation Assistance**: When relevant, suggest users navigate to:
   - Portfolio section for portfolio management
   - News section for latest market updates
   - Stock analysis pages for detailed research

4. **Scope Guidelines**:
   - Focus on Indian stocks and markets (NSE, BSE)
   - Provide actionable insights with confidence levels
   - If asked about topics outside Indian stock market, respond with "Not in my scope" and suggest related financial topics
   - Remember user preferences and queries for the current session only

5. **Response Format**:
   - Be concise yet comprehensive
   - Include relevant metrics and data
   - Provide clear buy/sell/hold recommendations
   - Suggest time horizons (intraday, swing, long-term)
   - Include navigation suggestions when appropriate

Always cite sources and provide disclaimer about market risks.`;
  }

  enhanceStockQuery(message) {
    const stockSymbols = this.extractStockSymbols(message);
    const queryType = this.identifyQueryType(message);
    
    let enhancedMessage = message;
    
    if (stockSymbols.length > 0) {
      enhancedMessage += `\n\nStock symbols mentioned: ${stockSymbols.join(', ')}`;
    }
    
    if (queryType) {
      enhancedMessage += `\n\nQuery type: ${queryType}`;
    }
    
    enhancedMessage += `\n\nPlease provide analysis specific to Indian stock market and NSE/BSE listings.`;
    
    return enhancedMessage;
  }

  extractStockSymbols(message) {
    const commonSymbols = [
      'RELIANCE', 'TCS', 'INFY', 'HDFC', 'ICICIBANK', 'BHARTIARTL', 'KOTAKBANK',
      'ITC', 'HINDUNILVR', 'SBIN', 'BAJFINANCE', 'HCLTECH', 'WIPRO', 'MARUTI',
      'ASIANPAINT', 'NESTLEIND', 'ULTRACEMCO', 'AXISBANK', 'TATASTEEL', 'SUNPHARMA'
    ];
    
    const foundSymbols = commonSymbols.filter(symbol => 
      message.toUpperCase().includes(symbol)
    );
    
    return foundSymbols;
  }

  identifyQueryType(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('buy') || lowerMessage.includes('sell') || lowerMessage.includes('hold')) {
      return 'recommendation';
    }
    if (lowerMessage.includes('technical') || lowerMessage.includes('chart')) {
      return 'technical_analysis';
    }
    if (lowerMessage.includes('fundamental') || lowerMessage.includes('financial')) {
      return 'fundamental_analysis';
    }
    if (lowerMessage.includes('news') || lowerMessage.includes('latest')) {
      return 'news_analysis';
    }
    if (lowerMessage.includes('sector') || lowerMessage.includes('industry')) {
      return 'sector_analysis';
    }
    
    return null;
  }

  async fetchStockData(symbol) {
    try {
      const response = await axios.get(`${STOCK_API_BASE_URL}/stocks/${symbol}`, {
        headers: {
          'Authorization': `Bearer ${this.stockApiKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Stock API Error:', error);
      return {
        success: false,
        error: 'Unable to fetch stock data. Please try again later.'
      };
    }
  }

  handleError(error) {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.error?.message || error.message;
      
      switch (status) {
        case 401:
          return 'Authentication failed. Please check your API key.';
        case 429:
          return 'Rate limit exceeded. Please try again later.';
        case 500:
          return 'Server error. Please try again later.';
        default:
          return `API Error: ${message}`;
      }
    } else if (error.request) {
      return 'Network error. Please check your internet connection.';
    } else {
      return `Error: ${error.message}`;
    }
  }

  isStockRelated(message) {
    const stockKeywords = [
      'stock', 'share', 'equity', 'market', 'nse', 'bse', 'sensex', 'nifty',
      'buy', 'sell', 'hold', 'investment', 'trading', 'portfolio', 'dividend',
      'financial', 'earnings', 'revenue', 'profit', 'loss', 'sector', 'industry'
    ];
    
    const lowerMessage = message.toLowerCase();
    return stockKeywords.some(keyword => lowerMessage.includes(keyword));
  }

  getOutOfScopeResponse() {
    return {
      success: true,
      content: `Not in my scope. I specialize in Indian stock market analysis and financial insights.

Here are some topics I can help you with:
• Stock analysis and recommendations
• Market trends and sector insights
• Technical and fundamental analysis
• Portfolio management guidance
• Economic factors affecting markets
• Trading strategies for different timeframes

Would you like to explore any of these financial topics instead?`,
      model: 'system',
      suggestions: [
        'Analyze current market trends',
        'Get stock recommendations',
        'View portfolio insights',
        'Check market news'
      ]
    };
  }
}

export default new PerplexityService();