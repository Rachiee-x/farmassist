import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MessageCircle, Send, Mic, X, User, Bot } from 'lucide-react';
import { api } from '../services/api';
import { formatText } from '../utils/textFormatter';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isStreaming?: boolean;
}

interface ChatbotProps {
  isOpenByDefault?: boolean;
}

export interface ChatbotRef {
  sendSearchQuery: (query: string) => void;
}

const Chatbot = forwardRef<ChatbotRef, ChatbotProps>(({ isOpenByDefault = false }, ref) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(isOpenByDefault);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
        text: t('chatWelcome'),
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    sendSearchQuery: (query: string) => {
      setIsOpen(true); // Ensure chat is open
      setInputText(query);
      setTimeout(() => {
        sendMessage();
      }, 100);
    }
  }));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Update isOpen when isOpenByDefault changes
  useEffect(() => {
    setIsOpen(isOpenByDefault);
  }, [isOpenByDefault]);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputText;
    setInputText('');
    setIsLoading(true);

    // Create streaming message
    const streamingMessage: Message = {
      id: messages.length + 2,
      text: '',
      isUser: false,
      timestamp: new Date(),
      isStreaming: true
    };

    setMessages(prev => [...prev, streamingMessage]);

    try {
      // Create abort controller for cancellation
      abortControllerRef.current = new AbortController();
      
      let fullResponse = '';
      
      // Use streaming API
      for await (const chunk of api.sendMessageStream(currentInput)) {
        if (abortControllerRef.current?.signal.aborted) {
          break;
        }
        
        fullResponse += chunk;
        
        // Update the streaming message
        setMessages(prev => prev.map(msg => 
          msg.id === streamingMessage.id 
            ? { ...msg, text: fullResponse }
            : msg
        ));
      }

      // Mark streaming as complete
      setMessages(prev => prev.map(msg => 
        msg.id === streamingMessage.id 
          ? { ...msg, isStreaming: false }
          : msg
      ));

    } catch (error) {
      console.error('Failed to send message:', error);
      
      // Remove streaming message and add error message
      setMessages(prev => {
        const filtered = prev.filter(msg => msg.id !== streamingMessage.id);
        return [...filtered, {
          id: messages.length + 2,
          text: 'Sorry, I\'m having trouble connecting to the server. Please try again later.',
          isUser: false,
          timestamp: new Date()
        }];
      });
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const startVoiceInput = () => {
    setIsListening(!isListening);
    // Simulate voice input
    if (!isListening) {
      setTimeout(() => {
        setInputText('When should I plant rice in Kerala?');
        setIsListening(false);
      }, 2000);
    }
  };

  const stopStreaming = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110 z-50"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[90vw] bg-white rounded-2xl shadow-2xl border z-50 max-h-[500px] flex flex-col">
          {/* Header */}
          <div className="bg-green-500 text-white p-4 rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-full">
                <Bot className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold">{t('chatbotTitle')}</h3>
                <p className="text-green-100 text-sm">
                  {isLoading ? t('typing') : t('online')}
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-80">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.isUser
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {!message.isUser && (
                      <Bot className="h-4 w-4 mt-0.5 text-green-500" />
                    )}
                    <div className="text-sm">
                      {message.isUser ? (
                        <p>{message.text}</p>
                      ) : (
                        <div 
                          className="chat-message"
                          dangerouslySetInnerHTML={{ 
                            __html: formatText(message.text) 
                          }}
                        />
                      )}
                      {message.isStreaming && (
                        <span className="inline-block w-2 h-4 bg-green-500 animate-pulse ml-1"></span>
                      )}
                    </div>
                    {message.isUser && (
                      <User className="h-4 w-4 mt-0.5 text-green-100" />
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder={t('chatPlaceholder')}
                disabled={isLoading}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none disabled:opacity-50"
              />
              <button
                onClick={startVoiceInput}
                disabled={isLoading}
                className={`p-2 rounded-lg transition-colors disabled:opacity-50 ${
                  isListening 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                title={t('voiceTooltip')}
              >
                <Mic className="h-4 w-4" />
              </button>
              {isLoading ? (
                <button
                  onClick={stopStreaming}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
                  title="Stop"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={sendMessage}
                  disabled={!inputText.trim()}
                  title="Send message"
                  className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
});

Chatbot.displayName = 'Chatbot';

export default Chatbot;
