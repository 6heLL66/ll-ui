// Data generation functions for price range charts

/**
 * Generates data for a uniform distribution (spot strategy)
 */
export const generateSpotData = () => {
  // Create a consistent uniform distribution instead of random values
  return Array.from({ length: 20 }, (_, i) => ({
    name: i.toString(),
    value: 0.8 // Consistent height for all bars
  }));
};

/**
 * Generates data for a Gaussian distribution (curve strategy)
 */
export const generateCurveData = () => {
  const center = 10;
  const stdDev = 4;
  
  return Array.from({ length: 20 }, (_, i) => {
    // Create a bell curve distribution
    const x = i;
    const value = Math.exp(-Math.pow(x - center, 2) / (2 * Math.pow(stdDev, 2)));
    return {
      name: i.toString(),
      value: value
    };
  });
};

/**
 * Generates data for a bimodal distribution (bid-ask strategy)
 */
export const generateBidAskData = () => {
  const peak1 = 6;
  const peak2 = 14;
  const stdDev = 2;
  
  return Array.from({ length: 20 }, (_, i) => {
    // Create a bimodal distribution with two peaks
    const x = i;
    const value1 = Math.exp(-Math.pow(x - peak1, 2) / (2 * Math.pow(stdDev, 2)));
    const value2 = Math.exp(-Math.pow(x - peak2, 2) / (2 * Math.pow(stdDev, 2)));
    return {
      name: i.toString(),
      value: Math.max(value1, value2)
    };
  });
};
