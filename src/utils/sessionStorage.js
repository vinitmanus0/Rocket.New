const SESSION_KEYS = {
  CHAT_HISTORY: 'chatbot_history',
  USER_PREFERENCES: 'chatbot_preferences',
  SELECTED_MODEL: 'chatbot_model'
};

class SessionStorageManager {
  constructor() {
    this.maxHistorySize = 50; // Maximum number of messages to store
  }

  // Chat History Management
  getChatHistory() {
    try {
      const history = sessionStorage.getItem(SESSION_KEYS.CHAT_HISTORY);
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error('Error retrieving chat history:', error);
      return [];
    }
  }

  saveChatHistory(history) {
    try {
      // Limit history size
      const limitedHistory = history.slice(-this.maxHistorySize);
      sessionStorage.setItem(SESSION_KEYS.CHAT_HISTORY, JSON.stringify(limitedHistory));
    } catch (error) {
      console.error('Error saving chat history:', error);
    }
  }

  addMessageToHistory(message) {
    try {
      const history = this.getChatHistory();
      const newMessage = {
        id: Date.now() + Math.random(),
        timestamp: new Date().toISOString(),
        ...message
      };
      
      history.push(newMessage);
      this.saveChatHistory(history);
      
      return newMessage;
    } catch (error) {
      console.error('Error adding message to history:', error);
      return message;
    }
  }

  clearChatHistory() {
    try {
      sessionStorage.removeItem(SESSION_KEYS.CHAT_HISTORY);
    } catch (error) {
      console.error('Error clearing chat history:', error);
    }
  }

  // User Preferences Management
  getUserPreferences() {
    try {
      const preferences = sessionStorage.getItem(SESSION_KEYS.USER_PREFERENCES);
      return preferences ? JSON.parse(preferences) : {
        selectedModel: 'sonar-pro',
        streamingEnabled: true,
        autoSuggestNavigation: true,
        preferredTimeframe: 'swing',
        savedStockSymbols: []
      };
    } catch (error) {
      console.error('Error retrieving user preferences:', error);
      return {
        selectedModel: 'sonar-pro',
        streamingEnabled: true,
        autoSuggestNavigation: true,
        preferredTimeframe: 'swing',
        savedStockSymbols: []
      };
    }
  }

  saveUserPreferences(preferences) {
    try {
      const currentPreferences = this.getUserPreferences();
      const updatedPreferences = { ...currentPreferences, ...preferences };
      sessionStorage.setItem(SESSION_KEYS.USER_PREFERENCES, JSON.stringify(updatedPreferences));
    } catch (error) {
      console.error('Error saving user preferences:', error);
    }
  }

  updatePreference(key, value) {
    try {
      const preferences = this.getUserPreferences();
      preferences[key] = value;
      this.saveUserPreferences(preferences);
    } catch (error) {
      console.error('Error updating preference:', error);
    }
  }

  // Model Selection Management
  getSelectedModel() {
    try {
      return sessionStorage.getItem(SESSION_KEYS.SELECTED_MODEL) || 'sonar-pro';
    } catch (error) {
      console.error('Error retrieving selected model:', error);
      return 'sonar-pro';
    }
  }

  setSelectedModel(model) {
    try {
      sessionStorage.setItem(SESSION_KEYS.SELECTED_MODEL, model);
      this.updatePreference('selectedModel', model);
    } catch (error) {
      console.error('Error setting selected model:', error);
    }
  }

  // Context Management
  getRecentContext(messageCount = 5) {
    try {
      const history = this.getChatHistory();
      return history.slice(-messageCount);
    } catch (error) {
      console.error('Error retrieving recent context:', error);
      return [];
    }
  }

  // Stock Symbol Tracking
  addStockSymbol(symbol) {
    try {
      const preferences = this.getUserPreferences();
      const savedSymbols = preferences.savedStockSymbols || [];
      
      if (!savedSymbols.includes(symbol)) {
        savedSymbols.push(symbol);
        // Keep only last 10 symbols
        const limitedSymbols = savedSymbols.slice(-10);
        this.updatePreference('savedStockSymbols', limitedSymbols);
      }
    } catch (error) {
      console.error('Error adding stock symbol:', error);
    }
  }

  getSavedStockSymbols() {
    try {
      const preferences = this.getUserPreferences();
      return preferences.savedStockSymbols || [];
    } catch (error) {
      console.error('Error retrieving saved stock symbols:', error);
      return [];
    }
  }

  // Query Tracking
  addFrequentQuery(query) {
    try {
      const preferences = this.getUserPreferences();
      const frequentQueries = preferences.frequentQueries || [];
      
      // Add query if not already present
      if (!frequentQueries.includes(query)) {
        frequentQueries.push(query);
        // Keep only last 5 queries
        const limitedQueries = frequentQueries.slice(-5);
        this.updatePreference('frequentQueries', limitedQueries);
      }
    } catch (error) {
      console.error('Error adding frequent query:', error);
    }
  }

  getFrequentQueries() {
    try {
      const preferences = this.getUserPreferences();
      return preferences.frequentQueries || [];
    } catch (error) {
      console.error('Error retrieving frequent queries:', error);
      return [];
    }
  }

  // Session Management
  clearSession() {
    try {
      Object.values(SESSION_KEYS).forEach(key => {
        sessionStorage.removeItem(key);
      });
    } catch (error) {
      console.error('Error clearing session:', error);
    }
  }

  getSessionStats() {
    try {
      const history = this.getChatHistory();
      const preferences = this.getUserPreferences();
      
      return {
        totalMessages: history.length,
        selectedModel: preferences.selectedModel,
        savedStockSymbols: preferences.savedStockSymbols?.length || 0,
        sessionStartTime: history[0]?.timestamp || new Date().toISOString(),
        lastActivity: history[history.length - 1]?.timestamp || new Date().toISOString()
      };
    } catch (error) {
      console.error('Error retrieving session stats:', error);
      return {
        totalMessages: 0,
        selectedModel: 'sonar-pro',
        savedStockSymbols: 0,
        sessionStartTime: new Date().toISOString(),
        lastActivity: new Date().toISOString()
      };
    }
  }
}

export default new SessionStorageManager();