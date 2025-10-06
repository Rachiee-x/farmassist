# FarmAssist - AI-Powered Personal Farming Assistant for Kerala

A modern, responsive web application designed specifically for Kerala farmers, providing AI-powered farming advice, weather information, and government scheme details in both English and Malayalam.

## 🌟 Features

### ✨ Core Functionality
- **AI Chat Assistant**: Real-time conversation with farming experts powered by Google Gemini
- **Smart Search**: Instant search functionality that connects to AI for comprehensive answers
- **Weather Integration**: Live weather data with personalized farming recommendations
- **Government Schemes**: Up-to-date information about agricultural subsidies and support programs
- **Multilingual Support**: Full interface available in English and Malayalam

### 🎯 User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Smooth Navigation**: One-click navigation with smooth scrolling between sections
- **Interactive Elements**: Clickable FAQ items, expandable scheme details, functional buttons
- **Real-time Updates**: Streaming AI responses for immediate feedback
- **Modern UI**: Clean, professional design with intuitive user experience

### 🔧 Technical Features
- **TypeScript**: Full type safety for better development experience
- **React 18**: Latest React features with hooks and context
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Vite**: Fast build tool with hot module replacement
- **API Integration**: Seamless connection to backend services
- **Error Handling**: Graceful fallbacks when services are unavailable

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Backend server running (see backend README)

### Installation

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   Navigate to `http://localhost:5173`

### Backend Setup Required
This frontend requires the backend server to be running. Make sure to:
1. Set up the backend (see `../backend/README.md`)
2. Configure Gemini API key in backend
3. Start backend server on port 4000

## 🎯 How to Use

### 1. **AI Assistant**
- Click the green chat button or "Ask AI Assistant" 
- Type your farming questions in English or Malayalam
- Get real-time streaming responses
- Voice input simulation available

### 2. **Smart Search**
- Use the search bar in the hero section
- Enter farming-related queries
- Automatically opens chat with your question

### 3. **Weather Information**
- View current weather for Kerala
- Get AI-powered farming advice based on conditions
- Temperature, humidity, and wind speed data

### 4. **Government Schemes**
- Browse available schemes for farmers
- Click "Learn More" for detailed information
- Schemes updated with latest AI information

### 5. **FAQ Section**
- Click any FAQ item to get detailed answers
- Common farming questions answered instantly
- "View All FAQs" for comprehensive help

### 6. **Navigation**
- Use header navigation for smooth scrolling
- Language toggle (EN/മലയാളം) in top right
- Mobile-responsive menu for smaller screens

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation with language toggle
│   ├── Hero.tsx        # Main banner with search
│   ├── Weather.tsx     # Weather information
│   ├── GovSchemes.tsx  # Government schemes
│   ├── Features.tsx    # FAQ and features
│   ├── Chatbot.tsx     # AI chat interface
│   └── Footer.tsx      # Footer with about section
├── context/
│   └── LanguageContext.tsx  # i18n support
├── services/
│   └── api.ts          # API integration
├── utils/
│   └── textFormatter.ts     # Format AI responses
└── App.tsx             # Main application
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 API Integration

The frontend connects to three main backend endpoints:

- **Chat API**: `/api/chat` and `/api/chat/stream`
- **Weather API**: `/api/weather?city=Kerala`
- **Schemes API**: `/api/govschemes`

Vite proxy configuration automatically routes `/api/*` to `http://localhost:4000`

## 🎨 Customization

### Adding New Languages
1. Update `LanguageContext.tsx` with new translations
2. Add language option in Header component
3. Update type definitions

### Styling Changes
- Tailwind CSS classes for quick styling
- Custom CSS in `index.css` for global styles
- Component-specific styling in each component

### New Features
- Add new components in `components/` folder
- Update API service in `services/api.ts`
- Add navigation links in Header component

## 🔒 Environment Variables

No environment variables required for frontend. All configuration is handled by the backend.

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy
- Built files in `dist/` folder
- Deploy to any static hosting service
- Ensure backend is deployed and accessible

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🏷️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Styling**: Tailwind CSS + PostCSS
- **Development**: ESLint, Hot reload

## 📞 Support

- **Email**: info@farmassist.kerala.gov.in
- **Phone**: +91-484-123-4567
- **Kisan Helpline**: 1800-180-1551

---

**Built with ❤️ for Kerala Farmers** 