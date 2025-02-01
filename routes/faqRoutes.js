const express = require('express');
const faqController = require('../controllers/faqController');
const router = express.Router();

// Get FAQs
router.get('/', faqController.getFAQs);

module.exports = router;
