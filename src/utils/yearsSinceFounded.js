/**
 * Calcular los años desde el año de fundación hasta el año actual.
 * @param {number} foundedYear - Año de fundación.
 * @param {number} [currentYear] - Año actual.
 * @returns {number} Años desde el año de fundación hasta el año actual.
 */
function yearsSinceFounded(foundedYear, currentYear = new Date().getFullYear()) {
  
    if ((foundedYear > currentYear) || (typeof foundedYear !== 'number')) {
      return null;
    }

    return currentYear - foundedYear;
}

module.exports = {
    yearsSinceFounded
};