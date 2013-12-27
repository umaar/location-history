/*global require, module */

module.exports = (function() {
	"use strict";

	var assert = require("assert");
	var webdriver = require("selenium-webdriver");

	return {
		using: function (library) {
			library.then("the heatmap filter is selected as default", function(next) {
				this.driver.findElements(webdriver.By.css(".filter-selected")).then(function(filterEl){
					assert.equal(filterEl.length, 1, "There is only one filter selected by default");
					return filterEl[0].getText();
				}).then(function(text) {
					assert.equal(text, "Heatmap", "Heatmap is selected without any user interaction");
					next();
				});
			});
		}
	};
}());
