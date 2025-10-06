import React, { useState, useEffect, useRef } from 'react';
import { X, FileText, Loader } from 'lucide-react';
import { api } from '../services/api';
import { formatText } from '../utils/textFormatter';

interface Scheme {
  id: string;
  title: string;
  description: string;
}

interface SchemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  scheme: Scheme | null;
}

const SchemeModal: React.FC<SchemeModalProps> = ({ isOpen, onClose, scheme }) => {
  const [details, setDetails] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (isOpen && scheme) {
      fetchSchemeDetails();
    }
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [isOpen, scheme]);

  const fetchSchemeDetails = async () => {
    if (!scheme) return;

    setIsLoading(true);
    setError(null);
    setDetails('');

    try {
      abortControllerRef.current = new AbortController();
      
      let fullResponse = '';
      
      // Use streaming API for real-time response
      for await (const chunk of api.sendMessageStream(
        `Provide comprehensive details about the "${scheme.title}" government scheme for farmers in Kerala. Include:

**Eligibility Criteria:**
- Who can apply
- Required documents
- Land ownership requirements

**Benefits:**
- Financial assistance details
- Subsidy amounts and percentages
- Coverage information

**Application Process:**
- Step-by-step application guide
- Where to apply (Krishi Bhavan, online portals)
- Required documents checklist

**Important Information:**
- Deadlines and timing
- Contact information
- Tips for successful application

Keep the response well-structured with clear sections and bullet points. Focus on practical, actionable information for Kerala farmers.`
      )) {
        if (abortControllerRef.current?.signal.aborted) {
          break;
        }
        
        fullResponse += chunk;
        setDetails(fullResponse);
      }
    } catch (err) {
      console.error('Failed to fetch scheme details:', err);
      setError('Failed to load scheme details. Please try again.');
      
      // Fallback static details
      const fallbackDetails = {
        'scheme1': `**PM-KISAN Scheme Details:**

**Eligibility Criteria:**
• All landholding farmer families across the country
• Families with combined landholding up to 2 hectares
• Must be Indian citizens with valid Aadhaar card

**Benefits:**
• Direct income support of ₹6,000 per year
• Amount transferred in three equal installments of ₹2,000 each
• Money directly credited to farmer's bank account

**Application Process:**
• Visit nearest Common Service Centre (CSC) or Krishi Bhavan
• Apply online at pmkisan.gov.in
• Submit Aadhaar card, land ownership documents, and bank details
• Verification by local authorities

**Important Information:**
• Registration deadline: Ongoing throughout the year
• Helpline: 155261 / 1800115526
• Status check available online with Aadhaar number`,
        
        'scheme2': `**Kerala Farmer Producer Company Support:**

**Eligibility Criteria:**
• Small and marginal farmers in Kerala
• Minimum 10 farmers required to form FPO
• Must register as Farmer Producer Organization

**Benefits:**
• Financial assistance for FPO formation
• Training and capacity building support
• Market linkage facilitation
• Technical assistance for modern farming

**Application Process:**
• Contact local Krishi Bhavan office
• Submit farmer group details and land records
• Complete FPO registration process
• Apply for government support schemes

**Important Information:**
• Contact: Kerala State Planning Board
• Regular training programs conducted
• Focus on collective farming and marketing`,
      };
      
      const fallback = fallbackDetails[scheme.id as keyof typeof fallbackDetails] || 
        'Detailed information about this scheme is currently unavailable. Please contact your local Krishi Bhavan for more information.';
      
      setDetails(fallback);
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleClose = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setDetails('');
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-green-500 text-white p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-lg">
              <FileText className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{scheme?.title}</h2>
              <p className="text-green-100">Government Scheme Details</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            title="Close modal"
            className="p-2 hover:bg-green-600 rounded-lg transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Scheme Description */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-700 leading-relaxed">{scheme?.description}</p>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <Loader className="h-8 w-8 text-green-500 animate-spin" />
              <span className="ml-3 text-gray-600">Loading detailed information...</span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-red-800">{error}</p>
              <button
                onClick={fetchSchemeDetails}
                className="mt-2 text-red-600 hover:text-red-700 font-medium"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Scheme Details */}
          {details && (
            <div className="space-y-4">
              <div 
                className="scheme-details prose prose-green max-w-none"
                dangerouslySetInnerHTML={{ 
                  __html: formatText(details) 
                }}
              />
              
              {/* Streaming indicator */}
              {isLoading && (
                <div className="flex items-center text-green-600">
                  <div className="w-2 h-4 bg-green-500 animate-pulse mr-2"></div>
                  <span className="text-sm">Loading more details...</span>
                </div>
              )}
            </div>
          )}

          {/* Footer Actions */}
          {details && !isLoading && (
            <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
              <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-medium transition-colors">
                Apply Online
              </button>
              <button className="flex-1 border border-green-500 text-green-600 hover:bg-green-50 py-3 px-6 rounded-lg font-medium transition-colors">
                Contact Krishi Bhavan
              </button>
              <button 
                onClick={handleClose}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchemeModal; 