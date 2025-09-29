"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callGemini = callGemini;
exports.getWeatherAdvice = getWeatherAdvice;
const generative_ai_1 = require("@google/generative-ai");
const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
async function callGemini(userMessage) {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        const prompt = `You are a friendly agricultural assistant focused on Kerala farming. Provide helpful, accurate, and concise responses about farming practices, crop management, weather advice, and agricultural schemes in Kerala, India. Keep responses under 200 words and be practical and actionable.

User question: ${userMessage}`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return text.trim();
    }
    catch (error) {
        console.error('Gemini API error:', error);
        throw new Error('Failed to get response from AI service');
    }
}
async function getWeatherAdvice(location, weatherData) {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        const prompt = `You are an agricultural weather advisor for Kerala, India. Based on the location "${location}" and any available weather data, provide practical farming advice including:
- Best crops to plant in current conditions
- Irrigation recommendations
- Pest and disease prevention tips
- Seasonal farming activities
- Weather-related precautions

Keep the advice specific to Kerala's climate and farming practices. If no specific weather data is provided, give general seasonal advice for Kerala.

Location: ${location}
Weather data: ${weatherData ? JSON.stringify(weatherData) : 'Not provided'}

Provide a concise, actionable response under 150 words.`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return text.trim();
    }
    catch (error) {
        console.error('Gemini weather advice error:', error);
        return `Based on Kerala's tropical climate, consider these general farming tips: Monitor soil moisture regularly, use organic fertilizers, and be prepared for seasonal rainfall patterns. For specific advice, consult your local Krishi Bhavan.`;
    }
}
