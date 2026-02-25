const request = require('supertest');
const app = require('../../app');
const { db } = require('../../configuration/database');

describe('Integration tests for videogames API', () => {

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

    await db('consoles').insert({ 
      id: 1, 
      name: 'Nintendo Switch', 
      description: 'Híbrida: juega en la TV o en modo portátil.',
      release_date: '2017-03-03',
      url: 'url.png',
      company_id: 1
    });

    await db('videogames').insert({ 
      id: 1, 
      title: 'Zelda: Breath of the Wild', 
      description: 'Explora Hyrule con libertad total.',
      genre: 'Adventure',
      release_date: '2017-03-03',
      pegi_rating: 'PEGI 12',
      price: 59.99, 
      url: 'url.jpg',
      company_id: 1 
    });

    await db('videogame_console').insert({
      videogame_id: 1,
      console_id: 1
    });
  });

  afterAll(async () => {
    await db.destroy();
  });

  // GET /videogames
  describe('GET /videogames', () => {

    test('should return a list of videogames', async () => {
      const response = await request(app).get('/videogames');
      
      expect(response.statusCode).toEqual(200);
      expect(response.body.title).toBe('success');
      expect(response.body.message).toBe('Videogames retrieved successfully');
      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);

      expect(response.body.data[0].title).toBe('Zelda: Breath of the Wild');
      expect(response.body.data[0]).toHaveProperty('priceWithTax');
    
    });

  });

  // GET /videogames/:id
  describe('GET /videogames/:id', () => {

    test('should return a single videogame by ID', async () => {
      const response = await request(app).get('/videogames/1');
      
      expect(response.statusCode).toEqual(200);
      expect(response.body.title).toBe('success');
      expect(response.body.message).toBe('Videogame retrieved successfully');
      expect(response.body).toHaveProperty('data');
      expect(response.body.data.title).toBe('Zelda: Breath of the Wild');
      expect(response.body.data).toHaveProperty('priceWithTax');
    });

    test('should return 404 if videogame not found', async () => {
      const response = await request(app).get('/videogames/999');
      
      expect(response.statusCode).toEqual(404);
      expect(response.body.title).toBe('not-found');
      expect(response.body.message).toBe('Videogame with id 999 not found');
    });

    test('should return 400 for invalid ID', async () => {
      const response = await request(app).get('/videogames/invalid');
      
      expect(response.statusCode).toEqual(400);
      expect(response.body.title).toBe('validation error');
      expect(Array.isArray(response.body.errors)).toBe(true);
    });

  });

});