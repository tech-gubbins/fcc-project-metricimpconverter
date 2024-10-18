const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

assert('Functional Tests', function () {
	it('Convert a valid input: GET request to /api/convert', function (done) {
		chai
			.request(server)
			.get('/api/convert?input=10L')
			.end(function (err, res) {
				assert.equal(res.status, 200);
				assert.equal(res.body.returnNum, 2.64172); // 10 L to gal
				done();
			});
	});

	it('Convert an invalid input: GET request to /api/convert', function (done) {
		chai
			.request(server)
			.get('/api/convert?input=32g')
			.end(function (err, res) {
				assert.equal(res.body, 'invalid unit');
				done();
			});
	});

	it('Convert an invalid number: GET request to /api/convert', function (done) {
		chai
			.request(server)
			.get('/api/convert?input=3/7.2/4kg')
			.end(function (err, res) {
				assert.equal(res.body, 'invalid number');
				done();
			});
	});

	it('Convert with no number: GET request to /api/convert', function (done) {
		chai
			.request(server)
			.get('/api/convert?input=kg')
			.end(function (err, res) {
				assert.equal(res.body.returnNum, 2.20462); // 1 kg to lbs
				done();
			});
	});
});
