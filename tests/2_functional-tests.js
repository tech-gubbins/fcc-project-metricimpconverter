const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');
const { Test, test } = require('mocha');

chai.use(chaiHttp);

suite('Functional Tests', function () {
	test('Convert a valid input: GET request to /api/convert', function (done) {
		chai
			.request(server)
			.get('/api/convert?input=10L')
			.end(function (err, res) {
				assert.equal(res.status, 200);
				assert.equal(res.body.initNum, 10);
				assert.equal(res.body.initUnit, 'L');
				assert.approximately(res.body.returnNum, 2.64172, 0.00001); // Allow small rounding differences
				assert.equal(res.body.returnUnit, 'gal');
				done();
			});
	});

	test('Convert an invalid input: GET request to /api/convert', function (done) {
		chai
			.request(server)
			.get('/api/convert?input=32g')
			.end(function (err, res) {
				assert.equal(res.status, 200);
				assert.equal(res.body.error, 'invalid unit'); // Check for proper error response
				done();
			});
	});

	test('Convert an invalid number: GET request to /api/convert', function (done) {
		chai
			.request(server)
			.get('/api/convert?input=3/7.2/4kg')
			.end(function (err, res) {
				assert.equal(res.status, 200);
				assert.equal(res.body.error, 'invalid number'); // Check for proper error response
				done();
			});
	});

	test('Convert both invalid number and unit: GET request to /api/convert', function (done) {
		chai
			.request(server)
			.get('/api/convert?input=3/7.2/4kilomegagram')
			.end(function (err, res) {
				assert.equal(res.status, 200);
				assert.equal(res.body.error, 'invalid number and unit'); // Check for proper error response
				done();
			});
	});

	test('Convert with no number: GET request to /api/convert', function (done) {
		chai
			.request(server)
			.get('/api/convert?input=kg')
			.end(function (err, res) {
				assert.equal(res.status, 200);
				assert.equal(res.body.initNum, 1); // Default to 1 if no number is provided
				assert.equal(res.body.initUnit, 'kg');
				assert.approximately(res.body.returnNum, 2.20462, 0.00001); // Allow small rounding differences
				assert.equal(res.body.returnUnit, 'lbs');
				done();
			});
	});
});
