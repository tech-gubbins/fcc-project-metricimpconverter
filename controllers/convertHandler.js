const conversionRates = {
  gal: 3.78541, // Gallons to Liters
  L: 1 / 3.78541, // Liters to Gallons
  lbs: 0.453592, // Pounds to Kilograms
  kg: 1 / 0.453592, // Kilograms to Pounds
  mi: 1.60934, // Miles to Kilometers
  km: 1 / 1.60934, // Kilometers to Miles
};

const units = {
  gal: "gallons",
  L: "liters",
  lbs: "pounds",
  kg: "kilograms",
  mi: "miles",
  km: "kilometers",
};

class ConvertHandler {
  // Parse input to extract number and unit
  parseInput(input) {
    const numMatch = input.match(/^([.\d/]+)?/);
    const unitMatch = input.match(/[a-zA-Z]+$/);
    const num = numMatch[0];
    const unit = unitMatch ? unitMatch[0] : null;

    return { num, unit };
  }

  // Validate and parse number
  getNum(input) {
    const { num } = this.parseInput(input);
  
    if (!num) return 1; // Default to 1 if no number is provided
  
    // Check for multiple slashes (double-fraction)
    if ((num.match(/\//g) || []).length > 1) {
      return "invalid number";
    }
  
    const fractionRegex = /^[\d]+(\.[\d]+)?\/[\d]+(\.[\d]+)?$/;
    if (fractionRegex.test(num)) {
      const [numerator, denominator] = num.split('/').map(Number);
      if (!denominator || isNaN(numerator)) return "invalid number"; // Catch invalid fractions
      return parseFloat((numerator / denominator).toFixed(5));
    }
  
    const parsedNum = parseFloat(num);
    return isNaN(parsedNum) ? "invalid number" : parsedNum;
  }

  // Validate unit
  getUnit(input) {
    const { unit } = this.parseInput(input);
    const lowerCaseUnit = unit?.toLowerCase();
    if (!lowerCaseUnit) return "invalid unit";

    const validUnits = ["gal", "l", "lbs", "kg", "mi", "km"];
    return validUnits.includes(lowerCaseUnit) ? (lowerCaseUnit === "l" ? "L" : lowerCaseUnit) : "invalid unit";
  }

  // Get return unit for conversions
  getReturnUnit(unit) {
    const unitMap = {
      gal: "L",
      L: "gal",
      lbs: "kg",
      kg: "lbs",
      mi: "km",
      km: "mi",
    };
    return unitMap[unit] || "invalid unit";
  }

  // Get the full name of a unit
  spellOutUnit(unit) {
    return units[unit] || null;
  }

  // Convert the number
  convert(num, unit) {
    const rate = conversionRates[unit];
    return rate ? parseFloat((num * rate).toFixed(5)) : null;
  }
}

module.exports = ConvertHandler;