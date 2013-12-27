/*global module */

module.exports = {
	"Page title is correct": function (test) {
		"use strict";
		test
		.open("http://google.com")
		.assert.title().is("Google", "It has title")
		.done();
	}
};
