/* global require, feature, scenarios */

(function() {

	"use strict";
	var glob = require("glob");
	var Yadda = require("yadda");
	Yadda.plugins.mocha();

	var English = require("yadda/lib/localisation/English");
	var Dictionary = require("yadda/lib/Dictionary");
	var dictionary = new Dictionary();
	var library = English.library(dictionary);

	function featureFiles() {
		return glob.sync("test/features/**/*.feature");
	}

	function stepDefs() {
		return glob.sync("test/stepdefs/**/*.js");
	}

	function importStepDef(stepdefs, stepdef) {
		var fileName = stepdef.replace(".js", "");
		var step = require("../../" + fileName);
		step.using(library);
	}

	stepDefs().reduce(importStepDef, []);
	var context = require("./library").init();
	var yadda = new Yadda.Yadda(library, context);

	featureFiles().forEach(function(file) {
		feature(file, function(feature) {
			scenarios(feature.scenarios, function(scenario, done) {
				yadda.yadda(scenario.steps, done);
			});
		});
	});

}());


