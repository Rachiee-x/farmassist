import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Cloud, Sun, CloudRain, Thermometer, Wind, Droplets, Lightbulb } from 'lucide-react';
import { api, WeatherData } from '../services/api';
import { formatText } from '../utils/textFormatter';

const Weather: React.FC = () => {
  const { t, language } = useLanguage();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [translatedAdvice, setTranslatedAdvice] = useState<string | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);

  // Auto-translate dynamic advice when language switches to Malayalam
  React.useEffect(() => {
    const autoTranslate = async () => {
      if (!weather) return;
      if (language !== 'ml') {
        setTranslatedAdvice(null);
        return;
      }

      setIsTranslating(true);
      try {
        const apiKey = localStorage.getItem('OPENAI_API_KEY') || process.env.VITE_OPENAI_API_KEY;
        if (!apiKey) {
          // No server/key available — keep translatedAdvice null so UI shows original and user can press translate
          setTranslatedAdvice(t('translateError'));
          setIsTranslating(false);
          return;
        }

        const resp = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: weather.farmingAdvice, target: 'ml' })
        });

        if (!resp.ok) throw new Error('Translate endpoint missing');
        const data = await resp.json();
        setTranslatedAdvice(data.translated || t('translateError'));
      } catch (err) {
        console.error('Auto-translation failed', err);
        setTranslatedAdvice(t('translateError'));
      } finally {
        setIsTranslating(false);
      }
    };

    autoTranslate();
    // Only when language or weather changes
  }, [language, weather, t]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);
        const weatherData = await api.getWeather('Kerala');
        setWeather(weatherData);
      } catch (err) {
        console.error('Failed to fetch weather:', err);
        setError('Failed to load weather data');
        // Set fallback data
        setWeather({
          temperature: 29,
          humidity: 75,
          windSpeed: 12,
          condition: 'partly-cloudy',
          location: 'Kerala, India',
          farmingAdvice: 'Based on Kerala\'s tropical climate, consider these general farming tips: Monitor soil moisture regularly, use organic fertilizers, and be prepared for seasonal rainfall patterns.'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return <Sun className="h-8 w-8 text-yellow-500" />;
      case 'cloudy':
        return <Cloud className="h-8 w-8 text-gray-500" />;
      case 'rainy':
        return <CloudRain className="h-8 w-8 text-blue-500" />;
      default:
        return <Cloud className="h-8 w-8 text-gray-400" />;
    }
  };

  if (loading) {
    return (
      <section id="weather" className="py-16 bg-white">
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
    <section id="weather" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-green-800 mb-4">
            {t('weatherTitle')}
          </h2>
        </div>

        {error && (
          <div className="max-w-4xl mx-auto mb-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800">{error}</p>
            </div>
          </div>
        )}

        {weather && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 shadow-lg">
              <div className="flex flex-col lg:flex-row items-center justify-between">
                {/* Main Weather Info */}
                <div className="text-center lg:text-left mb-6 lg:mb-0">
                  <div className="flex items-center justify-center lg:justify-start space-x-4 mb-4">
                    {getWeatherIcon(weather.condition)}
                    <span className="text-5xl font-bold text-gray-800">
                      {weather.temperature}°C
                    </span>
                  </div>
                  <p className="text-xl text-gray-700 font-medium">
                    {weather.location}
                  </p>
                  <p className="text-gray-600 capitalize">
                    {weather.condition.replace('-', ' ')}
                  </p>
                </div>

                {/* Weather Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="text-center">
                    <Thermometer className="h-6 w-6 text-red-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">{t('temperatureLabel')}</p>
                    <p className="text-lg font-semibold text-gray-800">{weather.temperature}°C</p>
                  </div>
                  
                  <div className="text-center">
                    <Droplets className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">{t('humidityLabel')}</p>
                    <p className="text-lg font-semibold text-gray-800">{weather.humidity}%</p>
                  </div>
                  
                  <div className="text-center">
                    <Wind className="h-6 w-6 text-gray-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">{t('windSpeedLabel')}</p>
                    <p className="text-lg font-semibold text-gray-800">{weather.windSpeed} km/h</p>
                  </div>
                </div>
              </div>

              {/* AI-Powered Farming Advice */}
              <div className="mt-8 p-6 bg-white rounded-lg border-l-4 border-green-500 shadow-sm">
                <div className="flex items-center space-x-2 mb-4">
                  <Lightbulb className="h-6 w-6 text-green-500" />
                  <h3 className="text-lg font-semibold text-green-800">{t('aiAdviceTitle')}</h3>
                </div>
                <div 
                  className="weather-advice text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ 
                    __html: formatText(weather.farmingAdvice) 
                  }}
                />
                {/* Translate Button & Result */}
                <div className="mt-4 flex items-center space-x-3">
                  <button
                    onClick={async () => {
                      // Attempt to translate using local API
                      setIsTranslating(true);
                      setTranslatedAdvice(null);
                      try {
                        // Prefer a backend translate endpoint if present
                        const apiKey = localStorage.getItem('OPENAI_API_KEY') || process.env.VITE_OPENAI_API_KEY;
                        if (!apiKey) {
                          setTranslatedAdvice(t('translateError'));
                          setIsTranslating(false);
                          return;
                        }

                        const resp = await fetch('/api/translate', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ text: weather.farmingAdvice, target: 'ml' })
                        });

                        if (!resp.ok) throw new Error('Translate endpoint missing');
                        const data = await resp.json();
                        setTranslatedAdvice(data.translated || t('translateError'));
                      } catch (err) {
                        console.error('Translation failed', err);
                        setTranslatedAdvice(t('translateError'));
                      } finally {
                        setIsTranslating(false);
                      }
                    }}
                    className="mt-2 inline-flex items-center px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
                    disabled={isTranslating}
                  >
                    {isTranslating ? t('translating') : t('translateToMalayalam')}
                  </button>

                  {translatedAdvice && (
                    <div className="bg-green-50 p-3 rounded-md text-sm text-gray-800 max-w-prose">
                      <div dangerouslySetInnerHTML={{ __html: translatedAdvice }} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Weather;
