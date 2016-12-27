/**
 * Created by echo on 2016/12/26.
 */
var expect = require('expect');
var customer = require('../../services/customer');


describe('models-customer', () => {
    describe('query', () => {
        it('should include {code: 0}', () => {
            expect(customer.query2()).toInclude({code : 0});
        });
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
