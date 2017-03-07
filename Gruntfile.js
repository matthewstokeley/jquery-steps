module.exports = function(grunt) {
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': 'src/<% pkg.name %>.js',
                    'dist/<%= pkg.name %>.jquery.min.js': 'src/<%= pkg.name %>.jquery.js'
                }
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true, 
                eqnull: true,
                browser: true,
                reporter: 'jslint',
                reporterOutput: 'reports/jshint.xml',
                globals: {
                    jQuery: true
                },
            },
            all: ['src/**/*.js']
        },
        watch: {
            scripts: {
                files: ['src/**/*.js'],
                tasks: ['build-js'],
                options: {
                    spawn: false,
                },
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('build-js', ['jshint', 'uglify']);
    grunt.registerTask('build', ['build-js']);

};
