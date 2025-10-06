import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Brain, HelpCircle, Leaf, TrendingUp } from 'lucide-react';

interface FeaturesProps {
  onFAQClick?: (question: string) => void;
}

const Features: React.FC<FeaturesProps> = ({ onFAQClick }) => {
  const { t } = useLanguage();

  const faqs = [
    t('faq1'),
    t('faq2'),
    t('faq3'),
    t('faq4')
  ];

  const handleFAQClick = (faq: string) => {
    if (onFAQClick) {
      onFAQClick(faq);
    }
  };

  const handleViewAllFAQs = () => {
    // This would typically open a dedicated FAQ section or modal
    if (onFAQClick) {
      onFAQClick('Show me all frequently asked questions about farming in Kerala');
    }
  };

  return (
    <section id="assistant" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-green-800 mb-4">
            {t('featuresTitle')}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* AI Suggestions */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-6">
              <div className="bg-green-500 p-3 rounded-lg mr-4">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-green-800">
                {t('aiSuggestionsTitle')}
              </h3>
            </div>
            
            <p className="text-gray-700 mb-6 leading-relaxed text-lg">
              {t('aiSuggestionsDesc')}
            </p>

            {/* Sample AI Features */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 bg-white p-3 rounded-lg">
                <Leaf className="h-5 w-5 text-green-600" />
                <span className="text-gray-700">{t('featureRotation')}</span>
              </div>
              <div className="flex items-center space-x-3 bg-white p-3 rounded-lg">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700">{t('featureYield')}</span>
              </div>
              <div className="flex items-center space-x-3 bg-white p-3 rounded-lg">
                <Brain className="h-5 w-5 text-purple-600" />
                <span className="text-gray-700">{t('featurePest')}</span>
              </div>
            </div>
          </div>

          {/* Most Asked Questions */}
          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-6">
              <div className="bg-orange-500 p-3 rounded-lg mr-4">
                <HelpCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-orange-800">
                {t('faqTitle')}
              </h3>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <button
                  key={index}
                  onClick={() => handleFAQClick(faq)}
                  className="w-full bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer border-l-4 border-orange-400 hover:border-orange-500 transform hover:scale-[1.02] text-left"
                >
                  <div className="flex items-start space-x-3">
                    <span className="bg-orange-100 text-orange-600 text-sm font-bold px-2 py-1 rounded-full min-w-[24px] text-center">
                      {index + 1}
                    </span>
                    <p className="text-gray-700 font-medium">
                      {faq}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            <button 
              onClick={handleViewAllFAQs}
              className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition-colors"
            >
              {t('viewAllFAQs')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;