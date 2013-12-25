define(["jquery", "pubsub"], function ($, pubsub) {

	"use strict";

	var myVar;

	var start = function() {
		console.log($, pubsub);
	};

	return {
		init: function(c) {
			myVar = $(c.selectors.start);
			start();
		}
	};
});
