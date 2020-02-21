##### Simple No Bundling JS Server & Web Boilerplate


###### Goals:
* No bundler
* Simple/Minimal
* Reload webpage for frontend change
* Reload server for backend change

###### Compromises:
* We forgo cache busting via hashing for our own js. Although it is still possible to do it on the server via the [ETag](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag)
  * Note: you are still able to cache bust the vendor scripts locally if you want with [snowpack](https://www.snowpack.dev/#automatic-cache-busting-via-import-url)
* We forgo tree shaking for our own code that we write, however snowpack gives us tree shaking for the vendor files: [tree shaking for the vendor files](https://www.snowpack.dev/#production-optimization)
* No babel

###### Usage:
* Run `npm run dev` to start backend server for development (the backend server also does the frontend hot reload)
* Run `npm run build` to build for production

###### Setup details:
* Backend:
  * expressjs for the server
  * The express view engine used is [liquid](https://github.com/harttle/liquidjs/wiki/Use-with-Expressjs)
* Frontend:
  * [sinuous](https://sinuous.netlify.com/) for components and state
* Using [nodemon](https://github.com/remy/nodemon/) for reloading the server on backend changes
* Using [instant](https://github.com/fgnass/instant) for reloading the web page on frontend changes
* Using [Snowpack](https://www.snowpack.dev/) for the frontend es6 npm modules
  * Search https://www.pika.dev/search for es6 (snowpack) compatible modules
* Using [minify](https://github.com/tdewolff/minify/tree/master/cmd/minify) to minify our js and css for production
  * Snowpack minifies the vendor js when we build for production
* Using [jest](https://jestjs.io/) for tests
* The `run-s` in the package.json script is just a shortcut for the [npm-run-all](https://github.com/mysticatea/npm-run-all) program. It runs the scripts in serial (one after the other).
* The `browserslist` key in the package.json is for snowpack. It tells it what to target for its output.
* The `size-check` npm script runs the [bundlesize](https://github.com/siddharthkp/bundlesize) app. It runs agains the snowpack output files. It doesnt check the aggregate, only the individual files.

###### Additional notes:
* Try to lessen the use of external libraries as it all adds up
* Can use the [dynamic imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Dynamic_Imports) to load external libraries after the page has loaded
