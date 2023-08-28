export const  API_TAG_NAME ='authentication'

export const AuthError = {
  UserExists: 'User with this email already exists',
  NotFound : 'User is not found',
  PasswordWrong : 'Password is wrong',
  InvalidData: 'Data is invalid',
  InvalidEmail:'Email is invalid'
} as const;

export const AuthMessages = {
  Register : "User registered successfully",
  Login: "Login successfull",
  UserFound: "User data found",
  PasswordChanged: "Password successfully changed",
  Refresh: 'Get a new access/refresh tokens',
} as const;


export const DEFAULT_AMOUNT = 0;

export const AuthPath = {
  Main:'auth',
  Register:'register',
  Login:'login',
  Id:':id',
  Refresh:'refresh',
  Check:'check',
  ChangePassword:'change-password/:id'
}as const;

export const UserNameLength = {
  Min: 3,
  Max: 50,
};

export const UserPasswordLength = {
  Min: 6,
  Max: 12,
};
