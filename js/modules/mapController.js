/*jshint maxparams:20 */
define([
	"jquery",
	"pubsub",
	"markerManager",
	"googleMaps",
	"mapHeatmap",
	"mapCluster",
	"mapMarker"
], function ($, pubsub, markerManager, maps, mapHeatmap, mapCluster, mapMarker) {

	"use strict";

	var mapEl;
	var filterType;
	var map;
	var locationData = [];

	var centerMap = function() {
		var latlngbounds = new maps.LatLngBounds();
		locationData.forEach(function (locationItem) {
			latlngbounds.extend(locationItem);
		});
		map.setCenter(latlngbounds.getCenter());
		map.fitBounds(latlngbounds);
	};

	var initialiseMap = function (data) {
		if (!map) {
			map = new maps.Map(mapEl[0], {
				mapTypeId: maps.MapTypeId.ROADMAP
			});

			data.forEach(function(location) {
				var locationItem = new maps.LatLng(location.latitudeE7 / 1e7, location.longitudeE7 / 1e7);
				locationItem.metadata = {
					timestamp: location.timestampMs
				};
				locationData.push(locationItem);
			});

			pubsub.publish("Map:data", locationData);
			pubsub.publish("Map:center");

			markerManager.init({
				map: map,
				locationData: locationData
			});
		}
	};

	var createMap = function(undefined, data) {
		initialiseMap(data.locations);
		pubsub.publish("Map:clear");
		pubsub.publish("Map:" + filterType, map);
	};

	var handleFilter = function(msg, type) {
		if (!type) {
			console.error("Expected a filter type");
		}

		filterType = type;
		if (locationData.length) {
			pubsub.publish("Data:processed", locationData);
		} else {
			pubsub.publish("Data:process");
		}
	};

	var init = function() {
		mapMarker.init();
		mapCluster.init();
		mapHeatmap.init();
		pubsub.subscribe("Data:processed", createMap);
		pubsub.subscribe("Filter:type", handleFilter);
		pubsub.subscribe("Map:center", centerMap);
	};

	return {
		init: function(c) {
			mapEl = $(c.selector);
			if (mapEl) {
				init();
			}
		}
	};
});
