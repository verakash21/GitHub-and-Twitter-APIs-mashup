//The main app file containing code to validate input parameter, call other functions and display results.
require('dotenv').config()
var config = require('./util/config');
const logger = require('./util/logger');
const validate = require('./util/validate');
const api = require('./util/api');

let twitter_lang = 'en'
let twitter_count = 5;
const default_github_limit = 5;

logger.info(`Running GitHub-and-Twitter-APIs-mashup Nodejs Code.`)

//To check invalid environment argument.
if(!validate.validEnv()){
	logger.error(`Incorrect NODE_ENV missing in .env file.`);
	return;
}

//To check invalid Twitter API Key.
if(validate.isEmpty(process.env.CONSUMER_KEY) || validate.isEmpty(process.env.CONSUMER_SECRET)){
	logger.error(`Twitter Consumer API Key missing in .env file.`);
	return;
}

//Validate project name to search on github.
if(validate.isEmpty(config.query)){
	logger.error(`Project name to query missing. Please add it in util/config.js`);
	return;
}

//Check and setting Github and Twitter API configs.
let project_search_limit = validate.get_config_value(config.project_search_limit, default_github_limit,'project_search_limit');
logger.info(`Project Search Count: ${project_search_limit}.`);
if(validate.isEmpty(config.options)){
	logger.warn(`Option for twitter api missing. Using default lang and count.`);
}
else{
	twitter_lang = validate.get_config_value(config.options.lang, twitter_lang,'lang');
	twitter_count = validate.get_config_value(config.options.count, twitter_count,'count');
}


(async function main(){
    try {
		//Get projects from github matching query.
		let res = await api.findRepository(config.query);
		//Check Github response.
		if(validate.isEmpty(res)){
			logger.info(`No response from github api.`);
			return;
		}
		var responseJson = {};
		const key = 'Projects';
		responseJson[key] = [];
		//Start looking for Tweet for each project.
		for (var i = 0; i < res.items.length && i < project_search_limit; i++) {
			let repository = res.items[i];
			let projectJson = {}
			projectJson['project_name'] = repository.name;
			projectJson['project_description'] = repository.description;
			//Get results for tweets for given project name.
			let tweetsList = await api.readTweets(repository.name, twitter_lang, twitter_count, config.keys);
			projectJson['tweets'] = tweetsList;
			responseJson[key].push(projectJson);
		}
		console.log('Response: ', responseJson);
		if(!validate.isEmpty(config.output_file)){
			const output_data = JSON.stringify(responseJson, null, 4);
			await api.saveFile(output_data, config.output_file);
		}
		logger.info(`Execution Completed`);
    } catch (error) {
		logger.error(`Error while parsing the creating response json. ${error}`);
		logger.debug(util.inspect(error));
    }
})();
