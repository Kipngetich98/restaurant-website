
export const convertToKES = (priceUSD: number): number => {
  const exchangeRate = 150; // 1 USD = 150 KES (approximate)
  return priceUSD * exchangeRate;
};
