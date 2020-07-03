//Contains function to call Github and Twitter API.
const twitter = require('twitter-lite');
const util = require('util')
const got = require('got');
const fs = require('fs');
const logger = require('./logger');

/**
  * @desc Reads tweets for passed keyword and return them as json array.
  * @param keyword - the keyword in tweets to be searched.
  * @param language - the value of lang option in twitter api.
  * @param tweet_limit - the value of count option in twitter api.
  * @param keys - Twitter Api consumer keys.
  * @return tweetList - String Array of recent tweets. 
*/
const readTweets = async function(keyword, language, tweet_limit, keys) {
	var tweets = [];
    try {
		const user = new twitter(keys);
		let response = await user.getBearerToken();
		const app = new twitter({
			bearer_token: response.access_token,
		});
        // Search for recent tweets from the twitter API
        response = await app.get(`/search/tweets`, {
            q: keyword, // The search term
            lang: language,        // Filter chosen language
            count: tweet_limit,      // Limit search result
        });
        // Loop over all the tweets and create tweets json
        for (data of response.statuses) {
			var tweetJson = {
				username: data.user.name,
				tweet: data.text
			};
			tweets.push(tweetJson);
        }
    } catch(error) {
		logger.error(`Error while calling the Twitter API. ${error}`);
		logger.debug(util.inspect(error));
    }
	return tweets;
};


/**
  * @desc Query Github for Repositories and get Tweets mentioning them.
  * @param query - the search keyword to query.
  * @return response - Json object containing details of project.
*/
const findRepository = async function(query){
	var response = {};
    try {
		logger.debug(`Querying Github for \'${query}\' projects`);
        const message = await got('https://api.github.com/search/repositories?q='+query);
		response = JSON.parse(message.body); //Github Api response
		logger.info(`Total Github projects found: ${response.items.length}`);
    } catch (error) {
		logger.error(`Error while calling the Github API. ${error}`);
		logger.debug(util.inspect(error));
    }
	return response;
};


/**
  * @desc Function to save data into file.
  * @param data - data to be saved in file.
  * @param filename - name of file to save data in.
  * @return fileSaved - Boolean value telling if operation was successful.
*/
const saveFile = async function(data, filename){
	var fileSaved = false;
	try{
		if(!filename)
			throw Error ('No filename passed.');
		
		if(!data)
			throw Error ('Input data to write is empty.');

		await fs.writeFile(filename, data, (err) => {
			if (err) throw err;
		}); 
		logger.info(`Output written to file: ${filename}`);
		fileSaved = true;
	} catch (error) {
		logger.error(`Error while writing data file. ${error}`);
		logger.debug(util.inspect(error));
    }
	return fileSaved;
};

module.exports = {
	readTweets,
	findRepository,
	saveFile
};