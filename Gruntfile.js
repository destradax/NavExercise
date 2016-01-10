'use strict';
module.exports = function (grunt) {

	// Load all grunt tasks
	require('load-grunt-tasks')(grunt);

	// Configurable paths for the application
	var navExerciseConfig = {
		dist: 'public'
	};

	// Define the configuration for all the tasks
	grunt.initConfig({

		// Project settings
		conf: navExerciseConfig,

		// Make sure there are no obvious mistakes
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			default: {
				src: [
					'Gruntfile.js',
					'<%= conf.dist %>/scripts/*.js'
				]
			}
		},

		watch: {
			default: {
				files: [
					'Gruntfile.js',
					'.jshintrc',
					'<%= conf.dist %>/scripts/*.js',
				],
				tasks: ['jshint']
			},
		}
	});

	grunt.registerTask('default', ['watch']);
};
