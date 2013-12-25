define(["jquery", "pubsub"], function ($, pubsub) {

	"use strict";

	var url;

	var processData = function(data) {
		if (!data) {
			console.error("Expected data to have been loaded.");
			return;
		}

		pubsub.publish("Data:processed", data);
	};

	var handleError = function(err) {
		console.error("There was an error loading data from ", url, err);
	};

	var fetchData = function() {
		if (!url) {
			console.error("Was expecting a url to the load data from.");
			return;
		}

		$.ajax({
			dataType: "json",
			url: url,
			success: processData,
			error: handleError
		});
	};

	var init = function() {
		pubsub.subscribe("Data:process", fetchData);
	};

	return {
		init: function(c) {
			url = c.dataUrl;
			init();
		}
	};
});
