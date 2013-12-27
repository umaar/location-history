/*jshint maxparams:20 */

define(["jquery", "pubsub"], function ($, pubsub) {

	"use strict";

	var create = function() {
		pubsub.publish("Markers:create");
		pubsub.publish("Markers:addToMap");
	};

	var clear = function() {
		pubsub.publish("Markers:removeFromMap");
	};

	var init = function () {
		pubsub.subscribe("Map:filter-marker", create);
		pubsub.subscribe("Map:clear", clear);
	};

	return {
		init: init
	};
});
