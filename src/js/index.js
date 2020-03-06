// import {init as initDb} from './db.js'
// import {log} from './logger.js'
// import { initRouter } from './router.js'

// if(!window.location.hash.includes('#')){
//   window.location.hash = '!/home'
// }

// initDb().then(initRouter).catch(log)

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
// @type greet :: String -> String
function greet(person) {
  return "Hello, " + person;
}

var user = true;

greet(user);

// @type times10 :: Number -> Number
function times10(x) {
return x * 10;
}

times10('Hello, world!');

// @type reducer :: {count: Number} -> {type: String} -> {count: Number}
function reducer(state, action) {
switch (action.type) {
  case 'INCREMENT':
    return {count: state.count + 1};
  case 'DECREMENT':
    return {count: state.count - 1};
  default:
    return state;
}
}

reducer({count: 0}, {type: 1});