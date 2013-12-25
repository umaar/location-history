define(["jquery", "pubsub"], function ($, pubsub) {

	"use strict";

	var filterElm;
	var filterSelectedClass = "filter-selected";

	var init = function() {
		attachItemListeners();
	};

	var attachItemListeners = function() {
		$(filterElm).on("click", "a:not('."+ filterSelectedClass +"')", function() {
			setItem($(this));
		});
	};

	var clearSelectedItem = function() {
		$(filterElm).find("a").removeClass(filterSelectedClass);
	};

	var setItem = function(item) {
		if (!item) {
			console.error("Couldn't find locate item to select.");
			return;
		}

		clearSelectedItem();
		item.addClass(filterSelectedClass);
		pubsub.publish("Filter:type", item.attr("href").replace("#", ""));
	};

	return {
		init: function(c) {
			filterElm = $(c.selector);
			if (c.defaultItem) {
				setItem($(filterElm).find(c.defaultItem));
			}
			init();
		}
	};
});
