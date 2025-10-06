"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const weather_1 = __importDefault(require("./routes/weather"));
const govschemes_1 = __importDefault(require("./routes/govschemes"));
const chat_1 = __importDefault(require("./routes/chat"));
const genai_1 = require("@google/genai");
dotenv_1.default.config({ path: __dirname + '/.env' });
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// --- Helper Functions ---
function errorResponse(res, status, error, details) {
    return res.status(status).json(details ? { error, details } : { error });
}
function missingField(res, field) {
    return errorResponse(res, 400, `Missing ${field} in request body`, undefined);
}
const GEMINI_API_KEY = "AIzaSyDSsb4M93pBObCIZe7MSs81fQqBiC8CCJQ";
const ai = new genai_1.GoogleGenAI({ apiKey: GEMINI_API_KEY });
if (!GEMINI_API_KEY) {
    console.warn('Warning: GEMINI_API_KEY not set. /api/chat will not work.');
}
// prefix API
app.use('/api/weather', weather_1.default);
app.use('/api/govschemes', govschemes_1.default);
app.use('/api/chat', chat_1.default);
app.post('/api/remedy', async (req, res) => {
    console.log('Received /api/remedy request:', req.body);
    // 1. Destructure all necessary fields, including the new imageBase64
    const { diseaseName, imageBase64, lang } = req.body || {};
    // Assuming helper functions and GEMINI_API_KEY exist in scope
    if (!GEMINI_API_KEY) {
        return errorResponse(res, 400, 'Missing GEMINI_API_KEY in server environment', undefined);
    }
    // 2. Updated Validation: Require at least a disease name OR an image
    if (!diseaseName && !imageBase64) {
        return missingField(res, 'diseaseName or imageBase64');
    }
    try {
        const isMalayalam = lang === 'ml';
        // 3. Define the System Instruction (Stays outside 'contents' for standard usage)
        const systemPrompt = isMalayalam
            ? 'You are an expert agricultural advisor who replies ONLY in Malayalam. Provide concise, practical remedies and prevention steps for crop diseases relevant to Indian farmers.'
            : 'You are an expert agricultural advisor. Provide concise, practical remedies and prevention steps for crop diseases relevant to Indian farmers.';
        // 4. Construct the dynamic User Prompt based on inputs
        let userPrompt;
        if (imageBase64) {
            // Prompt for image identification and remedy
            userPrompt = isMalayalam
                ? `ചിത്രത്തിൽ കാണിച്ചിരിക്കുന്ന കൃഷിയിലെ രോഗം ഏതാണെന്ന് തിരിച്ചറിഞ്ഞ്, അതിനുള്ള ചികിത്സയും പ്രതിവിധികളും മലയാളത്തിൽ സംക്ഷിപ്തമായി നൽകുക.`
                : `Identify the crop disease shown in the attached image. Then, provide a concise remedy and prevention steps for this identified disease. Assume the farmer is in India.`;
            // If a disease name is also provided, use it as a hint for the model
            if (diseaseName) {
                userPrompt += isMalayalam
                    ? ` (സൂചന: രോഗം ${diseaseName} ആയിരിക്കാം.)`
                    : ` (Hint: The suspected disease is ${diseaseName}.)`;
            }
        }
        else {
            // Original prompt for known disease name
            userPrompt = isMalayalam
                ? `ദയവായി ${diseaseName} നുള്ള ചികിത്സയും പ്രതിവിധികളും മലയാളത്തിൽ സംക്ഷിപ്തമായി നൽകുക.`
                : `Provide a concise remedy and prevention steps for: ${diseaseName}. Assume the farmer is in India.`;
        }
        // 5. Build the multimodal 'parts' array
        const userParts = [];
        // If image exists, prepend it to the parts array
        if (imageBase64) {
            // NOTE: We assume 'image/jpeg' here, but it's best practice to determine the actual MIME type.
            userParts.push({
                inlineData: {
                    mimeType: 'image/jpeg',
                    data: imageBase64,
                },
            });
        }
        // Always add the generated text prompt as the last part
        userParts.push({ text: userPrompt });
        // 6. Generate content with Gemini, using the systemInstruction configuration
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            // Use the dynamically generated contents array for the user message
            contents: [
                { role: 'system', parts: [{ text: systemPrompt }] },
                { role: 'user', parts: userParts },
            ],
        });
        // 7. Extract text safely
        const remedy = response.text ||
            (isMalayalam ? 'പരിഹാരം കണ്ടെത്താനായില്ല.' : 'No remedy found.');
        res.json({ remedy });
    }
    catch (err) {
        console.error('Remedy generation (Gemini) failed', err);
        return errorResponse(res, 500, 'Internal server error', undefined);
    }
});
app.get('/', (req, res) => {
    res.json({ ok: true, message: 'Project Bolt backend is running' });
});
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
