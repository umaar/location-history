/*global require, module */

module.exports = (function() {
	"use strict";

	var assert = require("assert");
	var webdriver = require("selenium-webdriver");

	return {
		using: function (library) {
			library.then("the map loads correctly", function(next) {
				this.driver.findElement(webdriver.By.css(".demo-gmap")).then(function(mapContainer){
					assert.ok(mapContainer, "The map container has loaded");
					return mapContainer.findElement(webdriver.By.css(".gm-style"));
				}).then(function(map) {
					assert.ok(map, "The map has loaded via JavaScript");
					next();
				});
			});
		}
	};
}());
