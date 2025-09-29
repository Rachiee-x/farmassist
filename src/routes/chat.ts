import { Router } from 'express';
import { callGemini, callGeminiStream } from '../utils/gemini-client';

const router = Router();

// Non-streaming endpoint for fallback
router.post('/', async (req, res) => {
  const { message } = req.body as { message?: string };

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    const canned = [
      'For small-scale irrigation, consider drip systems — they save water and are cost-effective.',
      'You can apply for equipment subsidies through your local Krishi Bhavan or the state agriculture portal.',
      'Rotate your crops every season to reduce pests and maintain soil nutrients.'
    ];
    const example = canned[Math.floor(Math.random() * canned.length)];
    return res.json({ reply: example });
  }

  try {
    const reply = await callGemini(message);
    res.json({ reply });
  } catch (err: any) {
    console.error('Gemini call error', err.message || err);
    
    // Fallback responses based on common farming questions
    const fallbackResponses = [
      'For rice cultivation in Kerala, the best time is during the monsoon season (June-July). Ensure proper water management and use certified seeds.',
      'For coconut farming, maintain proper spacing (7.5m x 7.5m), apply organic fertilizers, and control pests like rhinoceros beetle.',
      'Spice crops like pepper, cardamom, and ginger thrive in Kerala\'s climate. Use organic farming methods and proper shade management.',
      'For soil health, get your soil tested at Krishi Bhavan and follow their recommendations for fertilizers and pH correction.',
      'Crop rotation helps maintain soil fertility. Consider rotating rice with pulses or vegetables in different seasons.',
      'For pest control, use integrated pest management (IPM) techniques including biological control and organic pesticides.',
      'Water conservation is crucial. Use drip irrigation for vegetables and mulching to retain soil moisture.',
      'For government schemes, visit your local Krishi Bhavan or check the Kerala Agriculture Department website for current programs.'
    ];
    
    const fallbackReply = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    res.json({ reply: fallbackReply });
  }
});

// Streaming endpoint
router.post('/stream', async (req, res) => {
  const { message } = req.body as { message?: string };

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message required' });
  }

  // Set headers for streaming
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    const canned = [
      'For small-scale irrigation, consider drip systems — they save water and are cost-effective.',
      'You can apply for equipment subsidies through your local Krishi Bhavan or the state agriculture portal.',
      'Rotate your crops every season to reduce pests and maintain soil nutrients.'
    ];
    const example = canned[Math.floor(Math.random() * canned.length)];
    return res.send(example);
  }

  try {
    const stream = callGeminiStream(message);
    
    for await (const chunk of stream) {
      res.write(chunk);
    }
    
    res.end();
  } catch (err: any) {
    console.error('Gemini streaming error', err.message || err);
    
    // Fallback responses based on common farming questions
    const fallbackResponses = [
      'For rice cultivation in Kerala, the best time is during the monsoon season (June-July). Ensure proper water management and use certified seeds.',
      'For coconut farming, maintain proper spacing (7.5m x 7.5m), apply organic fertilizers, and control pests like rhinoceros beetle.',
      'Spice crops like pepper, cardamom, and ginger thrive in Kerala\'s climate. Use organic farming methods and proper shade management.',
      'For soil health, get your soil tested at Krishi Bhavan and follow their recommendations for fertilizers and pH correction.',
      'Crop rotation helps maintain soil fertility. Consider rotating rice with pulses or vegetables in different seasons.',
      'For pest control, use integrated pest management (IPM) techniques including biological control and organic pesticides.',
      'Water conservation is crucial. Use drip irrigation for vegetables and mulching to retain soil moisture.',
      'For government schemes, visit your local Krishi Bhavan or check the Kerala Agriculture Department website for current programs.'
    ];
    
    const fallbackReply = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    res.send(fallbackReply);
  }
});

export default router;
