export const AuthError = {
  UserExists: 'User with this email already exists',
  NotFound : 'User is not found',
  PasswordWrong : 'Password is wrong'
} as const;

export const DEFAULT_AMOUNT = 0;

export const AuthPath = {
  Main:'auth',
  Register:'register',
  Login:'login',
  Id: ':id'
}as const;
