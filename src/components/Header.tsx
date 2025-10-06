import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Menu, X, Sprout } from 'lucide-react';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false); // Close mobile menu after navigation
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollToSection('home')}>
            <div className="bg-green-500 p-2 rounded-lg">
              <Sprout className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl text-green-800">FarmAssist</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              {t('home')}
            </button>
            <button 
              onClick={() => scrollToSection('schemes')}
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              {t('govSchemes')}
            </button>
            <button 
              onClick={() => scrollToSection('weather')}
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              {t('weather')}
            </button>
            <button 
              onClick={() => scrollToSection('assistant')}
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              {t('aiAssistant')}
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              {t('about')}
            </button>
          </nav>

          {/* Language Selector & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  language === 'en' 
                    ? 'bg-green-500 text-white' 
                    : 'text-gray-600 hover:text-green-600'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ml')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  language === 'ml' 
                    ? 'bg-green-500 text-white' 
                    : 'text-gray-600 hover:text-green-600'
                }`}
              >
                മലയാളം
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <button 
                onClick={() => scrollToSection('home')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-green-600 font-medium"
              >
                {t('home')}
              </button>
              <button 
                onClick={() => scrollToSection('schemes')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-green-600 font-medium"
              >
                {t('govSchemes')}
              </button>
              <button 
                onClick={() => scrollToSection('weather')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-green-600 font-medium"
              >
                {t('weather')}
              </button>
              <button 
                onClick={() => scrollToSection('assistant')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-green-600 font-medium"
              >
                {t('aiAssistant')}
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-green-600 font-medium"
              >
                {t('about')}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;