const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

assert('Unit Tests', function () {
	it('should correctly read a whole number input', function () {
		assert.equal(convertHandler.getNum('32L'), 32);
	});

	it('should correctly read a decimal number input', function () {
		assert.equal(convertHandler.getNum('3.1mi'), 3.1);
	});

	it('should correctly read a fractional input', function () {
		assert.equal(convertHandler.getNum('1/2km'), 0.5);
	});

	it('should correctly read a fractional input with a decimal', function () {
		assert.equal(convertHandler.getNum('5.4/3lbs'), 1.8);
	});

	it('should return an error on a double-fraction', function () {
		assert.equal(convertHandler.getNum('3/2/3kg'), 'invalid number');
	});

	it('should default to 1 when no numerical input is provided', function () {
		assert.equal(convertHandler.getNum('kg'), 1);
	});

	it('should correctly read each valid input unit', function () {
		assert.equal(convertHandler.getUnit('32kg'), 'kg');
	});

	it('should return an error for an invalid input unit', function () {
		assert.equal(convertHandler.getUnit('32g'), 'invalid unit');
	});

	it('should return the correct return unit for each valid input unit', function () {
		assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
	});

	it('should return the spelled-out string unit for each valid input unit', function () {
		assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
	});
});
