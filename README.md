# dontbeupsetti
---
Twitter bot that tweets spaghetti. Follow [@dontbeupsetti](https://twitter.com/dontgetupsetti).

## Installation
---

### Git
Initialize repo
```
git init
```

Add node .gitignore ([source](https://stackoverflow.com/a/4909267))
```
git config core.sparseCheckout true
//windows
echo github/gitignore/Node.gitignore > .git/info/sparse-checkout
//non-windows
echo 'github/gitignore/Node.gitignore' > .git/info/sparse-checkout
//retrieve only one file
git remote add -f origin https://github.com/github/gitignore.git
git pull origin master
```

### Node
Install node (includes npm).

Create a folder and create a new app with a package.json.
```
mkdir appname
npm init
```
...without selecting options
```
npm init -y
```

Istall packages and update dependencies for each.
```
npm install <package-name> --save
```

### Heroku
Install heroku and create account.

Login...
```
heroku login
```
Go to location of app
```
heroku apps: create <same-appname>
```

## Dependencies
---

+ [heroku](https://www.heroku.com/home) - cloud hosting for scalable apps
+ [node.js](https://nodejs.org/en/) - network library
+ [npm](https://www.npmjs.com/) - package manager
+ [twit](https://www.npmjs.com/package/twit) - twitter API client 
+ [twitterbot](https://www.npmjs.com/package/twitterbot) - twitter bot wrapper
+ [cheerio.js](https://cheerio.js.org/) - lean JQuery library for npm
+ [big-json](https://www.npmjs.com/package/big-json) - JSON streaming for large JSON objects
+ [pexels-api-wrapper](https://www.npmjs.com/package/pexels-api-wrapper) - API for [Pexels](https://www.pexels.com/) images
+ [pixabayjs](https://www.npmjs.com/package/pixabayjs) - API for [Pixabay](https://pixabay.com/) images
+ [giphy](https://developers.giphy.com/docs/) - API for [GIPHY](https://giphy.com/) gifs
+ [node-postgres](https://www.npmjs.com/package/pg) - API for Postgres database
