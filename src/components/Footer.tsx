import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Phone, Mail, ExternalLink, Sprout, Users, Award, Target } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <>
      {/* About Section */}
      <section id="about" className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-green-800 mb-4">
              {t('aboutTitle')}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('aboutDescription')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-green-500 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">Our Mission</h3>
              <p className="text-gray-600">
                To revolutionize agriculture in Kerala by providing AI-powered insights, real-time weather data, and comprehensive government scheme information to every farmer.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-500 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">Community First</h3>
              <p className="text-gray-600">
                Built by understanding the unique challenges faced by Kerala farmers, our platform addresses real-world agricultural problems with practical solutions.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-500 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">Innovation</h3>
              <p className="text-gray-600">
                Leveraging advanced AI technology including Google's Gemini model to provide personalized farming advice and support in both English and Malayalam.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-green-800 mb-4">{t('whyChooseTitle')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="font-semibold text-green-700 mb-2">{t('aiPoweredAssistance')}</h4>
                  <p className="text-gray-600">{t('aiAdviceTitle')}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-700 mb-2">{t('realTimeWeather')}</h4>
                  <p className="text-gray-600">{t('realTimeWeather')}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-700 mb-2">{t('governmentSchemes')}</h4>
                  <p className="text-gray-600">{t('governmentSchemes')}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-700 mb-2">{t('multilingualSupport')}</h4>
                  <p className="text-gray-600">{t('multilingualSupport')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-green-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo & Description */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-green-600 p-2 rounded-lg">
                  <Sprout className="h-6 w-6 text-white" />
                </div>
                <span className="font-bold text-xl">FarmAssist</span>
              </div>
              <p className="text-green-200 leading-relaxed">
                Empowering Kerala farmers with AI-powered assistance, weather updates, 
                and government scheme information.
              </p>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="font-semibold text-lg mb-4">{t('contactInfo')}</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-green-300" />
                  <span className="text-green-200">info@farmassist.kerala.gov.in</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-green-300" />
                  <span className="text-green-200">+91-484-123-4567</span>
                </div>
              </div>
            </div>

            {/* Farmer Helplines */}
            <div>
              <h3 className="font-semibold text-lg mb-4">{t('farmerHelplines')}</h3>
              <div className="space-y-3">
                <div className="text-green-200">
                  <p className="font-medium">{t('kisamHelpline')}</p>
                </div>
                <div className="text-green-200">
                  <p className="font-medium">{t('weatherHelpline')}</p>
                </div>
                <div className="text-green-200">
                  <p className="font-medium">Emergency: 108</p>
                </div>
              </div>
            </div>

            {/* Useful Links */}
            <div>
              <h3 className="font-semibold text-lg mb-4">{t('usefulLinks')}</h3>
              <div className="space-y-3">
                <a
                  href="https://kerala.gov.in/agriculture"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-green-200 hover:text-white transition-colors"
                >
                  <span>{t('keralaAgriculture')}</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
                <a
                  href="https://imd.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-green-200 hover:text-white transition-colors"
                >
                  <span>{t('indianMeteorology')}</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
                <a
                  href="https://pmkisan.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-green-200 hover:text-white transition-colors"
                >
                  <span>PM-KISAN Portal</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-green-700 mt-8 pt-8 text-center">
            <p className="text-green-200">
              © 2025 AI-Powered Personal Farming Assistant for Kerala. 
              Developed for the farmers of Kerala with ❤️
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;