const { getCompanyGeneration } = require('../../utils/getCompanyGeneration');

describe('Utils: getCompanyGeneration', () => {
  test('Should return "Consolidada" for Nintendo (1889)', () => {
    expect(getCompanyGeneration(1889)).toBe('Consolidada');
  });

  test('Should return "Referente" for Capcom (1979)', () => {
    expect(getCompanyGeneration(1979)).toBe('Referente');
  });

  test('Should return "Actual" for Rockstar (1998)', () => {
    expect(getCompanyGeneration(1998)).toBe('Actual');
  });

  test('Should return "Emergente" for recent companies (2015)', () => {
    expect(getCompanyGeneration(2015)).toBe('Emergente');
  });

  test('Should return null for invalid years', () => {
    expect(getCompanyGeneration(1799)).toBeNull();
    expect(getCompanyGeneration('1980')).toBeNull();
  });
});
