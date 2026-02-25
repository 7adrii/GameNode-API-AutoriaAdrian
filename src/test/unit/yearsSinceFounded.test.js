const { yearsSinceFounded } = require('../../utils/yearsSinceFounded');

describe("Utils: dateUtils", () => {
  describe("yearsSinceFounded", () => {
    
    beforeAll(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2026-01-01')); 
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    test("You should return 16 years for a company founded in 2010", () => {
      expect(yearsSinceFounded(2010)).toBe(16);
    });

    test("You should return 0 if the founded year is the current year", () => {
      expect(yearsSinceFounded(2026)).toBe(0);
    });

    test("You should handle the year as a string (common from DB drivers)", () => {
      expect(yearsSinceFounded(2020)).toBe(6);
    });

    test("You should return null if the founded year is in the future", () => {
      expect(yearsSinceFounded(2030)).toBeNull();
    });

    test("You should return null for invalid inputs like null or undefined", () => {
      expect(yearsSinceFounded(null)).toBeNull();
      expect(yearsSinceFounded(undefined)).toBeNull();
    });

  });
});
