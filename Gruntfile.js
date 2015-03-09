/* jshint node: true */
var path = require('path');

module.exports = function(grunt) {
  "use strict";

  // Load the plugins
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  var config = {
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/**\n' +
              '* <%= pkg.name %>.js v<%= pkg.version %>\n' +
              '*/\n'
  };

  // Clean task, removes all files and folders in /dist.
  config.clean = {
    build: ['dist']
  };

  config.copy = {
    js: {
      files: [
        { expand: true, cwd: 'bower_components/jquery/', src: ['jquery.min.js'], dest: 'src/javascripts/lib/jquery', filter: 'isFile' }
      ]
    },
    assets: {
      files: [
        { expand: true, cwd: 'src/assets', src: ['**'], dest: 'dist/assets' },
        { expand: true, cwd: 'bower_components/bootstrap/fonts', src: ['*'], dest: 'src/assets/fonts' }
      ]
    },
  };

  // Reads the projects .jshintrc file and applies coding standards.
  config.jshint = {
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
  };

  // Simple concat
  config.concat = {
    dist: {
      src: ['src/javascripts/bootstrap-quick-search.js'],
      dest: 'dist/javascripts/<%= pkg.name %>.js',
    }
  };


  // Minifies concatenated JS file and adds banner to it
  config.uglify = {
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
  };


  // Creates Gziped JS
  config.compress = {
    main: {
      options: {
        mode: 'gzip'
      },
      files: [
        {expand: true, src: ['dist/javascripts/<%= pkg.name %>.min.js'], dest: '', ext: '.gz.js'}
      ]
    }
  };

  // Builds LESS styles into CSS
  config.less = {
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
  };

  // Checks coding standards in CSS files
  config.csslint = {
    options: {
      csslintrc: 'src/stylesheets/.csslintrc'
    },
    src: [
      'dist/stylesheets/<%= pkg.name %>.css'
    ]
  };


  // grunt-express will serve the files from the folders listed in `bases`
  // on specified `port` and `hostname`
  config.express = {
    all: {
      options: {
        bases: path.resolve('./'),
        port: 8080,
        hostname: "0.0.0.0",
        livereload: true
      }
    }
  };



  // grunt-open will open your browser at the project's URL
  config.open = {
    all: {
      // Gets the port from the connect configuration
      path: 'http://localhost:<%= express.all.options.port%>'
    }
  };

  // Watch for changes in styles and javascript and compile them on-the-fly
  config.watch = {
    options: {
      livereload: true
    },
    styles: {
      files: ['src/stylesheets/**/*.less'],
      tasks: ['less']
    },
    js: {
      files: 'src/javascripts/**/*.js',
      tasks: ['concat']
    }
  };

  // Project configuration
  grunt.initConfig(config);


  // BUILD TASKS
  // -------------------------

  // Default build task
  grunt.registerTask('default', ['clean', 'copy', 'dist-css', 'dist-js']);

  // JS tasks
  grunt.registerTask('dist-js', ['neuter', 'uglify', 'compress']);
  grunt.registerTask('dev-js', ['neuter', 'jshint']);

  // CSS tasks
  grunt.registerTask('dist-css', ['less']);
  grunt.registerTask('dev-css', ['less', 'csslint']);

  // Server task
  grunt.registerTask('server', ['express','express-keepalive','open', 'watch']);
};
