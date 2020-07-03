# GitHub-and-Twitter-APIs-mashup
A simple command line (ascii text) API mashup of GitHub and Twitter APIs. Search for projects on GitHub, then for each project search for tweets that mention it  so we can see what was said about the project and who said it.Output is a summary of each project with a short list of  recent tweets, in JSON format. Saved as output.json

## Table of Contents: 

index.js : Contains the main code to call Api's and print/save output.
.env_sample : Sample .env file. Rename it to .env and update the value based on key given.

util/api.js : Implementaion call of Github and Twitter API with save to file option.
util/validate.js : Basic validation function to check input params like isEmpty().
util/logger.js : Logging implementation based on environment(dev/prod).
util/config.js : Required config to run this application. Also considers environment(dev/prod).

## Dependency:

Depdendencies include: 
	"chai": "^4.2.0",
    "dotenv": "^8.2.0",
    "got": "^11.3.0",
    "mocha": "^7.2.0",
    "nock": "^12.0.3",
    "nyc": "^15.1.0",
    "sinon": "^9.0.2",
    "twitter-lite": "^0.13.0",
    "winston": "^3.2.1",
    "winston-daily-rotate-file": "^4.4.2"

## Usage: 
Before running this project make sure that you have created .env file by renaming .env_sample file and updating following values.

CONSUMER_KEY=your_consumer_key
CONSUMER_SECRET=your_consumer_secret_key
NODE_ENV=dev/prod(choose one)

Command to install dependencies:	npm install
Command to run this application:	npm start
Command to run tests:				npm test

## More information

The GitHub API documentation

* https://developer.github.com/v3/search/#search-repositories Searching for reactive projects
* curl https://api.github.com/search/repositories\?q\=reactive 

The Twitter API documentation

* https://dev.twitter.com/oauth/application-only
* https://dev.twitter.com/oauth/overview/application-owner-access-tokens
* https://developer.twitter.com/en/docs/tweets/search/overview
