var twit = require(‘twit’);
var twitterbot = require(‘node-twitterbot’).TwitterBot;

//Assign bot to account
var bot = new TwitterBot({
 consumer_key: process.env.BOT_CONSUMER_KEY,
 consumer_secret: process.env.BOT_CONSUMER_SECRET,
 access_token: process.env.BOT_ACCESS_TOKEN,
 access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET
});

//Do bot stuff

//Get spaghetti photos

//Store in db possibly

//Tweet at longer than long enough intervals 