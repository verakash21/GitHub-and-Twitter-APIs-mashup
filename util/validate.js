 //Functions to validate input parameters.
const logger = require('./logger');

/**
  * @desc Validate if Node Js run environment has valid value (i.e dev/prod).
  * @return boolean - true for valid value and false for invalid or missing value. 
*/
var validEnv = function(){
	if(process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'prod')
		return true;
	else
		return false;
}

/**
  * @desc Validate if input data is empty or not.
  * @param data -  input data to validate.
  * @return boolean - false if empty or null value. Otherwise true. 
*/
var isEmpty = function(data) {
    if(typeof(data) === 'object'){
        if(JSON.stringify(data) === '{}' || JSON.stringify(data) === '[]'){
            return true;
        }else if(!data){
            return true;
        }
        return false;
    }else if(typeof(data) === 'string'){
        if(!data.trim()){
            return true;
        }
        return false;
    }else if(typeof(data) === 'undefined'){
        return true;
    }else{
        return false;
    }
}

/**
  * @desc Check value is present in config file. If not, use default.
  * @param input_value: the value from config file.
  * @param default_val: the default value from config.
  * @param config_name: name of config.
  * @return set_value - value to use.
*/
var get_config_value = function(input_value, default_val, config_name){
	let set_value = default_val;
	//Warning of using default in case github search limit is missing.
	if(isEmpty(input_value))
		logger.warn(`${config_name} config missing. Taking default as ${set_value}`);
	else
		set_value = input_value;
	return set_value;
}

module.exports = {
	isEmpty,
	validEnv,
	get_config_value
};
