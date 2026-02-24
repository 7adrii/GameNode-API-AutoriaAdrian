/**
 * Calcula el precio final de un producto aplicando un porcentaje de descuento.
 * @param {number} price - El precio original.
 * @param {number} discountPercentage - El porcentaje de descuento a aplicar (entre 0 y 100).
 * @returns {number|null} - El precio final redondeado a 2 decimales, o null si los datos son inválidos.
 */
function calculateDiscount(price, discountPercentage) {

  if (price < 0 || discountPercentage < 0 || discountPercentage > 100) {
    return null;
  }

  const discountAmount = price * (discountPercentage / 100);
  const finalPrice = price - discountAmount;

  return Number(finalPrice.toFixed(2));
}

/**
 * Calcula el precio total añadiendo el impuesto del IVA.
 * @param {number} price - El precio base.
 * @param {number} taxPercentage - El porcentaje de impuesto (por defecto 21%).
 * @returns {number|null} - El precio final redondeado a 2 decimales, o null si los datos son inválidos.
 */
function calculatePriceWithTax(price, taxPercentage = 21) {
  
  if (price < 0 || taxPercentage < 0) {
    return null;
  }

  const taxAmount = price * (taxPercentage / 100);
  const finalPrice = price + taxAmount;

  return Number(finalPrice.toFixed(2));
}

module.exports = {
  calculateDiscount,
  calculatePriceWithTax
};