# Leonardo Static Site/Blog Generator

**Work in progress...**

Another static site/blog generator which integrates webpack, gulp.js and jekyll (which will be removed later once gulp is doing his job).

For now you may be more interested in this other repository: https://github.com/ducksoupdev/gulp-site-generator

And this other website: https://www.staticgen.com/

## Currently in Development:
* Improve the example site and document how to create modify it to create your own, how is the project structured, how
  everything works together...
* Add an example on how to use add images in our site.
* Create clean tasks to avoid confusions getting previous work that is not supposed to be there anymore.

## TODOs:

### Needs fixing (bugs):
* Fix tslint / tslint-loader not working when building with webpack. It does work from the command line.

### Needs finishing (incomplete work):
* Check if nested pages generation works fine.
* Create real differentiated webpack configs per environment.
* Add colors, format and nice log messages to gulp tasks, specially to the check:* ones.

### New features:
* Update autoprefixer and change SASS for postCSS: https://github.com/postcss/postcss-loader
* Check best way to build multilanguage sites. Maybe gulp can make sure we create the same content in different jekyll
  folders and we don't hardcode values... (?)
* Build index pages and pagination for arbitrary data and fields.
* Add a feature to paginate a JSON file, an images or assets directory or extract content from MongoDB: https://jekyllrb.com/docs/pagination/
* Integrate Susy.
* Add SCSS linting.
* Add gulp-cached: https://www.npmjs.com/package/gulp-cached
* Clean _dist directory once everything is moved.
* Add a logo for the project/example blog.
* Add a component loader to initialize all the components on page load.

### Improvements:
* Check if gulp-watch can be better fit than gulp.watch to move only files that changed.
* Integrate typedoc.
* Improve example site with more pages, common features and some variety of content (such as images).
* Check SCSS files structure and document it alongside with the structure of other types of files or assets (components, pages...).
* Use AMP in the example page!
* Remove remaining original unused files from Jekyll.

### One last thing:
* Get rid of Jekyll once gulp is doing all the work (e. g. https://github.com/ducksoupdev/gulp-site-generator).