"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gemini_client_1 = require("../utils/gemini-client");
const router = (0, express_1.Router)();
router.post('/', async (req, res) => {
    const { message } = req.body;
    if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message required' });
    }
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        const canned = [
            'For small-scale irrigation, consider drip systems — they save water and are cost-effective.',
            'You can apply for equipment subsidies through your local Krishi Bhavan or the state agriculure portal.',
            'Rotate your crops every season to reduce pests and maintain soil nutrients.'
        ];
        const example = canned[Math.floor(Math.random() * canned.length)];
        return res.json({ reply: example });
    }
    try {
        const reply = await (0, gemini_client_1.callGemini)(message);
        res.json({ reply });
    }
    catch (err) {
        console.error('Gemini call error', err.message || err);
        res.status(500).json({ error: 'AI service error' });
    }
});
exports.default = router;
