"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    try {
        // Use reliable fallback schemes - AI integration available via "Learn More" buttons
        const schemes = getFallbackSchemes();
        res.json(schemes);
    }
    catch (error) {
        console.error('Error fetching government schemes:', error);
        res.json(getFallbackSchemes());
    }
});
function getFallbackSchemes() {
    return [
        {
            id: 'scheme1',
            title: 'PM-KISAN Scheme',
            description: 'Direct income support of ₹6,000 per year to eligible farmer families across India. Provides financial assistance in three equal installments of ₹2,000 each.'
        },
        {
            id: 'scheme2',
            title: 'Kerala Farmer Producer Company Support',
            description: 'State initiative to strengthen farmer producer organizations (FPOs) with financial assistance, training, and market linkage support for collective farming.'
        },
        {
            id: 'scheme3',
            title: 'Crop Insurance Scheme (PMFBY)',
            description: 'Comprehensive risk solution providing insurance coverage against crop loss due to natural disasters, pests, and diseases with premium support.'
        },
        {
            id: 'scheme4',
            title: 'Soil Health Card Scheme',
            description: 'Free soil testing service providing farmers with soil health cards containing crop-wise recommendations on nutrients and fertilizers required for their farm.'
        },
        {
            id: 'scheme5',
            title: 'Farm Equipment Subsidy',
            description: 'Subsidies up to 50% for purchasing modern farm equipment including tractors, harvesters, and irrigation systems to improve farming efficiency.'
        },
        {
            id: 'scheme6',
            title: 'Organic Farming Promotion',
            description: 'Support for transition to organic farming with subsidies for organic inputs, certification assistance, and premium pricing through dedicated marketing channels.'
        }
    ];
}
exports.default = router;
