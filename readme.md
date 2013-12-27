# Location History

#### Preview locally
* Download [location-history/archive/gh-pages.zip](https://github.com/umaar/location-history/archive/gh-pages.zip).
* Serve up the extracted folder through a web server.
````
python -m SimpleHTTPServer 8911
````

#### Development
Run the following commands and open up `http://127.0.0.1:8911/`. LiveReload is enabled by default.
````
git clone https://github.com/umaar/location-history.git
cd location-history

# Runs npm install , bower install and starts a webserver with grunt.
npm start

#Runs tests - requires phantomjs
npm test
````

## TODO
* drag and drop file upload over the map
* random long/lat generator
