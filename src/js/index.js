import {init as initDb} from './store/db.js'
import {logger} from './logger.js'
import { initRouter } from './router.js'

if(!window.location.hash.includes('#')){
  window.location.hash = '!/home'
}

initDb().then(initRouter).catch(logger.error)

// initDb().then(() => {
//   console.log('asd')
//   import {store} from './store/store.js'
//   store.addFolder('folder 1')
//   store.addFolder('folder 2')
//   store.addFolder('folder 3')
//   store.addSubreddit('Aww')
//   store.addSubreddit('Cute')
//   store.addSubreddit('Foxes')
//   store.addSubreddit('CatGifs')
//   store.addSubreddit('Pics')
//   store.addSubreddit('Space')
//   store.addSubreddit('Abandoned')
//   store.addSubreddit('Animals')
//   store.addSubreddit('Cats')
//   store.addSubreddit('RedPandas')
//   store.addSubreddit('HardcoreAww')
//   store.addSubreddit('CatsStandingUp')
//   store.addSubreddit('Photography')
//   store.addSubreddit('Gifs')
//   store.addSubreddit('Future')
//   store.addSubreddit('Maps')
//   store.addSubreddit('Puppies')
//   store.addSubreddit('Rabbits')
//   store.addSubreddit('DogPictures')
//   store.addSubreddit('Earth')
//   store.addSubreddit('HDR')
//   store.addSubreddit('Food')
//   store.addSubreddit('Art')
//   store.addFavouriteSubreddit('Pics')
//   store.addFavouriteSubreddit('Space')
//   store.addFavouriteSubreddit('Abandoned')
//   store.addFavouriteSubreddit('Animals')
//   store.addFavouriteSubreddit('Cats') 
// }).catch(logger.error)
