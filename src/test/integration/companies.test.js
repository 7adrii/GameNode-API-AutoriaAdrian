const request = require('supertest');
const app = require('../../app');
const { db } = require('../../configuration/database');

describe('Integration tests for companies API', () => {
  
  beforeAll(async () => {
    
    await db.raw('SET FOREIGN_KEY_CHECKS = 0');

    await db('videogame_console').truncate();
    await db('videogames').truncate();
    await db('companies').truncate();
    await db('consoles').truncate();

    await db.raw('SET FOREIGN_KEY_CHECKS = 1');

    await db('companies').insert({
      id: 1,
      name: 'Nintendo',
      description: 'Gigante japonés del entretenimiento familiar.',
      country: 'Japón',
      year_founded: 1889,
      website: 'https://www.nintendo.com',
      logo: 'logo.png'
    });

  });

  afterAll(async () => {
    await db.destroy();
  });

  // GET /companies
  describe('GET /companies', () => {
    
    test('should return a list of companies', async () => {
      
      const response = await request(app).get('/companies');

      expect(response.statusCode).toEqual(200);
      expect(response.body.title).toBe('success');
      expect(response.body.message).toBe('Companies retrieved successfully');
      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);

      expect(response.body.data[0].name).toBe('Nintendo');
      expect(response.body.data[0]).toHaveProperty('yearsSinceFounded');
    
    });

  });

  // GET /companies/:id
  describe('GET /companies/:id', () => {
    
    test('returns company by id (200)', async () => {
      
      const res = await request(app).get('/companies/1');
      
      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe('success');
      expect(res.body.data).toHaveProperty('id');
      expect(res.body.data.id).toBe(1);
      expect(res.body.data.name).toBe('Nintendo');
      expect(res.body.data).toHaveProperty('yearsSinceFounded');
    
    });

    test('returns 404 when not found', async () => {
      
      const res = await request(app).get('/companies/999999');
      
      expect(res.statusCode).toBe(404);
      expect(res.body.title).toBe('not-found');
    
    });

    test('returns 400 for invalid id', async () => {
      
      const res = await request(app).get('/companies/abc');
      
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('errors');
    
    });

  });

  // POST /companies
  describe('POST /companies', () => {

    test('creates company (201) with valid payload', async () => {
      
      const payload = {
        name: 'IntegrationCo',
        description: 'Integration test company',
        country: 'Spain',
        year_founded: 1995,
        website: 'https://integration.co',
        logo: 'logo.png'
      };

      const res = await request(app).post('/companies').send(payload);
      
      expect(res.statusCode).toBe(201);
      expect(res.body.title).toBe('created');
      expect(res.body.data).toHaveProperty('id');
      expect(res.body.data.name).toBe(payload.name);

      const createdId = res.body.data.id;
      
      const dbCompany = await db('companies').where({ id: createdId }).first();
      
      expect(dbCompany).toBeDefined();
      expect(dbCompany.name).toBe('IntegrationCo');
    
    });

    test('returns 400 when required fields missing', async () => {
      
      const payload = { description: 'No name', country: 'Nowhere' };
      
      const res = await request(app).post('/companies').send(payload);
      
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('errors');
    });

    test('returns 400 when year_founded out of range', async () => {
      
      const payload = {
        name: 'BadYearCo',
        country: 'Nowhere',
        year_founded: 1700,
        website: 'https://bad.co'
      };

      const res = await request(app).post('/companies').send(payload);
      
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('errors');

    });
  });

  // PUT /companies/:id
  describe('PUT /companies/:id', () => {
  
    test('updates existing company (200)', async () => {
      
      const payload = {
        name: 'UpdatedCo',
        description: 'Updated desc',
        country: 'USA',
        year_founded: 2001,
        website: 'https://updated.co'
      };

      const res = await request(app).put('/companies/1').send(payload);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe('success');
      expect(res.body.data.name).toBe('UpdatedCo');

      const dbCompany = await db('companies').where({ id: 1 }).first();
      
      expect(dbCompany).toBeDefined();
      expect(dbCompany.name).toBe('UpdatedCo');
    
    });

    test('returns 404 when updating non-existent company', async () => {
      
      const payload = {
        name: 'DoesNotExist',
        country: 'Nowhere',
        year_founded: 2000,
        website: 'https://nope'
      };

      const res = await request(app).put('/companies/999999').send(payload);

      expect(res.statusCode).toBe(404);
      expect(res.body.title).toBe('not-found');
    
    });

    test('returns 400 for invalid id', async () => {
      
      const payload = {
        name: 'BadID',
        country: 'Nowhere',
        year_founded: 2000,
        website: 'https://bad'
      };
      
      const res = await request(app).put('/companies/abc').send(payload);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('errors');
    
    });
  
  });

  // DELETE /companies/:id
  describe('DELETE /companies/:id', () => {
   
    test('deletes existing company (200)', async () => {
      
      const res = await request(app).delete('/companies/1');
      
      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe('success');

      const check = await request(app).get('/companies/1');
      
      expect(check.statusCode).toBe(404);
    });

    test('returns 404 when deleting non-existent company', async () => {
      
      const res = await request(app).delete('/companies/1');
      
      expect(res.statusCode).toBe(404);
      expect(res.body.title).toBe('not-found');
    
    });

    test('returns 400 when id invalid', async () => {

      const res = await request(app).delete('/companies/abc');
      
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('errors');
    
    });
  
  });

});
