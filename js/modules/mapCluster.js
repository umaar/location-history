/*jshint maxparams:20 */

define(["jquery", "pubsub", "googleMapsClusterer"], function ($, pubsub, MarkerClusterer) {

	"use strict";

	var map;
	var markerCluster;
	var subscriptionToken;

	var removeCluster = function () {
		if (markerCluster) {
			markerCluster.clearMarkers();
		}
	};

	var create = function(msg, gMap) {
		map = gMap;
		pubsub.publish("Markers:removeFromMap");
		pubsub.publish("Markers:create");
		subscriptionToken = pubsub.subscribe("Markers:all", clusterise);
		pubsub.publish("Markers:retrieve");
	};

	var clusterise = function (msg, markers) {
		pubsub.unsubscribe(subscriptionToken);
		markerCluster = new MarkerClusterer(map, markers, {
			maxZoom: 14
		});
	};

	var init = function () {
		pubsub.subscribe("Map:filter-clustering", create);
		pubsub.subscribe("Map:clear", removeCluster);
	};

	return {
		init: init
	};
});
