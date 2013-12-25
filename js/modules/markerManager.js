define(["jquery", "pubsub", "googleMaps"], function ($, pubsub, maps) {

	"use strict";

	var markers = [];
	var locationData;
	var map;
	var infowindow;
	var geocoder = new maps.Geocoder();

	var closeInfoWindows = function() {
		if (infowindow && infowindow.close) {
			infowindow.close();
		}
	};

	var createPopupWindowContent = function(data) {
		var content = "";
		if (data.address) {
		/* jshint camelcase: false */
			content += "<p>" + data.address.formatted_address + "</p>";
		}
		content += "<p>" + new Date(parseFloat(data.timestamp)).toString() + "</p>";
		return content;
	};

	var geocode = function(location, infowindow) {
		geocoder.geocode({"latLng": location}, function(results, status) {
			if (status === maps.GeocoderStatus.OK) {
				if (results[1]) {
					var content = createPopupWindowContent({
						timestamp: location.metadata.timestamp,
						address: results[1]
					});
					infowindow.setContent(content);
				}
			}
		});
	};

	var attachMarkerListener = function(marker, location) {
		maps.event.addListener(marker, "click", function() {
			closeInfoWindows();
			infowindow = new maps.InfoWindow();
			infowindow.open(map,marker);
			infowindow.setContent(createPopupWindowContent({
				timestamp: location.metadata.timestamp,
			}));
			geocode(location, infowindow);
		});
	};

	var createSingleMarker = function(location) {
		var marker = new maps.Marker({
			position: location
		});

		attachMarkerListener(marker, location);
		return marker;
	};

	var createMarkers = function() {
		if (markers.length < 1) {
			locationData.forEach(function(locationItem) {
				var marker = createSingleMarker(locationItem);
				markers.push(marker);
			});
		}
	};

	var addMarkersToMap = function() {
		markers.forEach(function(marker) {
			marker.setMap(map);
		});
	};

	var destroyMarkers = function() {

	};

	var removeMarkersFromMap = function() {
		if (markers.length > 0) {
			markers.forEach(function(marker) {
				marker.setMap(null);
			});
		}
	};

	var getMarkers = function () {
		pubsub.publish("Markers:all", markers);
	};

	var init = function(config) {
		if (!config.map) {
			console.error("Expected a map object");
			return;
		}

		if (!config.locationData) {
			console.error("Expected some initial map data");
			return;
		}

		map = config.map;
		locationData = config.locationData;
		pubsub.subscribe("Markers:retrieve", getMarkers);
		pubsub.subscribe("Markers:create", createMarkers);
		pubsub.subscribe("Markers:destroy", destroyMarkers);
		pubsub.subscribe("Markers:addToMap", addMarkersToMap);
		pubsub.subscribe("Markers:removeFromMap", removeMarkersFromMap);
	};

	return {
		init: init
	};
});
