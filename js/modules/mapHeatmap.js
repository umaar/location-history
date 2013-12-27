/*jshint maxparams:20 */

define(["jquery", "pubsub", "googleMaps"], function ($, pubsub, maps) {

	"use strict";

	var map;
	var heatmap;
	var locationData;

	var handleMapData = function (msg, data) {
		locationData = data;
	};

	var removeHeatmap = function () {
		if (heatmap) {
			heatmap.setMap(null);
		}
	};

	var create = function(msg, gMap) {
		map = gMap;
		var pointArray = new maps.MVCArray(locationData);
		heatmap = new maps.visualization.HeatmapLayer({
			data: pointArray
		});
		heatmap.setOptions({maxIntensity: 10});
		heatmap.setMap(map);
	};

	var init = function () {
		pubsub.subscribe("Map:data", handleMapData);
		pubsub.subscribe("Map:filter-heatmap", create);
		pubsub.subscribe("Map:clear", removeHeatmap);
	};

	return {
		init: init
	};
});
