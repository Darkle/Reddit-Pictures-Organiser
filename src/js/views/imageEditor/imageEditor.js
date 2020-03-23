  /*****
  We dont have the images stored if the user reloads the page to the image viewer,
  so redirect to the subreddit page.
  *****/
//  if(!store.fetchedSubredditImages.length) return router.navigate(`/sub/${subreddit}/${timefilter}`)