import React, { useState, useRef } from 'react';
import { useLanguage } from './context/LanguageContext';

const CropDiseaseDetector = () => {
    const { t, language } = useLanguage();

    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [status, setStatus] = useState('Awaiting Image Upload');
    const [result, setResult] = useState(null);
    const [remedy, setRemedy] = useState('');
    const [isRemedyLoading, setIsRemedyLoading] = useState(false);
    const [imageBase64, setImageBase64] = useState(null);

    const fileInputRef = useRef(null);

    // --- Handle Image Upload ---
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setRemedy('');
        setResult(null);
        setStatus(t('processing'));
        setIsRemedyLoading(true);

        const reader = new FileReader();
        reader.onload = async (e) => {
            const base64Image = e.target.result;
            setImagePreviewUrl(base64Image);
            setImageBase64(base64Image);
            await sendToBackend(base64Image);
        };
        reader.readAsDataURL(file);
    };

    // --- Send Image to Backend ---
    const sendToBackend = async (base64Image) => {
        try {
            const payload = {
                lang: language === 'ml' ? 'ml' : 'en',
                imageBase64: base64Image.split(',')[1] || base64Image, // strip data prefix
            };

            const res = await fetch('https://farmassist-0c78.onrender.com/api/remedy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                console.error('Backend returned non-OK status:', res.status);
                setStatus('Error: Unable to process image');
                setRemedy(t('remedy_default_error'));
                setIsRemedyLoading(false);
                return;
            }

            const data = await res.json();

            // Expecting response shape: { diseaseName, confidence, remedy }
            if (data?.diseaseName) {
                setResult({
                    className: data.diseaseName,
                    confidence: data.confidence || null,
                });
            }

            if (data?.remedy) {
                setRemedy(data.remedy);
            } else {
                setRemedy(t('remedy_default_error'));
            }

            setStatus(t('modelReady'));
        } catch (err) {
            console.error('Error communicating with backend:', err);
            setStatus('Error during analysis.');
            setRemedy(t('remedy_default_error'));
        } finally {
            setIsRemedyLoading(false);
        }
    };

    // --- UI Helper ---
    const getConfidenceDisplay = (conf) => {
        if (!conf) return '';
        return `${Number(conf).toFixed(2)}%`;
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-sans">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        body { font-family: 'Inter', sans-serif; }
      `}</style>

            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-green-700 mb-2">
                        {t('detectorTitle')}
                    </h1>
                    <p className="text-gray-600 text-lg">{t('detectorSubtitle')}</p>
                </header>

                {/* Upload Section */}
                <div className="bg-white rounded-xl shadow-2xl p-6 mb-8 border-t-4 border-green-500">
                    <div className="text-center mb-6">
                        <p className={`text-xl font-semibold text-blue-600`}>
                            {status}
                        </p>
                    </div>

                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        className="hidden"
                    />

                    <div className="flex justify-center">
                        <button
                            onClick={() => fileInputRef.current.click()}
                            className={`px-8 py-3 rounded-full text-white font-bold transition duration-300 transform hover:scale-105 shadow-lg bg-green-600 hover:bg-green-700`}
                        >
                            {t('uploadLeaf')}
                        </button>
                    </div>
                </div>

                {/* Results Section */}
                {imagePreviewUrl && (
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Image Preview */}
                        <div className="bg-white p-4 rounded-xl shadow-xl">
                            <h2 className="text-2xl font-bold text-gray-700 mb-4 border-b pb-2">
                                Image for Analysis
                            </h2>
                            <div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                                <img
                                    src={imagePreviewUrl}
                                    alt="Uploaded Leaf Preview"
                                    className="max-w-full max-h-full object-contain rounded-lg"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://placehold.co/400x400/FF5733/FFFFFF?text=Image+Load+Error';
                                    }}
                                />
                            </div>
                        </div>

                        {/* Diagnosis Result */}
                        <div className="bg-white p-4 rounded-xl shadow-xl">
                            <h2 className="text-2xl font-bold text-gray-700 mb-4 border-b pb-2">
                                Diagnosis & Remedy
                            </h2>

                            {isRemedyLoading && (
                                <div className="text-center py-10">
                                    <div className="w-8 h-8 border-4 border-green-500 border-t-transparent border-solid rounded-full animate-spin mx-auto mb-4"></div>
                                    <p className="text-gray-500">{t('processing')}</p>
                                </div>
                            )}

                            {!isRemedyLoading && (result || remedy) && (
                                <div className="space-y-4">
                                    {result && (
                                        <div className="p-4 rounded-lg bg-green-50 border-l-4 border-green-500">
                                            <p className="text-lg font-medium text-gray-800">
                                                <strong>Prediction:</strong>{' '}
                                                <span className="font-extrabold text-2xl text-green-700">
                                                    {result.className}
                                                </span>
                                            </p>
                                            {result.confidence && (
                                                <p className="text-md text-gray-600">
                                                    <strong>Confidence:</strong>{' '}
                                                    <span className="font-bold text-blue-600">
                                                        {getConfidenceDisplay(result.confidence)}
                                                    </span>
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    <h3 className="text-xl font-semibold text-gray-700 pt-4">Actionable Advice:</h3>
                                    <div
                                        className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500 shadow-inner"
                                    >
                                        <p
                                            className="text-gray-800 leading-relaxed whitespace-pre-wrap"
                                            dangerouslySetInnerHTML={{
                                                __html: remedy.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                                            }}
                                        />
                                    </div>

                                </div>
                            )}

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CropDiseaseDetector;
