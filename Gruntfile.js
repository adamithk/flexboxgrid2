/*global module:false*/
const sass = require('node-sass');

module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      options: {
          implementation: sass,
          sourceMap: false
      },
      release: {
          files: {
            "flexboxgrid2.css": "src/flexboxgrid2.scss",
            "dist/flexboxgrid2.css": "src/flexboxgrid2.scss"
          }
      }
    },
    myth: {
      compile: {
        expand: true,
        cwd: "css",
        src: ["*.css", "!*.min.css"],
        dest: "css",
        ext: ".css"
      },
      release: {
        files: {
          "flexboxgrid2.css": "flexboxgrid2.css",
          "dist/flexboxgrid2.css": "dist/flexboxgrid2.css"
        }
      }
    },
    cssmin: {
      concat: {
        files: {
          "docs/style.css": [
            "node_modules/normalize.css/normalize.css",
            "docs/src/style.css",
            "flexboxgrid2.css"
          ]
        }
      },
      minify: {
        expand: true,
        cwd: "css",
        src: ["*.css", "!*.min.css"],
        dest: "css",
        ext: ".min.css"
      },
      release: {
        expand: true,
        src: ["flexboxgrid2.css", "dist/flexboxgrid2.css"],
        ext: ".min.css"
      }
    },
    processhtml: {
      dist: {
        options: {
          process: true
        },
        files: {
          "docs/index.html": ["docs/src/index.html"]
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          "docs/index.html": ["docs/index.html"]
        }
      }
    },
    watch: {
      css: {
        files: "src/**/*",
        tasks: ["default"]
      },
      livereload: {
        options: {
          livereload: true
        },
        files: ["index.html", "css/*.css", "js/*.js", "img/*"]
      }
    }
  });
  require('load-grunt-tasks')(grunt);
  // Default task.
  grunt.registerTask("default", [
    "sass",
    "myth",
    "cssmin:concat",
    "cssmin:minify",
    "cssmin:release",
    "processhtml",
    "htmlmin"
  ]);
  grunt.registerTask("watch", ["watch"]);
};
