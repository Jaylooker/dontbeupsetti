var twit = require('twit');
var twitterbot = require('node-twitterbot').TwitterBot;
var json = require('big-json');
var pexelapi = require('pexels-api-wrapper');
var pixabayclient = require('pixabayjs');
var giphyapi = require('giphy-js-sdk-core');

//Assign bot to account
var bot = new TwitterBot({
 consumer_key: process.env.BOT_CONSUMER_KEY,
 consumer_secret: process.env.BOT_CONSUMER_SECRET,
 access_token: process.env.BOT_ACCESS_TOKEN,
 access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET
});

//Assign Pexel API key
var pexelclient = pexelapi(process.env.PEXEL_API_KEY);

//Assign Pixabay API key 
pixabayclient.authenticate(process.env.PIXABAY_API_KEY);
pixabayclient.defaults = {safesearch: true};

//Assign Giphy API
var giphyclient = GphApiClient(process.env.GIPHY_API_KEY);

//Get spaghetti photos and gifs

/**
* Returns search results of images from Pexel API
* @param {string} word search term
* @returns {JSON} Parsed json object of results
*/
function searchpexel(word)
{
	pexelclient.search(word)
	.then(response => 
	{
	return JSON.parse(response);
	})
	.catch (err =>
	{
	console.log(err);
	return -1;
	});
}

/**
* Returns search results of images from Pixabay API
* @param {string[]} wordarray array of search term
* @returns {JSON} Parsed json object of results
*/
function searchpixabay(wordarray) {
	return pixabayclient.imageResultList(wordarray, pixabayoptions, pixabaysuccess, pixabaysuccess)
}

var pixabayoptions = {} 

var pixabaysuccess = response => {
	return JSON.parse(response);
}

var pixabayfailure = err => {
	console.log(err);
	return -1;
}

/**
* Returns search results of images from Giphy API
* @param {string} word search term
* @returns {JSON} Parsed json object of results
*/
function searchgiphy(word) 
{
	giphyclient.search('gifs', {"q": word})
	.then(response => 
	{
		return JSON.parse(response);
	})
	.catch (err =>
	{
		console.log(err);
		return -1;
	});
}

/**
* Returns an image from one Pexel API json object 
* @param {JSON} parsedjsonobject parsed json object
* @returns {Image} image image object
*/
function getpexelsource(parsedjsonobject) 
{
	var image = new Image();
	
	image.src = parsedjsonobject.src.medium;

	return image;
}

/**
* Return an image from one Pixabay API json object
* @param {JSON} parsedjsonobject parsed json object
* @returns {Image} image image object
*/
function getpixabaysource(parsedjsonobject) 
{
	var image = new Image();

	image.src = parsedjsonobject.imageURL;

	return image;
}

/**
* Returns an gif from one Giphy API jsonobject
* @param {JSON} parsedjsonobject parsed json object
* @returns {File} gif file object of gif
*/
function getgiphysource(parsedjsonobject) 
{
	var gif = new File();
	//todo saving .gif from source
}

/**
* Returns id of pexel image
* @param {JSON} parsedjsonobject parsed json object
* @returns {string} id of image
*/
function getpexelid(parsedjsonobject)
{
	return parsedjsonobject.url.replace("https://www.pexels.com/photo/", "");
}

/**
* Returns id of pixabay image
* @param {JSON} parsedjsonobject parsed json object
* @returns {string} id of image
*/
function getpixabayid(parsedjsonobject)
{
	return parsedjsonobject.id;
}

/**
* Returns of gihpy gif
* @param {JSON} parsedjsonobject parsed json object
* @returns {string} id of image
*/
function getgiphyid(parsedjsonobject)
{
	return parsedjsonobject.id;
}

//Store IDs of posted media in db possibly

//Tweet at longer than long enough intervals 