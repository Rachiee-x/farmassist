import React, { useState, useRef } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Weather from './components/Weather';
import GovSchemes from './components/GovSchemes';
import Features from './components/Features';
import Chatbot, { ChatbotRef } from './components/Chatbot';
import Footer from './components/Footer';
import CropDiseaseDetector from './CropDiseaseDetectionApp';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const chatbotRef = useRef<ChatbotRef>(null);

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  const handleSearchQuery = (query: string) => {
    setIsChatOpen(true);
    // Pass the search query to the chatbot
    if (chatbotRef.current && chatbotRef.current.sendSearchQuery) {
      chatbotRef.current.sendSearchQuery(query);
    }
  };

  const handleFAQClick = (question: string) => {
    setIsChatOpen(true);
    // Pass the FAQ question to the chatbot
    if (chatbotRef.current && chatbotRef.current.sendSearchQuery) {
      chatbotRef.current.sendSearchQuery(question);
    }
  };

  const handleViewAllSchemes = () => {
    setIsChatOpen(true);
    // Send comprehensive schemes query to chatbot
    if (chatbotRef.current && chatbotRef.current.sendSearchQuery) {
      chatbotRef.current.sendSearchQuery('Show me all government schemes available for farmers in Kerala with detailed information about eligibility, benefits, and application process');
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Hero onOpenChat={handleOpenChat} onSearchQuery={handleSearchQuery} />
          <Weather />
          <GovSchemes onViewAllSchemes={handleViewAllSchemes} />
          <Features onFAQClick={handleFAQClick} />
          {/* Insert Crop Disease Detector component so it appears in the UI */}
          <section className="px-4 py-8">
            <CropDiseaseDetector />
          </section>
        </main>
        <Footer />
        <Chatbot ref={chatbotRef} isOpenByDefault={isChatOpen} />
      </div>
    </LanguageProvider>
  );
}

export default App;
