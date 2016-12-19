var expect = require('expect');
var customer = require('../../models/customer');

describe('customer', () => {

	describe('reducer', () => {

		describe('deleteSuccess', () => {
			it('should be the same', () => {
				expect(customer.reducers['deleteSuccess']({}, {})).toExist("存在");
			});
		})

	})
});

var assert = require('assert');
describe('Array', function() {
	describe('#indexOf()', function() {
		it('should return -1 when the value is not present', function() {
			assert.equal(-1, [1,2,3].indexOf(4));
		});
	});
});
