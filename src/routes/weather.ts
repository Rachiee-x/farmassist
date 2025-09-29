import { Router } from 'express';
import { getWeatherAdvice } from '../utils/gemini-client';

const router = Router();

// GET /api/weather?lat=xx&lon=yy&city=Name
router.get('/', async (req, res) => {
  const { lat, lon, city } = req.query;
  const location = city ? String(city) : 'Kerala, India';

  try {
    // Generate mock weather data for demonstration
    const mockWeatherData = {
      temperature: Math.floor(Math.random() * 10) + 25, // 25-35°C
      humidity: Math.floor(Math.random() * 30) + 60, // 60-90%
      windSpeed: Math.floor(Math.random() * 15) + 5, // 5-20 km/h
      condition: ['sunny', 'partly-cloudy', 'cloudy', 'rainy'][Math.floor(Math.random() * 4)],
      location: location
    };

    // Try to get AI-powered farming advice, but fallback if it fails
    let farmingAdvice: string;
    try {
      farmingAdvice = await getWeatherAdvice(location, mockWeatherData);
    } catch (error) {
      console.error('Failed to get AI weather advice, using fallback:', error);
      // Fallback farming advice based on weather conditions
      const fallbackAdvice = [
        `With ${mockWeatherData.temperature}°C temperature and ${mockWeatherData.humidity}% humidity, it's a good time for ${mockWeatherData.condition === 'rainy' ? 'indoor activities and planning' : 'outdoor farming activities'}.`,
        `Current conditions are suitable for ${mockWeatherData.condition === 'sunny' ? 'planting and harvesting' : mockWeatherData.condition === 'rainy' ? 'soil preparation and planning' : 'general farm maintenance'}.`,
        `Based on Kerala's tropical climate, monitor soil moisture regularly and use organic fertilizers. The current humidity level of ${mockWeatherData.humidity}% suggests ${mockWeatherData.humidity > 80 ? 'high risk of fungal diseases - consider preventive measures' : 'good conditions for plant growth'}.`
      ];
      farmingAdvice = fallbackAdvice[Math.floor(Math.random() * fallbackAdvice.length)];
    }

    const payload = {
      ...mockWeatherData,
      farmingAdvice: farmingAdvice
    };

    res.json(payload);
  } catch (err: any) {
    console.error('Weather service error', err?.message || err);
    
    // Fallback response
    const fallbackData = {
      temperature: 29,
      humidity: 75,
      windSpeed: 12,
      condition: 'partly-cloudy',
      location: location,
      farmingAdvice: 'Based on Kerala\'s tropical climate, consider these general farming tips: Monitor soil moisture regularly, use organic fertilizers, and be prepared for seasonal rainfall patterns. For specific advice, consult your local Krishi Bhavan.'
    };
    
    res.json(fallbackData);
  }
});

export default router;
