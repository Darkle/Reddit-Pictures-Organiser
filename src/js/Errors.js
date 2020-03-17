/* eslint-disable functional/no-class, functional/no-this-expression */

class ApplicationError extends Error {
  get name(){
    return this.constructor.name
  }
}
class PromiseCanceller extends ApplicationError {}
class UserNavigatedAway extends PromiseCanceller {}
class NoMoreImagesToFetch extends PromiseCanceller {}

class FetchError extends ApplicationError {
  constructor(responseStatusText, response){
    super()
    this.responseStatusText = responseStatusText
    this.response = response
  }
}

export {
  UserNavigatedAway,
  NoMoreImagesToFetch,
  PromiseCanceller,
  FetchError,
}