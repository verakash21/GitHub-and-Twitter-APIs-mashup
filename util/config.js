//Contains configuations for different environment.
const env = process.env.NODE_ENV; // 'dev' or 'prod'

//Dev Environment Configurations
const dev = {
 options: {
	lang: "en",       // Only English tweets.
	count: 5         // Limit the results to 10 tweets.
 },
 keys: {
	consumer_key: process.env.CONSUMER_KEY,			//Consumer API key.
	consumer_secret: process.env.CONSUMER_SECRET,	//Consumer API secret key.
 },
 query: "reactive",		//project to search for on Github.
 output_file : "test_output.json",	//file where response to be saved. Remove it if saving not required. 
 project_search_limit: 10	//Limit for number of projects to find tweets for.
};

//Production Environment Configurations
const prod = {
 options: {
	lang: "en",
	count: 10
 },
 keys: {
	consumer_key: process.env.CONSUMER_KEY,
	consumer_secret: process.env.CONSUMER_SECRET,
 },
 query: "reactive",
 output_file : "output.json", 
 project_search_limit: 12
};

const config = {
 dev,
 prod
};

module.exports = config[env];