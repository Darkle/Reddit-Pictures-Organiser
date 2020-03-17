/* eslint-disable functional/no-class */

//Note: firefox doesnt have Error.captureStackTrace, so use Error.?captureStackTrace

class UserNavigatedAway extends Error {
  name = 'UserNavigatedAway'
}

export {
  UserNavigatedAway
}