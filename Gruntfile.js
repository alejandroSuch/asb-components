'use strict';

module.exports = function (grunt) {
    // load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        watch: {
            asbComponents: {
                files: ['src/**/*.js', 'test/**/*.js'],
                tasks: ['runAll'],
                options: {
                    livereload: true
                }
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },

            asbComponents: ['src/**/*.js']
        },

        clean: {
            asbComponents: ['asb-components.js', 'asb-components.clean.js', 'asb-components.min.js']
        },

        concat: {
            asbComponents: {
                src: [
                    ['src/**/*.js']
                ],
                dest: 'asb-components.js'
            }
        },

        groundskeeper: {
            asbComponents: {
                files: {
                    'asb-components.clean.js': 'asb-components.js' // 1:1 compile
                }
            }
        },

        uglify: {
            asbComponents: {
                files: [
                    {src: 'asb-components.clean.js', dest: 'asb-components.min.js'}
                ]
            }
        },

        karma: {
            unit: {
                configFile: 'my.karma.js',
                background: true,
                browsers: ['Chrome']
            },

            continuous: {
                configFile: 'my.karma.js',
                singleRun: true,
                browsers: ['Chrome']
            }
        }
    });

    grunt.registerTask(
        'default',
        [
            'jshint:asbComponents', 'clean:asbComponents', 'concat:asbComponents', 'groundskeeper:asbComponents',
            'uglify:asbComponents', 'karma:continuous'
        ]
    );
};