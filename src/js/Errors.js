/* eslint-disable functional/no-class */

class ApplicationError extends Error {
  get name(){
    return this.constructor.name // eslint-disable-line functional/no-this-expression
  }
}
class PromiseCanceller extends ApplicationError {}
class UserNavigatedAway extends PromiseCanceller {}
class NoMoreImagesToFetch extends PromiseCanceller {}

export {
  UserNavigatedAway,
  NoMoreImagesToFetch,
  PromiseCanceller,
}