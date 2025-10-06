import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FileText, ExternalLink } from 'lucide-react';
import { api, GovScheme } from '../services/api';
import SchemeModal from './SchemeModal';

interface GovSchemesProps {
  onViewAllSchemes?: () => void;
}

const GovSchemes: React.FC<GovSchemesProps> = ({ onViewAllSchemes }) => {
  const { t } = useLanguage();
  const [schemes, setSchemes] = useState<GovScheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedScheme, setSelectedScheme] = useState<GovScheme | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        setLoading(true);
        setError(null);
        const schemesData = await api.getGovSchemes();
        setSchemes(schemesData);
      } catch (err) {
        console.error('Failed to fetch government schemes:', err);
        setError('Failed to load government schemes');
        // Set fallback data
        setSchemes([
          {
            id: 'scheme1',
            title: 'PM-KISAN Scheme',
            description: 'Direct income support of ₹6,000 per year to eligible farmer families across India. Provides financial assistance in three equal installments of ₹2,000 each.'
          },
          {
            id: 'scheme2',
            title: 'Kerala Farmer Producer Company Support',
            description: 'State initiative to strengthen farmer producer organizations (FPOs) with financial assistance, training, and market linkage support for collective farming.'
          },
          {
            id: 'scheme3',
            title: 'Crop Insurance Scheme (PMFBY)',
            description: 'Comprehensive risk solution providing insurance coverage against crop loss due to natural disasters, pests, and diseases with premium support.'
          },
          {
            id: 'scheme4',
            title: 'Soil Health Card Scheme',
            description: 'Free soil testing service providing farmers with soil health cards containing crop-wise recommendations on nutrients and fertilizers required for their farm.'
          },
          {
            id: 'scheme5',
            title: 'Farm Equipment Subsidy',
            description: 'Subsidies up to 50% for purchasing modern farm equipment including tractors, harvesters, and irrigation systems to improve farming efficiency.'
          },
          {
            id: 'scheme6',
            title: 'Organic Farming Promotion',
            description: 'Support for transition to organic farming with subsidies for organic inputs, certification assistance, and premium pricing through dedicated marketing channels.'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchSchemes();
  }, []);

  const handleLearnMore = (scheme: GovScheme) => {
    setSelectedScheme(scheme);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedScheme(null);
  };

  const handleViewAllSchemes = () => {
    if (onViewAllSchemes) {
      onViewAllSchemes();
    } else {
      // Fallback: show information about comprehensive schemes portal
      alert('This would typically open a comprehensive schemes portal or connect to the AI assistant for detailed scheme information.');
    }
  };

  if (loading) {
    return (
      <section id="schemes" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">{t('loading')}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="schemes" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-green-800 mb-4">
              {t('govSchemesTitle')}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('schemesDescription')}
            </p>
          </div>

          {error && (
            <div className="max-w-4xl mx-auto mb-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800">{error}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {schemes.map((scheme) => (
              <div
                key={scheme.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <FileText className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {scheme.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {scheme.description}
                  </p>
                  
                  <button 
                    onClick={() => handleLearnMore(scheme)}
                    className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium transition-colors"
                  >
                    <span>{t('learnMore')}</span>
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={handleViewAllSchemes}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              {t('viewAllSchemes')}
            </button>
          </div>
        </div>
      </section>

      {/* Scheme Details Modal */}
      <SchemeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        scheme={selectedScheme}
      />
    </>
  );
};

export default GovSchemes;
