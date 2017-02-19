//
// GRUNT TASK: Copy
// Copies / renames all necessary files.
// -----------------

module.exports = {
  docs: {
    files: [
      { expand: true, src: ['.gitignore'], dest: 'docs' },
      { expand: true, cwd: 'src', src: ['index.html'], dest: 'docs' },
      { expand: true, cwd: 'dist/', src: ['**'], dest: 'docs/' },
      { expand: true, cwd: 'vendor/bootstrap/dist/js', src: ['bootstrap.min.js'], dest: 'docs/libs/bootstrap' },
      { expand: true, cwd: 'vendor/bootstrap-dropmenu/dist/stylesheets/', src: ['bootstrap-dropmenu.min.css'], dest: 'docs/libs/bootstrap-dropmenu/stylesheets' },
      { expand: true, cwd: 'vendor/skywalk-docs/dist/stylesheets', src: ['skywalk-docs.min.css'], dest: 'docs/stylesheets' },
      { expand: true, cwd: 'vendor/skywalk-docs/src/assets', src: ['**'], dest: 'src/docs/assets' }
    ]
  },
  assets: {
    files: [
      { expand: true, cwd: 'vendor/bootstrap/fonts', src: ['*'], dest: 'src/assets/fonts' },
      { expand: true, cwd: 'src/assets', src: ['**'], dest: 'docs/assets' }
    ]
  }
};
