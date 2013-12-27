/*global module, require, before, after */

module.exports = (function() {

	"use strict";

	return {
		init: function() {
			var webdriver = require("selenium-webdriver");
			var context = {};

			function initBrowser(done) {
				var driver = new webdriver.Builder()
					.usingServer()
					.withCapabilities({"browserName": "phantomjs"})
					.build();
				driver.manage().timeouts().implicitlyWait(15000);
				context.driver = driver;
				done();
			}

			function shutdownBrowser(done) {
				context.driver.quit().then(function() {
					done();
				});
			}

			before(initBrowser);
			after(shutdownBrowser);

			return context;
		}
	};

}());





