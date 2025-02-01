const request = require('supertest');
const app = require('../app');

describe('FAQ API', () => {
  it('should fetch FAQs in English', async () => {
    const res = await request(app).get('/api/faqs');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should fetch FAQs in Hindi', async () => {
    const res = await request(app).get('/api/faqs?lang=hi');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
