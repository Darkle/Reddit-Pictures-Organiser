Example of the data you get back for an image from the reddit json api: https://gist.github.com/Darkle/377a8e5f3bb155885d26a0a293806af3

###### Build Setup:

* [Snowpack](https://www.snowpack.dev/) - for npm modules.
* [Browser-Sync](https://browsersync.io/docs/command-line) - gives us a server, reload on change and also https as that is needed for a few things (eg service worker)
* [Minify](https://github.com/tdewolff/minify/blob/master/cmd/minify/README.md) - is a go app. Using this for minifying as terser does not yet support optional chaining syntax
* [Ncp](https://github.com/AvianFlu/ncp) - copies files over to dist
* [Ncat](https://github.com/pvdlg/ncat) - helps us concatinate all js files so we do a total size check with [bundlesize](https://github.com/siddharthkp/bundlesize) (although note that some of the `web_modules` are loaded using dynamic imports)
* Deploying to [Surge](https://surge.sh/)
* The `build:serve` npm task is for Lighthouse as it needs the page to be served. The `build:kill-serve` kills this sever after the lighthouse task is completed.
* Note the [Lighthouse](https://github.com/GoogleChrome/lighthouse) test is missing the pwa test as it kept erroring out.



###### Debugging:
* To debug the service worker, download chromium and start it with `./chrome --unsafely-treat-insecure-origin-as-secure=https://192.168.1.2:8888/ --ignore-certificate-errors `
    * https://www.chromium.org/blink/serviceworker/service-worker-faq