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
    dist: ['dist'],
    docs: ['docs']
  };


  // Copies all necessary files to the distribution folder
  config.copy = {
    assets: {
      files: [
        { expand: true, cwd: 'vendor/bootstrap/fonts', src: ['*'], dest: 'src/assets/fonts' },
        { expand: true, cwd: 'src/assets', src: ['**'], dest: 'docs/assets' }
      ]
    },
    docs: {
      files: [
        { expand: true, src: ['.gitignore'], dest: 'docs' },
        { expand: true, cwd: 'src', src: ['index.html'], dest: 'docs' },
        { expand: true, cwd: 'vendor/prism', src: ['prism.js'], dest: 'docs/libs/prism' },
        { expand: true, cwd: 'vendor/bootstrap/dist/js', src: ['bootstrap.min.js'], dest: 'docs/libs/bootstrap' },
        { expand: true, cwd: 'vendor/prism/themes', src: ['*'], dest: 'docs/libs/prism' }
      ]
    }
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
    },
    docs: {
      src: ['src/javascripts/bootstrap-quick-search.js'],
      dest: 'docs/javascripts/<%= pkg.name %>.js',
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
    dev: {
      files: {
        'dist/stylesheets/<%= pkg.name %>.css': 'src/stylesheets/index.less',
        'docs/stylesheets/docs.css': 'src/stylesheets/docs.less'
      }
    },

    dist: {
      options: {
        cleancss: true,
        report: 'min'
      },
      files: {
        'dist/stylesheets/<%= pkg.name %>.min.css': 'dist/stylesheets/<%= pkg.name %>.css',
        'dist/stylesheets/docs.min.css': 'dist/stylesheets/docs.css'
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
    },
    docs: {
      files: 'src/*.html',
      tasks: ['copy:docs']
    }
  };

  config.shell = {
    target: {
      command: 'sh ./grunt/gh-pages.sh'
    }
  };

  // Project configuration
  grunt.initConfig(config);


  // BUILD TASKS
  // -------------------------

  // Default build task
  grunt.registerTask('default', ['clean:dist', 'dist-css', 'dist-js']);

  // Documentation build task
  grunt.registerTask('docs', ['clean:docs', 'copy', 'less:dev', 'concat:docs', 'shell']);

  // JS tasks
  grunt.registerTask('dist-js', ['concat', 'uglify', 'compress']);
  grunt.registerTask('dev-js', ['concat', 'jshint']);

  // CSS tasks
  grunt.registerTask('dist-css', ['less']);
  grunt.registerTask('dev-css', ['less', 'csslint']);

  // Server task
  grunt.registerTask('server', ['express','express-keepalive','open', 'watch']);
};
