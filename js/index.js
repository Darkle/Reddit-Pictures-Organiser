// import page from './web_modules/page.js'
// import createRouter from './web_modules/kief.js'
// import {createRouter} from './web_modules/vanilla-ui-router.js'
// import router  from './web_modules/easyrouter.js'
// import navaid from './web_modules/navaid.js'
import {router, route} from './web_modules/silkrouter.js'
import Navigo from './web_modules/navigo.js'

import { appState } from './appState.js'
import {init as initDb} from './db.js'
import {log} from './logger.js'
import {loadHomePage} from './views/homePage.js'
import {loadSubredditPage} from './views/subredditPage.js'
import {loadImageViewer} from './imageViewer.js'

//we need a router for back/forwards

initDb().then(initRouter).catch(log)

function initRouter(){ // eslint-disable-line max-lines-per-function
if(!window.location.hash.includes('#')){
  window.location.hash = '!/home'
}  
console.log('router init')
// router
//   // The `add` method adds routes without eliminating the previous ones.
//   // Its additional parameter is the default `enter` method for the routes
//   // that are added.
//   // .add(({path: ''}), function (params) {
//   //   // The `enter` method is executed in the context of the current route
//   //   // and receives a parameter with values in the current hash.
//   //   console.log(this.hash, params)
//   // })
//   .add(({path: '/home'}), function (params) {
//     // The `enter` method is executed in the context of the current route
//     // and receives a parameter with values in the current hash.
//     console.log(this.hash, params)
//   })
//   .onExit((route) => {
//     // global callback called on exit a previous route
//     console.log(`Leaving ${route.hash}`)
//   })
//   .onEnter((route) => {
//     // global callback called before run the current route
//     console.log(`Entering ${route.hash}`)
//   })
//   .rescue(() => {
//     // executed for non-existing routes or routes without `enter` method
//     console.log('we donthave a hash route for this route')
//   })
//   // starts the router using "#/login" for users that arrives to this
//   // page without a hash.
//   .listen('#/home')
  // const router = createRouter(document.getElementById('app'))
  // router
  //   .addRoute('', () => {
  //     console.log('empty route')
  //     // router.navigateTo('home')
  //   })
  //   // .addRoute('home', () => {
  //   //   console.log('home route')
  //   //   // loadHomePage()
  //   // })
  //   .otherwise(() => {
  //     // If no route configuration matches, the otherwise route is invoked.
  //     console.log('I am the otherwise route');
  //     // router.navigateTo('home');
  //   })    
  // page('/home', () => {
  //   console.log('home page route run /')
  //   loadHomePage()
  // })
  // page('/sub/:subreddit', loadSubredditPage)
  // page.exit('/sub/:subreddit', () => {
  //   console.log('page exit')
  //   appState.viewingSubredditPage = false
  // })
  // page('/sub/imageviewer/:subreddit', loadImageViewer)
  // page('/folders', () => {
  //   document.title = `RPO - Folders`
  // })
  // page('/manage', () => {
  //   document.title = `RPO - Manage Subs`
  // })
  // // page('*', () => {
  // //   log('log error here for 404')
  // //   // redirect back to home page
  // //   page('/')
  // // })
  // page({
  //   hashbang: true
  // })
// const router = navaid()
// router
// .on('#/sub/:subreddit', () => {
//   console.log('~> /sub/:subreddit')
// })
//   .on('#/home', () => {
//     console.log('~> /')
//   })
// router.listen()    
// const router = createRouter([
//   '/'
// ])
// router.subscribe(routeInfo => {
//   console.log('routinfo', routeInfo)
// })
//   const myRouter = new router({
//     hashRouting: true
// })
// myRouter
//     .pipe(route('/'))
//     .subscribe(e => {
//         console.log(e)
//     })
  const root = null
  const useHash = true // Defaults to: false
  const hash = '#!' // Defaults to: '#'
  const router = new Navigo(root, useHash, hash)
  router
  .on(function () {
    console.log('hello')
  })
  .on({
    '/home': function () {
      console.log('home')
    },
    '/sub/:subreddit': function () {
      console.log('/sub/:subreddit')
    },
    '*': function () {
      console.log('*')
    },
  })  
  .resolve()  
}

// const router = navaid()
// router
// .on('#/sub/:subreddit', () => {
//   console.log('~> /sub/:subreddit')
// })
//   .on('/', () => {
//     console.log('~> /')
//   })
// router.listen()  
// if(window.location.hash.includes('#')){
//   window.location.hash = '#'
// }
// const router = createRouter([
//   '/#',
//   '/sub/:subreddit',
// ])
// router.subscribe(routeInfo => {
//   console.log('routinfo', routeInfo)
// })
// import {emitter} from './actions.js'
// emitter.emit('add-folder', 'folder 1')
// emitter.emit('add-folder', 'folder 2')
// emitter.emit('add-folder', 'folder 3')
// emitter.emit('add-subreddit', 'Aww')
// emitter.emit('add-subreddit', 'Cute')
// emitter.emit('add-subreddit', 'Foxes')
// emitter.emit('add-subreddit', 'CatGifs')
// emitter.emit('add-subreddit', 'Pics')
// emitter.emit('add-subreddit', 'Space')
// emitter.emit('add-subreddit', 'Abandoned')
// emitter.emit('add-subreddit', 'Animals')
// emitter.emit('add-subreddit', 'Cats')
// emitter.emit('add-subreddit', 'RedPandas')
// emitter.emit('add-subreddit', 'HardcoreAww')
// emitter.emit('add-subreddit', 'CatsStandingUp')
// emitter.emit('add-subreddit', 'Photography')
// emitter.emit('add-subreddit', 'Gifs')
// emitter.emit('add-subreddit', 'Future')
// emitter.emit('add-subreddit', 'Maps')
// emitter.emit('add-subreddit', 'Puppies')
// emitter.emit('add-subreddit', 'Rabbits')
// emitter.emit('add-subreddit', 'DogPictures')
// emitter.emit('add-subreddit', 'Earth')
// emitter.emit('add-subreddit', 'HDR')
// emitter.emit('add-subreddit', 'Food')
// emitter.emit('add-subreddit', 'Art')
// emitter.emit('add-favourite-subreddit', 'Pics')
// emitter.emit('add-favourite-subreddit', 'Space')
// emitter.emit('add-favourite-subreddit', 'Abandoned')
// emitter.emit('add-favourite-subreddit', 'Animals')
// emitter.emit('add-favourite-subreddit', 'Cats')