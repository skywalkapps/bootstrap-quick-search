/* jshint node: true */

module.exports = function(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/**\n' +
              '* <%= pkg.name %>.js v<%= pkg.version %>\n' +
              '*/\n',

    // Clean task, removes all files and folders in /dist.
    clean: {
      build: ['dist']
    },

    /*
      Reads the projects .jshintrc file and applies coding
      standards.
    */
    jshint: {
      options: {
        jshintrc: 'src/javascripts/.jshintrc'
      },
      grunt: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: ['Gruntfile.js']
      },
      src: {
        src: 'src/javascripts/*.js'
      }
    },


    copy: {
      styles: {
        files: [
          { expand: true, cwd: 'bower_components/bootstrap/less', src: ['*.less'], dest: 'src/stylesheets/lib/bootstrap' }
        ]
      },
      js: {
        files: [
          { expand: true, cwd: 'bower_components/bootstrap/dist/js/', src: ['bootstrap.js'], dest: 'src/javascripts/lib/bootstrap', filter: 'isFile' },
          { expand: true, cwd: 'bower_components/jquery/', src: ['jquery.min.js'], dest: 'src/javascripts/lib/jquery', filter: 'isFile' }
        ]
      },
      assets: {
        files: [
          { expand: true, cwd: 'src/assets', src: ['**'], dest: 'dist/assets' }
        ]
      },
    },

    uglify: {
      js: {
        options: {
          banner: '<%= banner %>'
        },
        files: [
          {
            src: ['dist/javascripts/<%= pkg.name %>.js'],
            dest: 'dist/javascripts/<%= pkg.name %>.min.js'
          }
        ]
      }
    },

    compress: {
      main: {
        options: {
          mode: 'gzip'
        },
        files: [
          {expand: true, src: ['dist/javascripts/<%= pkg.name %>.min.js'], dest: '', ext: '.gz.js'}
        ]
      }
    },



    less: {
      main: {
        files: {
          'dist/stylesheets/<%= pkg.name %>.css': 'src/stylesheets/app.less'
        }
      },

      mainCompressed: {
        options: {
          cleancss: true,
          report: 'min'
        },
        files: {
          'dist/stylesheets/<%= pkg.name %>.min.css': 'dist/stylesheets/<%= pkg.name %>.css'
        }
      }
    },

    csslint: {
      options: {
        csslintrc: 'src/stylesheets/.csslintrc'
      },
      src: [
        'dist/stylesheets/<%= pkg.name %>.css'
      ]
    },


    /*
       A simple ordered concatenation strategy.
    */
    neuter: {
      main: {
        options: {
          // This should be achieved by basePath, but doesn't work for some reason
          filepathTransform: function(filepath){ return 'src/javascripts/' + filepath; },
          template: '{%= src %}'
        },
        dest:'dist/javascripts/<%= pkg.name %>.js',
        src: 'src/javascripts/app.js'
      }
    },

    // Watch for changes in styles and javascript and compile them on-the-fly
    watch: {
      styles: {
        options: {
          livereload: true
        },
        files: ['src/stylesheets/**/*.less'],
        tasks: ['less']
      },
      js: {
        files: 'src/javascripts/**/*.js',
        tasks: ['neuter', 'uglify']
      }
    },

    // grunt-express will serve the files from the folders listed in `bases`
    // on specified `port` and `hostname`
    express: {
      all: {
        options: {
          port: 9999,
          hostname: "0.0.0.0",
          bases: [__dirname] // Replace with the directory you want the files served from
                             // Make sure you don't use `.` or `..` in the path as Express
                             // is likely to return 403 Forbidden responses if you do
                             // http://stackoverflow.com/questions/14594121/express-res-sendfile-throwing-forbidden-error
        }
      }
    },

    // grunt-open will open your browser at the project's URL
    open: {
      all: {
        // Gets the port from the connect configuration
        path: 'http://localhost:<%= express.all.options.port%>'
      }
    }

  });

  // These plugins provide necessary tasks
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-neuter');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-open');

  // Default build task
  grunt.registerTask('default', ['clean', 'copy', 'dist-css', 'dist-js']);

  // JS tasks
  grunt.registerTask('dist-js', ['neuter', 'uglify', 'compress']);
  grunt.registerTask('dev-js', ['neuter', 'uglify', 'jshint']);

  // CSS tasks
  grunt.registerTask('dist-css', ['less']);
  grunt.registerTask('dev-css', ['less', 'csslint']);

  // Server task
  grunt.registerTask('server', ['express', 'open', 'express-keepalive']);
};
