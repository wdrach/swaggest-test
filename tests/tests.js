'use strict';

var fs = require('fs');
var swaggestTest = require('../lib/swaggest-test');
var assert = require('chai').assert;

describe('test generation', function () {

  var testDir = __dirname;
  var buffer  = fs.readFileSync(testDir + '/swagger.json');
  var spec    = JSON.parse(buffer);

  var tests = swaggestTest.parse(spec);

  it('has 2 routes', function () {
    assert.equal(Object.keys(tests).length, 2);
  });

  it('test GET w/ query params on dogs/cats', function () {
     assert.deepEqual(tests['/pets'].get[0], {
       description: 'Return 50 dogs/cats',
       request: {
         path: {},
         query: {
           tags: [
             'dogs',
             'cats'
           ],
           limit: 50
         },
         headers: undefined,
         body: null,
         method: 'get',
         uri: 'http://petstore.swagger.io/pets'
       },
       response: 200
     });
  });

  it('test GET w/ no params', function() {
    assert.deepEqual(tests['/pets'].get[1], {
			description: 'Return E V E R Y T H I N G',
			request: {
				path: null,
				query: null,
				body: null,
        headers: undefined,
				method: 'get',
				uri: 'http://petstore.swagger.io/pets'
			},
			response: 200
		});
  });

  it('test POST', function() {
    assert.deepEqual(tests['/pets'].post[0], {
			description: 'Add a new pet',
			request: {
				path: {},
				query: null,
				body: {
					name: 'garythesnail'
				},
				headers: {
					'content-type': 'application/json'
				},
				method: 'post',
				uri: 'http://petstore.swagger.io/pets'
			},
			response: 200
		});
  });

  it('test another GET with a uri param', function() {
		assert.deepEqual(tests['/pets/{id}'].get[0], {
			description: 'Return a pet',
			request: {
				path: {
					id: 101
				},
        headers: undefined,
				query: null,
				body: null,
				method: 'get',
				uri: 'http://petstore.swagger.io/pets/101'
			},
			response: 200
		});
  });

  it('test DELETE', function() {
    assert.deepEqual(tests['/pets/{id}']['delete'][0], {
			description: 'Delete a pet',
			request: {
				path: {
					id: 101
				},
        headers: undefined,
				query: null,
				body: null,
				method: 'delete',
				uri: 'http://petstore.swagger.io/pets/101'
			},
			response: 204
		});
  });
});