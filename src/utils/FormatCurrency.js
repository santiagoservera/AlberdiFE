/**
 * Formatea un número a formato de moneda argentina (ARS)
 * @param {number} amount - El monto a formatear
 * @param {Object} options - Opciones adicionales de formato
 * @param {boolean} options.showSymbol - Si se debe mostrar el símbolo de moneda
 * @param {boolean} options.showDecimals - Si se deben mostrar los decimales
 * @returns {string} String formateado como moneda argentina
 */
export function formatCurrency(amount, options = {}) {
  const { showSymbol = true, showDecimals = true } = options;

  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
    // Si no queremos mostrar el símbolo, usamos 'code' y luego lo reemplazamos
    currencyDisplay: showSymbol ? "symbol" : "code",
  })
    .format(amount)
    .replace("ARS", "")
    .trim();
}
