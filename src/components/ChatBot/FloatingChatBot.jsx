import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Icon from 'components/AppIcon';
import ChatMessage from './ChatMessage';
import ModelSelector from './ModelSelector';
import perplexityService from 'services/perplexityService';
import sessionStorageManager from 'utils/sessionStorage';

const FloatingChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('sonar-pro');
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // Load session data
    const savedHistory = sessionStorageManager.getChatHistory();
    const savedPreferences = sessionStorageManager.getUserPreferences();
    
    setMessages(savedHistory);
    setSelectedModel(savedPreferences.selectedModel || 'sonar-pro');
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      message: inputMessage,
      isUser: true,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    sessionStorageManager.addMessageToHistory(userMessage);
    
    const currentMessage = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    try {
      // Check if query is stock-related
      if (!perplexityService.isStockRelated(currentMessage)) {
        const outOfScopeResponse = perplexityService.getOutOfScopeResponse();
        const botMessage = {
          id: Date.now() + 1,
          message: outOfScopeResponse.content,
          isUser: false,
          timestamp: new Date().toISOString(),
          model: selectedModel,
          suggestions: outOfScopeResponse.suggestions
        };
        
        setMessages(prev => [...prev, botMessage]);
        sessionStorageManager.addMessageToHistory(botMessage);
        setIsLoading(false);
        return;
      }

      const preferences = sessionStorageManager.getUserPreferences();
      
      if (preferences.streamingEnabled) {
        setIsStreaming(true);
        let streamingContent = '';
        
        const botMessage = {
          id: Date.now() + 1,
          message: '',
          isUser: false,
          timestamp: new Date().toISOString(),
          model: selectedModel
        };

        setMessages(prev => [...prev, botMessage]);

        const response = await perplexityService.sendStreamingMessage(
          currentMessage,
          selectedModel,
          {
            temperature: 0.2,
            maxTokens: 1000
          },
          (chunk) => {
            streamingContent += chunk;
            setMessages(prev => 
              prev.map(msg => 
                msg.id === botMessage.id 
                  ? { ...msg, message: streamingContent }
                  : msg
              )
            );
          }
        );

        if (response.success) {
          const finalBotMessage = {
            ...botMessage,
            message: response.content
          };
          sessionStorageManager.addMessageToHistory(finalBotMessage);
        } else {
          const errorMessage = {
            ...botMessage,
            message: `Error: ${response.error}`
          };
          setMessages(prev => 
            prev.map(msg => 
              msg.id === botMessage.id ? errorMessage : msg
            )
          );
        }
        
        setIsStreaming(false);
      } else {
        const response = await perplexityService.sendMessage(
          currentMessage,
          selectedModel,
          {
            temperature: 0.2,
            maxTokens: 1000
          }
        );

        const botMessage = {
          id: Date.now() + 1,
          message: response.success ? response.content : `Error: ${response.error}`,
          isUser: false,
          timestamp: new Date().toISOString(),
          model: selectedModel,
          suggestions: response.relatedQuestions
        };

        setMessages(prev => [...prev, botMessage]);
        sessionStorageManager.addMessageToHistory(botMessage);
      }

      // Track frequent queries and stock symbols
      sessionStorageManager.addFrequentQuery(currentMessage);
      const stockSymbols = perplexityService.extractStockSymbols(currentMessage);
      stockSymbols.forEach(symbol => sessionStorageManager.addStockSymbol(symbol));

    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        message: 'Sorry, I encountered an error. Please try again.',
        isUser: false,
        timestamp: new Date().toISOString(),
        model: selectedModel
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModelChange = (modelId) => {
    setSelectedModel(modelId);
    sessionStorageManager.setSelectedModel(modelId);
  };

  const handleClearChat = () => {
    setMessages([]);
    sessionStorageManager.clearChatHistory();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSendMessage(e);
    }
  };

  const getWelcomeMessage = () => {
    const savedSymbols = sessionStorageManager.getSavedStockSymbols();
    const frequentQueries = sessionStorageManager.getFrequentQueries();
    
    let welcomeText = `👋 Hello! I'm your AI assistant for Indian stock market analysis.

I can help you with:
• Stock analysis and recommendations
• Market trends and insights
• Technical & fundamental analysis
• Portfolio guidance
• News and sector analysis

Ask me about any Indian stock or market topic!`;

    if (savedSymbols.length > 0) {
      welcomeText += `\n\nYour recent stocks: ${savedSymbols.slice(-3).join(', ')}`;
    }

    return welcomeText;
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-primary to-accent text-white rounded-full shadow-large hover:shadow-xl transition-all duration-300 z-400 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: 90 }}
              animate={{ rotate: 0 }}
              exit={{ rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <Icon name="X" size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: -90 }}
              animate={{ rotate: 0 }}
              exit={{ rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <Icon name="MessageCircle" size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] bg-surface border border-border rounded-2xl shadow-2xl z-400 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary to-accent text-white rounded-t-2xl">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Icon name="Bot" size={16} />
                </div>
                <div>
                  <h3 className="font-semibold">AI Stock Assistant</h3>
                  <p className="text-xs opacity-80">Powered by Perplexity</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleClearChat}
                  className="p-1 hover:bg-white/20 rounded-md transition-colors"
                  title="Clear chat"
                >
                  <Icon name="RotateCcw" size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded-md transition-colors"
                >
                  <Icon name="Minimize2" size={16} />
                </button>
              </div>
            </div>

            {/* Model Selector */}
            <div className="p-3 border-b border-border bg-surface-hover">
              <ModelSelector 
                selectedModel={selectedModel}
                onModelChange={handleModelChange}
                disabled={isLoading || isStreaming}
              />
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center text-text-secondary py-8">
                  <Icon name="MessageCircle" size={32} className="mx-auto mb-4 text-primary" />
                  <div className="text-sm whitespace-pre-line">
                    {getWelcomeMessage()}
                  </div>
                </div>
              ) : (
                messages.map((msg) => (
                  <ChatMessage
                    key={msg.id}
                    message={msg.message}
                    isUser={msg.isUser}
                    timestamp={msg.timestamp}
                    model={msg.model}
                    suggestions={msg.suggestions}
                  />
                ))
              )}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2 px-4 py-3 bg-surface border border-border rounded-xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                    <span className="text-xs text-text-secondary">Thinking...</span>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about Indian stocks..."
                  className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-primary-300 focus:ring-2 focus:ring-primary-100 text-sm"
                  disabled={isLoading || isStreaming}
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isLoading || isStreaming}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 disabled:bg-secondary-300 disabled:cursor-not-allowed transition-colors duration-150"
                >
                  {isLoading || isStreaming ? (
                    <Icon name="Loader2" size={16} className="animate-spin" />
                  ) : (
                    <Icon name="Send" size={16} />
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingChatBot;