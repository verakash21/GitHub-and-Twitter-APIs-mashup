const validator = require('../util/validate');
var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();

//test String input
it('Expect isEmpty() response false for non empty string.', function(){
	let boolean_response = validator.isEmpty('name');
	expect(boolean_response).to.be.false;
});

//test empty String input
it('Expect isEmpty() response true for empty string.', function(){
	let boolean_response = validator.isEmpty('');
	expect(boolean_response).to.be.true;
});

//test json object input
it('Expect isEmpty() response false for valid json object.', function(){
	options = {lang: "en",count: 10}
    let boolean_response = validator.isEmpty(options);
	expect(boolean_response).to.be.false;
});

//test empty object input
it('Expect isEmpty() response true for empty object.', function(){
	options = {}
    let boolean_response = validator.isEmpty(options);
	expect(boolean_response).to.be.true;
});

//test null input
it('Expect isEmpty() response true for null.', function(){
    let boolean_response = validator.isEmpty(null);
	expect(boolean_response).to.be.true;
});

//test for missing input value and a default value.
it('Expect get_config_value() with default config.', function(){
	let input_value = null;
	let default_val = 10;
	let config_name =  'someName';
    let response = validator.get_config_value(input_value, default_val, config_name);
	response.should.equal(default_val);
});

//test for valid input value and a default value.
it('Expect get_config_value() with valid config.', function(){
	let input_value = 20;
	let default_val = 10;
	let config_name =  'someName';
    let response = validator.get_config_value(input_value, default_val, config_name);
	response.should.equal(input_value);
});

//test missing process.env.NODE_ENV
it('Expect validEnv() response false for empty Environment.', function(){
	process.env.NODE_ENV = '';
    let boolean_response = validator.validEnv();
	expect(boolean_response).to.be.false;
});

//test valid process.env.NODE_ENV
it('Expect validEnv() response true for prod Environment.', function(){
	process.env.NODE_ENV = 'prod';
    let boolean_response = validator.validEnv();
	expect(boolean_response).to.be.true;
});

//test valid process.env.NODE_ENV
it('Expect validEnv() response true for dev Environment.', function(){
	process.env.NODE_ENV = 'dev';
    let boolean_response = validator.validEnv();
	expect(boolean_response).to.be.true;
});

//test invalid process.env.NODE_ENV
it('Expect validEnv() response false for test Environment.', function(){
	process.env.NODE_ENV = 'test';
    let boolean_response = validator.validEnv();
	expect(boolean_response).to.be.false;
});
