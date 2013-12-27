/*global module:false, require:false */

module.exports = function(grunt) {
	"use strict";

	require("load-grunt-tasks")(grunt);

	grunt.initConfig({
		jshint: {
			all: ["Gruntfile.js", "js/**/*.js", "test/**/*.js"],
			options: {
				jshintrc: ".jshintrc"
			}
		},

		connect: {
			server: {
				options: {
					port: 8911,
					livereload: 35729
				}
			}
		},

		dalek: {
			options: {
				browser: [/*"phantomjs",*/ "chrome"],
				dalekfile: false,
				reporter: ["console"]
			},
			dist: {
				src: [
					"test/**/*.js", "!test/sample.js"
				]
			}
		},

		watch: {
			all: {
				files: ["js/**/*.js", "css/*.css", "index.html"],
				tasks: ["jshint"],
			},
			options: {
				spawn: false,
				livereload: 35729
			}
		}
	});

	grunt.registerTask("default", ["jshint", "connect", "watch"]);
	grunt.registerTask("test", ["jshint", "connect", "dalek"]);
};
