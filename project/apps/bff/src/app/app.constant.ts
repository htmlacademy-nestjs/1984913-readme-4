export const ControllerName = {
  Blog: 'blog',
  Comment: 'comments',
  User: 'users'
} as const;

export const AppPath = {
  Register: 'register',
  Login: 'login',
  Id: ':id',
  ChangePassword: 'change-password',
  Upload: 'upload',
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

export const ImageType = {
  Avatar: 'avatar',
  Photo: 'photo'
} as const;
