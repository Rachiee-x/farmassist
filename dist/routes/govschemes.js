"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    const schemes = [
        {
            id: 'scheme1',
            title: 'Farm Equipment Subsidy',
            description: 'Subsidies to buy small-scale farm equipment for registered farmers.'
        },
        {
            id: 'scheme2',
            title: 'Crop Insurance Support',
            description: 'Low-cost crop insurance plans supported by the state.'
        },
        {
            id: 'scheme3',
            title: 'Soil Health Card',
            description: 'Free testing of soil samples and personalised fertiliser advice.'
        }
    ];
    res.json(schemes);
});
exports.default = router;
