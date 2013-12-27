/*global module:false, require:false */

module.exports = function(grunt) {
	"use strict";

	require("matchdep").filterDev("grunt-!(cli)").forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		jshint: {
			all: ["Gruntfile.js", "js/**/*.js"],
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
	grunt.registerTask("test", ["jshint"]);
};
