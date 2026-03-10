function getCompanyGeneration(foundedYear) {
    if (typeof foundedYear !== 'number' || foundedYear < 1800) {
      return null;
    }
  
    if (foundedYear < 1970) return 'Consolidada';
    if (foundedYear < 1990) return 'Referentes';
    if (foundedYear < 2010) return 'Actuales';
    return 'Emergentes';
  }

  module.exports = { getCompanyGeneration };
