export const  OPTION_SPACE_NAME ='application.db'

export const SUBSCRIBERS_COLLECTION_NAME = 'email-subscribers';


export const EmailError = {
  InvalidEmail: 'User with this email already exists',
  EmptyName : 'Name is empty',
} as const;

export const EmailMessages = {
  Register : "User registered successfully",
} as const;

export const EmailPath = {
  Main:'auth',
}as const;
