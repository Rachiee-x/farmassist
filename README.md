# FarmAssist Backend

AI-Powered Personal Farming Assistant for Kerala - Backend API

## Features

- **AI Chat Assistant**: Real-time chat with streaming responses using Google Gemini
- **Weather API**: Weather data with AI-powered farming advice
- **Government Schemes**: Dynamic government scheme information
- **CORS Enabled**: Ready for frontend integration

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Copy the example environment file and configure:
```bash
cp .env.example .env
```

Edit `.env` file and add your Gemini API key:
```
GEMINI_API_KEY=your_actual_gemini_api_key_here
PORT=4000
NODE_ENV=development
```

### 3. Get Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key to your `.env` file

### 4. Run the Development Server
```bash
npm run dev
```

The server will start on `http://localhost:4000`

### 5. Build for Production
```bash
npm run build
npm start
```

## API Endpoints

- `GET /` - Health check
- `POST /api/chat` - Non-streaming chat
- `POST /api/chat/stream` - Streaming chat  
- `GET /api/weather?city=Kerala` - Weather with farming advice
- `GET /api/govschemes` - Government schemes

## Features

- ✅ Google Gemini AI integration
- ✅ Streaming responses for real-time chat
- ✅ Weather-based farming advice
- ✅ Government scheme information
- ✅ Fallback responses when AI is unavailable
- ✅ CORS enabled for frontend integration
- ✅ TypeScript support
- ✅ Error handling and logging

## Tech Stack

- Node.js + Express
- TypeScript
- Google Generative AI (Gemini)
- CORS
- dotenv