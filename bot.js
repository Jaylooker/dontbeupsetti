var twit = require('twit');
var twitterbot = require('node-twitterbot').TwitterBot;
var pexelapi = require('pexels-api-wrapper');
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
var pixabaykey = process.env.PIXABAY_API_KEY;

//Assign Giphy API
var giphyclient = GphApiClient(process.env.GIPHY_API_KEY);

//Get spaghetti photos and gifs

//pasta results for Pexel
/*pixelclient.search("pasta", 10, 1)
.then((response) => 
{
})
.catch ((err)) =>
{
	
}
*/

//pasta results for Pixabay
//var pastaurl = "https://pixabay.com/api/?key=" + pixabaykey + "&q" + encodeURIComponent("pasta");

//pasta results for Giphy
/*giphyclient.search('gifs', {"q": "pasta"})
.then((response) => {
	response.data.foreach(gifObject) => {
		console.log(gifObject);
	})
})
.catch ((err)) => 
{
	
})
*/

//Store IDs of posted media in db possibly

//Tweet at longer than long enough intervals 