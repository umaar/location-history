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

		copy: {
			main: {
				files: [
					{expand: true, src: [
						"bower_components/**",
						"css/**",
						"data/**",
						"fonts/**",
						"img/**",
						"js/**",
						"index.html",
						"favicon.ico"

					], dest: "dist/"}
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
};
