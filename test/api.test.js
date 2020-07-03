const assert = require("assert");
var expect = require('chai').expect;
var should = require('chai').should();
const nock = require('nock');
const sinon = require('sinon');
const fs = require('fs');
const api = require('../util/api');
//require('dotenv').config()

let test_query = 'abc';
let input_reponse = {'items':[{a:1},{b:2},{c:3}]};
nock('https://api.github.com')
    .get('/search/repositories?q=abc')
    .reply(200, input_reponse);

//test valid github query response.
it('Expect findRepository() response match with input.', async () =>{
	let response = await api.findRepository(test_query);
	response.items.length.should.equal(input_reponse.items.length);
});

//test invalid github query response.
it('Expect findRepository() response to be empty', async () =>{
	let response = await api.findRepository('invalidQuery');
	expect(response).to.be.empty;
});

//test save file for invalid params.
it('should return false as data is null', async () => {
	let response = await api.saveFile(null,'filename.json');
	console.log(`returned value ${response}`);
	response.should.equal(false);
});

//test save file for invalid params.
it('should return false as filename is empty', async() => {
	let response = await api.saveFile('abc','');
	response.should.equal(false);
});


//mock and test save file .
describe('saveFile() test', function () {
	let data = 'abc';
	let filename = 'xyz.json';
	let writeFile;

	beforeEach(() => {
		writeFile = sinon.stub(fs, 'writeFile').returns(true);
	});
	afterEach(() => {
		writeFile.restore();
	});

	it('should fs.writeFile with filename and data.', () => {
		api.saveFile(data,filename);
		writeFile.calledOnceWith(filename, data).should.equal(true);
	});
});

/*
//Commented test as it needs .env file and not exactly a unit test. Unit test required mocking and can be time consuming to implement.
//Hence used a live test to make sure things run.
//uncomment line 8 and have .env file with Twitter consumer_key to make this run. 
describe('Run Twitter api and test response', () => {

  it('should get a valid response', async () => {
	let keys= {
		consumer_key: process.env.CONSUMER_KEY,	
		consumer_secret: process.env.CONSUMER_SECRET,
	};
	let keyword = 'test'
	let lang = 'en'
	let tweet_limit = 4;
	response = await api.readTweets(keyword, lang, tweet_limit, keys);
	assert(response)
	expect(response.length > 0).to.be.true;
  });
});
*/