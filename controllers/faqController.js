const client = require('../config/redis');
const FAQ = require('../models/FAQ');

exports.getFAQs = async (req, res) => {
  const lang = req.query.lang || 'en';
  const cacheKey = `faqs_${lang}`;

  console.log(`Fetching FAQs for language: ${lang}`);

  // Check if data is in cache
  client.get(cacheKey, async (err, data) => {
    if (err) {
      console.error('Redis Error:', err);
      return res.status(500).json({ error: 'Redis error' });
    }

    if (data) {
      console.log('FAQs found in cache');
      return res.json(JSON.parse(data));
    }

    try {
      // If not in cache, fetch from database
      const faqs = await FAQ.find();
      console.log(`Fetched ${faqs.length} FAQs from the database.`);
      
      const translatedFAQs = faqs.map(faq => ({
        question: faq[`question_${lang}`] || faq.question_en,
        answer: faq[`answer_${lang}`] || faq.answer_en,
      }));

      // Store data in cache for 15 minutes
      client.setex(cacheKey, 900, JSON.stringify(translatedFAQs));
      console.log('Stored FAQs in cache for 15 minutes');
      res.json(translatedFAQs);
    } catch (err) {
      console.error('Database Error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
  });
};

