export const AuthPath = {
  Register:'register',
  Login:'login',
  Id:':id',
  Refresh:'refresh',
  Check:'check',
  ChangePassword:'change-password'
}as const;

export const CommentsPath = {
  Add:'add',
  PostId: ':postId',
  Delete:'delete/:commentId'
}as const;

export const BlogListPath = {
  Id: ':id',
  Drafts: 'drafts',
  Search: 'search',
  SendNewsletter: 'send-news',
} as const;

export const UserNameLength = {
  Min: 3,
  Max: 50,
};

export const UserPasswordLength = {
  Min: 6,
  Max: 12,
};

export const AuthError = {
  UserExists: 'User with this email already exists',
  NotFound : 'User is not found',
  PasswordWrong : 'Password is wrong',
  InvalidData: 'Data is invalid',
  InvalidEmail:'Email is invalid'
} as const;

export const DefaultPostsLimit ={
  Query:25,
  Search:20
}as const;

export const DefaultSortParam = {
  Direction: 'desc',
  Type: 'postedDate',
} as const;

export const TagDefaultParam = {
  MinLength: 3,
  MaxLength: 10,
  Amount: 8,
};

export const DEFAULT_COMMENTS_LIMIT = 50;
