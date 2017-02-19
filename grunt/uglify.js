//
// GRUNT TASK: Uglify
// Minifies compiled javascript
// -----------------

module.exports = {
    options: {
      mangle: false
    },
    my_target: {
      files: {
        'dist/javascripts/<%= package.name %>.min.js': ['dist/javascripts/<%= package.name %>.js']
      }
    }
};
