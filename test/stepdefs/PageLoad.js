/*global require, module */

module.exports = (function() {
	"use strict";

	var assert = require("assert");
	// var webdriver = require("selenium-webdriver");

	return {
		using: function (library) {
			library.when("I navigate to the location history page", function(next) {
				this.driver.get("http://127.0.0.1:8912/")
				.then(function() {
					next();
				});
			});

			library.then("I should see the correct page title", function(next) {
				this.driver.getTitle().then(function(title) {
					assert.equal(title, "Location history", "Title is correct");
					next();
				});
			});
		}
	};
}());
