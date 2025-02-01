const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  question_en: { type: String, required: true },
  answer_en: { type: String, required: true },
  question_hi: { type: String, default: '' },
  answer_hi: { type: String, default: '' },
  question_bn: { type: String, default: '' },
  answer_bn: { type: String, default: '' },
});

module.exports = mongoose.model('FAQ', faqSchema);