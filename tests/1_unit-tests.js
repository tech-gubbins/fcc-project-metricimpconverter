const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

const convertHandler = new ConvertHandler();

suite('Unit Tests', () => {
	suite('Function convertHandler.getNum(input)', () => {
		test('Whole number input', (done) => {
			const input = '32L';
			assert.equal(convertHandler.getNum(input), 32);
			done();
		});

		test('Decimal Input', (done) => {
			const input = '1.2gal';
			assert.equal(convertHandler.getNum(input), 1.2);
			done();
		});

		test('Fractional Input', (done) => {
			const input = '1/2km';
			assert.equal(convertHandler.getNum(input), 0.5);
			done();
		});

		test('Fractional Input w/ Decimal', (done) => {
			const input = '5.5/2mi';
			assert.equal(convertHandler.getNum(input), 2.75);
			done();
		});

		test('Invalid Input (double fraction)', (done) => {
			const input = '5.5/2/2l';
			assert.equal(convertHandler.getNum(input), 'invalid number');
			done();
		});

		test('No Numerical Input', (done) => {
			const input = 'lbs';
			assert.equal(convertHandler.getNum(input), 1);
			done();
		});
	});

	suite('Function convertHandler.getUnit(input)', () => {
		test('For Each Valid Unit Inputs', (done) => {
			const input = [
				{ unit: 'gal', expected: 'gal' },
				{ unit: 'l', expected: 'L' },
				{ unit: 'mi', expected: 'mi' },
				{ unit: 'km', expected: 'km' },
				{ unit: 'lbs', expected: 'lbs' },
				{ unit: 'kg', expected: 'kg' },
				{ unit: 'GAL', expected: 'gal' },
				{ unit: 'L', expected: 'L' },
				{ unit: 'MI', expected: 'mi' },
				{ unit: 'KM', expected: 'km' },
				{ unit: 'LBS', expected: 'lbs' },
				{ unit: 'KG', expected: 'kg' },
			];
		
			input.forEach(({ unit, expected }) => {
				assert.equal(convertHandler.getUnit(unit), expected);
			});
			done();
		});

		test('Unknown Unit Input', (done) => {
			const input = 'notvalid';
			assert.equal(convertHandler.getUnit(input), 'invalid unit');
			done();
		});
	});

	suite('Function convertHandler.getReturnUnit(initUnit)', () => {
		test('For Each Valid Unit Inputs', (done) => {
			const input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
			const expect = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
			input.forEach((el, i) => {
				assert.equal(convertHandler.getReturnUnit(el), expect[i]);
			});
			done();
		});
	});

	suite('Function convertHandler.spellOutUnit(unit)', () => {
		test('For Each Valid Unit Inputs', (done) => {
			const input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
			const expect = [
				'gallons',
				'liters',
				'miles',
				'kilometers',
				'pounds',
				'kilograms',
			];
			input.forEach((el, i) => {
				assert.strictEqual(convertHandler.spellOutUnit(el), expect[i]);
			});
			done();
		});
	});

	suite('Function convertHandler.convert(num, unit)', () => {
		test('Gal to L', (done) => {
			var input = [5, 'gal'];
			var expected = 18.9271;
			assert.approximately(
				convertHandler.convert(input[0], input[1]),
				expected,
				0.1 // Tolerance
			);
			done();
		});

		test('L to Gal', (done) => {
			var input = [6, 'L'];
			var expected = 1.58503;
			assert.approximately(
				convertHandler.convert(input[0], input[1]),
				expected,
				0.1 // Tolerance
			);
			done();
		});

		test('Mi to Km', (done) => {
			var input = [10, 'mi'];
			var expected = 16.0934;
			assert.approximately(
				convertHandler.convert(input[0], input[1]),
				expected,
				0.1 // Tolerance
			);
			done();
		});

		test('Km to Mi', (done) => {
			var input = [2.5, 'km'];
			var expected = 1.55343;
			assert.approximately(
				convertHandler.convert(input[0], input[1]),
				expected,
				0.1 // Tolerance
			);
			done();
		});

		test('Lbs to Kg', (done) => {
			var input = [3 / 3, 'lbs'];
			var expected = 0.453592;
			assert.approximately(
				convertHandler.convert(input[0], input[1]),
				expected,
				0.1 // Tolerance
			);
			done();
		});

		test('Kg to Lbs', (done) => {
			var input = [6.3 / 2, 'kg'];
			var expected = 6.944561;
			assert.approximately(
				convertHandler.convert(input[0], input[1]),
				expected,
				0.1 // Tolerance
			);
			done();
		});
	});
});
