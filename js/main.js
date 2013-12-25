requirejs.config({
	paths: {
		"async": "../bower_components/requirejs-plugins/src/async",
		"jquery": "../bower_components/jquery/index",
		"pubsub": "../bower_components/pubsub-js/src/pubsub",
		"mapController": "modules/mapController",
		"dataController": "modules/dataController",
		"googleMaps": "modules/googleMaps",
		"filterControls": "modules/filterControls",
		"mapHeatmap": "modules/mapHeatmap",
		"mapMarker": "modules/mapMarker",
		"mapCluster": "modules/mapCluster",
		"markerManager": "modules/markerManager",
		"googleMapsClusterer": "../bower_components/maps-clusterer/index"
	},
	shim: {
		"googleMapsClusterer": {
			exports: "MarkerClusterer"
		}
	}
});

/*jshint maxparams:20 */
requirejs([
	"jquery",
	"mapController",
	"dataController",
	"filterControls"
], function ($, mapController, dataController, filterControls) {
	"use strict";

	$(function() {

		mapController.init({
			selector: ".demo-gmap"
		});

		dataController.init({
			dataUrl: "../data/LocationHistory.json"
		});

		filterControls.init({
			defaultItem: ".filter-heatmap",
			selector: ".filter"
		});

	});

});
