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
			dev: {
				options: {
					port: 8911,
					livereload: 35729
				}
			},
			test: {
				options: {
					port: 8912
				}
			}
		},

		shell: {
			"mocha": {
				options: {
					stdout: true,
					failOnError: true
				},
				command: "./node_modules/mocha/bin/mocha --timeout 50000 --reporter spec test/runner/run.js"
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

	grunt.registerTask("default", ["jshint", "connect:dev", "watch"]);
	grunt.registerTask("test", ["jshint", "connect:test", "shell:mocha"]);
};
