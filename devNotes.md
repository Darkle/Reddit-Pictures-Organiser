###### Setup details:
* Backend uses expressjs for the server
* The express view engine used is [liquid](https://github.com/harttle/liquidjs/wiki/Use-with-Expressjs)
* Using [nodemon](https://github.com/remy/nodemon/) for reloading the server on backend changes
* [Parcel](https://parceljs.org) for bundling
  * Parcel also reloads the page on frontend change
  * Parcel also minifies on build
* Using [jest](https://jestjs.io/) for tests
* The `run-s` in the package.json script is just a shortcut for the `npm-run-all` program. It runs the scripts in serial (one after the other).
* We are using the following babel plugins, presets and macros:
  * `@babel/preset-env` https://babeljs.io/docs/en/babel-preset-env
  * `@babel/preset-react` https://babeljs.io/docs/en/babel-preset-react
  * `inline-replace-variables` to replace the `ISDEV` variable with whether or not `process.env.NODE_ENV !== 'production'` : https://github.com/wssgcg1213/babel-plugin-inline-replace-variables
  * `param.macro`  https://github.com/citycide/param.macro
  * `ms.macro` https://github.com/knpwrs/ms.macro#readme
* The `watchreload` key in package.json is for [parcel-plugin-watch-reload](https://github.com/hirasso/parcel-plugin-watch-reload), it allows us to reload the page on server change too.


###### Compromises:
* We forgo cache busting via hashing for js as there doesnt seem to be a way to tell parcel to do that if its not handling the html file. 
  * Although it is still possible to do it on the server via the [ETag](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag)


###### Additional notes:
* Try to lessen the use of external libraries as it all adds up
* Can use the [dynamic imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Dynamic_Imports) to load external libraries after the page has loaded