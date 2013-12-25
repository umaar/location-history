define("googleMaps", ["async!https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&libraries=visualization"],
function(){
	"use strict";
	return window.google.maps;
});
