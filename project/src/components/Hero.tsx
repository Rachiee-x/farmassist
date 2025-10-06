import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MessageCircle, Search } from 'lucide-react';

interface HeroProps {
  onOpenChat?: () => void;
  onSearchQuery?: (query: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenChat, onSearchQuery }) => {
  const { t } = useLanguage();
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAskAI = () => {
    setIsButtonClicked(true);
    if (onOpenChat) {
      onOpenChat();
    }
    // Reset button state after animation
    setTimeout(() => setIsButtonClicked(false), 200);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearchQuery) {
      onSearchQuery(searchQuery.trim());
      setSearchQuery(''); // Clear search after submission
    }
  };

  const handleSearchInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <section id="home" className="bg-gradient-to-br from-green-50 to-green-100 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-green-800 mb-6">
            {t('heroTitle')}
          </h1>
          <p className="text-xl sm:text-2xl text-green-700 mb-4 font-medium">
            {t('heroSubtitle')}
          </p>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('heroDescription')}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={handleAskAI}
              className={`bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold flex items-center space-x-2 transition-all shadow-lg ${
                isButtonClicked ? 'scale-95' : 'hover:scale-105'
              }`}
            >
              <MessageCircle className="h-6 w-6" />
              <span>{t('askAiAssistant')}</span>
            </button>
            
              <form onSubmit={handleSearch} className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearchInputKeyPress}
                placeholder={t('searchPlaceholder')}
                className="w-full pl-10 pr-12 py-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              />
              {searchQuery && (
                <button
                  type="submit"
                  title="Search"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-500 hover:bg-green-600 text-white p-2 rounded-md transition-colors"
                >
                  <Search className="h-4 w-4" />
                </button>
              )}
            </form>
          </div>
        </div>
        
        {/* Hero Image/Illustration */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-white p-8 rounded-2xl shadow-lg">
            <div className="text-8xl">🌾</div>
            <div className="flex justify-center space-x-4 mt-4">
              <span className="text-3xl">🌱</span>
              <span className="text-3xl">🚜</span>
              <span className="text-3xl">🌧️</span>
              <span className="text-3xl">💚</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
