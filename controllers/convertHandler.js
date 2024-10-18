const units = {
  gal: { returnUnit: 'L', factor: 3.78541 },
  L: { returnUnit: 'gal', factor: 1 / 3.78541 },
  lbs: { returnUnit: 'kg', factor: 0.453592 },
  kg: { returnUnit: 'lbs', factor: 1 / 0.453592},
  mi: { returnUnit: 'km', factor: 1.60934 },
  km: { returnUnit: 'mi', factor: 1 / 1.60934 }
};

const validUnits = Object.keys(units);

function ConvertHandler() {
  
  this.getNum = function(input) {
    let result = input.match(/[.\d\/]+/g) || ['1'];
    let numString = result[0];

    if (numString.includes('/')) {
      let fractions = numString.split('/');
      if (fractions.length > 2) return 'invalid number';
      return fractions[0] / fractions[1];
    }
    return parseFloat(numString);
  };
  
  this.getUnit = function(input) {
    let result = input.match('/[a-zA-Z]+/g');
    if (!result || !validUnits.includes(result[0].toLowerCase())) return 'invalid unit';
    return result[0].toLowerCase();
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    const unitNames = {
      gal: 'gallons',
      L: 'liters',
      lbs: 'pounds',
      kg: 'kilograms',
      mi: 'miles',
      km: 'kilometers'
    };
    return unitNames[unit] || 'invalid unit';
  };
  
  this.convert = function(initNum, initUnit) {
    const unit = units[initUnit];
  if (!unit) return 'invalid unit';
  return parseFloat((initNum * unit.factor).toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
