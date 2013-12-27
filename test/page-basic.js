/*global module */

module.exports = {
	"Page title is correct": function (test) {
		"use strict";
		test
		.open("http://127.0.0.1:8911")
		.assert.title().is("Location histsory", "It has the correct title")
		.done();
	}
};
