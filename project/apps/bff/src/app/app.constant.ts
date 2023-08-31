export const ControllerName = {
  Blog: 'blog',
  Comment: 'login',
  User: 'users'
} as const;

export const AppPath = {
  Register: 'register',
  Login: 'login',
  Id: ':id',
  ChangePassword: 'change-password',
  Refresh: 'refresh',
  Check: 'check',
  Add: 'add',
  Update: 'update',
  Delete: 'delete',
  Drafts: 'drafts',
  Search: 'search',
  SendNewsletter: 'send-news',
  Repost: 'repost',
  Like: 'change-like-status',
} as const;

export const DefaultPostsLimit = {
  Query: 25,
  Search: 20,
} as const;

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
