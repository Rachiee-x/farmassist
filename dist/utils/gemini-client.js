"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callGemini = callGemini;
exports.callGeminiStream = callGeminiStream;
exports.getWeatherAdvice = getWeatherAdvice;
const generative_ai_1 = require("@google/generative-ai");
const GEMINI_API_KEY = "AIzaSyDSsb4M93pBObCIZe7MSs81fQqBiC8CCJQ";
if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY environment variable is not set');
}
const apiKey = GEMINI_API_KEY;
console.log('Gemini API Key loaded:', apiKey ? 'Yes' : 'No');
console.log('API Key length:', apiKey ? apiKey.length : 0);
const genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
async function callGemini(userMessage) {
    try {
        // Use the Gemini Pro model
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
        const prompt = `You are a friendly agricultural assistant focused on Kerala farming. Provide helpful, accurate, and concise responses about farming practices, crop management, weather advice, and agricultural schemes in Kerala, India. Keep responses under 200 words and be practical and actionable.

IMPORTANT FORMATTING RULES:
- Use **bold text** for important terms and categories
- Use bullet points with * for lists (each item on a new line)
- Use numbered lists with 1. 2. 3. for sequential steps
- Use colons (:) for category headers
- Example format:
**Category Name:**
* Item 1
* Item 2
* Item 3

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
async function* callGeminiStream(userMessage) {
    try {
        // Use the Gemini Pro model
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
        const prompt = `You are a friendly agricultural assistant focused on Kerala farming. Provide helpful, accurate, and concise responses about farming practices, crop management, weather advice, and agricultural schemes in Kerala, India. Keep responses under 200 words and be practical and actionable.

IMPORTANT FORMATTING RULES:
- Use **bold text** for important terms and categories
- Use bullet points with * for lists (each item on a new line)
- Use numbered lists with 1. 2. 3. for sequential steps
- Use colons (:) for category headers
- Example format:
**Category Name:**
* Item 1
* Item 2
* Item 3

User question: ${userMessage}`;
        const result = await model.generateContentStream(prompt);
        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            if (chunkText) {
                yield chunkText;
            }
        }
    }
    catch (error) {
        console.error('Gemini streaming error:', error);
        yield 'Sorry, I encountered an error while processing your request. Please try again.';
    }
}
async function getWeatherAdvice(location, weatherData) {
    try {
        // Use the Gemini Pro model
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
        const prompt = `You are an agricultural weather advisor for Kerala, India. Based on the location "${location}" and any available weather data, provide practical farming advice including:
- Best crops to plant in current conditions
- Irrigation recommendations
- Pest and disease prevention tips
- Seasonal farming activities
- Weather-related precautions

Keep the advice specific to Kerala's climate and farming practices. If no specific weather data is provided, give general seasonal advice for Kerala.

IMPORTANT FORMATTING RULES:
- Use **bold text** for important terms and categories
- Use bullet points with * for lists (each item on a new line)
- Use numbered lists with 1. 2. 3. for sequential steps
- Use colons (:) for category headers
- Example format:
**Category Name:**
* Item 1
* Item 2
* Item 3

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
