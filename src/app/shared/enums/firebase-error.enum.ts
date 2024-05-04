export enum FirebaseErrorEnum {
  EMAIL_NOT_FOUND = 'There is no user record corresponding to this identifier. The user may have been deleted',
  INVALID_PASSWORD = 'The password is invalid or the user does not have a password',
  USER_DISABLED = 'The user account has been disabled by an administrator',
  EMAIL_EXISTS = 'This email exists already',
  OPERATION_NOT_ALLOWED = 'An error occurred',
  TOO_MANY_ATTEMPTS_TRY_LATER = 'Please try again later',
  INVALID_LOGIN_CREDENTIALS = 'Please check your credentials'
}
