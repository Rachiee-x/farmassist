"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gemini_client_1 = require("../utils/gemini-client");
const router = (0, express_1.Router)();
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
        // Get AI-powered farming advice based on location
        const farmingAdvice = await (0, gemini_client_1.getWeatherAdvice)(location, mockWeatherData);
        const payload = {
            ...mockWeatherData,
            farmingAdvice: farmingAdvice
        };
        res.json(payload);
    }
    catch (err) {
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
exports.default = router;
