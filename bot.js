/**
 * @author Jack Bartolone
 * @description Javascript Twitter bot that tweets spaghetti images and gifs
 * @copyright Jack Bartolone 2018
 * @license ISC 
 */

const twitterbot = require('node-twitterbot').TwitterBot; //CommonJS module
const json = require('big-json');
const pexelapi = require('pexels-api-wrapper');
const pixabayclient = require('pixabayjs'); //has vulnerabilities from packages, update superagent package
const giphyapi = require('giphy-js-sdk-core');
const { Client } = require('pg');

//Assign bot to account
var bot = new twitterbot({
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
var giphyclient = giphyapi(process.env.GIPHY_API_KEY);

//Assign DB connection
const db = new Client({ 
	connectionString: process.env.DATABASE_URL,
	ssl: true
})

//connect DB
db.connect()
.catch((err) => {
	console.log("database.connect() error: " + err)
});

// spaghetti read to be stored
var spaghetti = searchall("spaghetti");

//Store IDs of posted media in db possibly

//Tweet URLs of images and gifs 
bot.addAction("postpexelimg", (twitter, action, tweet) => {
	tweetstring(queryrandomrow("pexel"));
});

bot.addAction("postpixabayimg", (twitter, action, tweet) => {
	tweetstring(queryrandomrow("pixabay"));
});

bot.addAction("postgiphygif", (twitter, action, tweet) => {
	tweetstring(queryrandomrow("giphy"));
});

//Tweet at longer than long enough intervals 

/**
* Returns search results from all API
* @param {string} word search term
* @returns {JSON} Json object of results 
*/
function searchall(word) {
	var resultpexel = searchpexel(word);
	var resultpixabay = searchpixabay([word]);
	var resultgiphy = searchgiphy(word);

	return { 
		pexel: resultpexel,
		pixabay: resultpixabay,
		giphy: pixabay
	}
}

/**
* Returns search results of images from Pexel API
* @param {string} word search term
* @returns {JSON} Parsed json object of results
*/
function searchpexel(word) {
	pexelclient.search(word)
	.then((response) => 
	{
	return JSON.parse(response);
	})
	.catch ((err) =>
	{
	console.log("searchpexel() error: " + err);
	return {"error": err };
	});
}

/**
* Returns search results of images from Pixabay API
* @param {string[]} wordarray array of search term
* @returns {JSON} Parsed json object of results
*/
function searchpixabay(wordarray) {
	return pixabayclient.imageResultList(wordarray, pixabayoptions, pixabaysuccess, pixabayfailure);
}

var pixabayoptions = {} 

var pixabaysuccess = (response) => {
	return JSON.parse(response);
}

var pixabayfailure = (err) => {
	console.log("searchpixabay() error: "+ err);
	return {"error": err };
}

/**
* Returns search results of images from Giphy API
* @param {string} word search term
* @returns {JSON} Parsed json object of results
*/
function searchgiphy(word) {
	giphyclient.search('gifs', {"q": word})
	.then((response) => 
	{
		return JSON.parse(response);
	})
	.catch ((err) =>
	{
		console.log("searchgiphy() error: " + err);
		return {"error": err };
	});
}

/**
* Returns the image URL from one Pexel API json object 
* @param {JSON} parsedjsonobject parsed json object
* @returns {string} image URL
*/
function getpexelURL(parsedjsonobject) {
	return parsedjsonobject.src.medium;
}

/**
* Return the image URL from one Pixabay API json object
* @param {JSON} parsedjsonobject parsed json object
* @returns {string} image URL
*/
function getpixabayURL(parsedjsonobject) {
	return parsedjsonobject.imageURL;
}

/**
* Returns the gif URL from one Giphy API jsonobject
* @param {JSON} parsedjsonobject parsed json object
* @returns {string} gif URL
*/
function getgiphyURL(parsedjsonobject) {
	return parsedjsonobject.images.original.url
}

/**
* Returns id of pexel image
* @param {JSON} parsedjsonobject parsed json object
* @returns {string} id of image
*/
function getpexelid(parsedjsonobject) {
	return parsedjsonobject.url.replace("https://www.pexels.com/photo/", "");
}

/**
* Returns id of pixabay image
* Note: Duplicate of getgiphyid() as API may change in future
* @param {JSON} parsedjsonobject parsed json object
* @returns {string} id of image
*/
function getpixabayid(parsedjsonobject) {
	return parsedjsonobject.id;
}

/**
* Returns id of gihpy gif
* Note: Duplicate of getpixabayid() as API may change in future
* @param {JSON} parsedjsonobject parsed json object
* @returns {string} id of image
*/
function getgiphyid(parsedjsonobject){
	return parsedjsonobject.id;
}

/**
* Tweets a string
* @param {string} string string to tweet
*/
function tweetstring(string) {
	bot.tweet(string, (err, response) => {
		if(string == null) {
			console.log("tweetstring() error: null string");
			return;
		}
		if(err) {
			console.log("tweetstring() error: "+ err);
		}
	})
}

/**
* Queries random row from select media table and returns its URL
* @param {string} table name of table to query 
* @returns {string} URL of media
* Note: should be done server side with PL/pgSQL but current setup through Heroku requires done client side
*/
function queryrandomrow(table) {
	db.query("SELECT id " + 
			"FROM $1" + 
			" OFFSET  floor(random() * (" +
				"SELECT COUNT(*) " + 
				"FROM $1) " +
				"LIMIT 1" , [table])
		.then((res) => {
			return res;
		})
		.catch((err) => {
			console.log("queryrandomrow() error: " + err);
			return;
		});

}

/**
* Stores id, URL pair in a table
* @param {string} table name of table to query 
* @param {string} id of table to query 
* @param {string} url name of table to query 
* Note: should be done server side with PL/pgSQL but current setup through Heroku requires done client side
*/
function storevalues(table, id, url) {
	db.query("INSERT INTO $1 (id, url) VALUES ($2, $3)", [table, id, url])
	.catch((err) => {
		console.log("storevalues() error: " + err);
	})
}