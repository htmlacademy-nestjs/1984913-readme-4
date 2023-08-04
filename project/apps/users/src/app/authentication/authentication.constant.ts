export const  API_TAG_NAME ='authentication'

export const AuthError = {
  UserExists: 'User with this email already exists',
  NotFound : 'User is not found',
  PasswordWrong : 'Password is wrong',
  InvalidData: 'Email or password is invalid'
} as const;

export const AuthMessages = {
  Register : "User registered successfully",
  Login: "Login successfull",
  UserFound: "'User data found'"
} as const;


export const DEFAULT_AMOUNT = 0;

export const AuthPath = {
  Main:'auth',
  Register:'register',
  Login:'login',
  Id: ':id'
}as const;

export const UserNameLength = {
  Min: 3,
  Max: 50,
};

export const UserPasswordLength = {
  Min: 6,
  Max: 12,
};
