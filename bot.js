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

//function for Pexel
function searchpixel(word, resultsperpage, page)
{
	pixelclient.search(word, resultsperpage, page)
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

//function for Pixabay
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

//function for Giphy
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

//Store IDs of posted media in db possibly

//Tweet at longer than long enough intervals 