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

export const UserMessages = {
  NotFound : 'User is not found',
  InvalidData: 'Data is invalid',
  Register : "User registered successfully",
  Login: "Login successfull",
  UserFound: "User data found",
  PasswordChanged: "Password successfully changed",
  Refresh: 'Get a new access/refresh tokens',
  AvatarAdded: "Avatar added successfully"
} as const;

export const CommentsMessages = {
  Add : "Comment added successfully",
  Show: "All comments are shown",
  Remove: "Comment removed",
  InvalidPublication : 'Publication is not found',
  InvalidComment : 'Comment with this id is not found',
}as const;

export const BlogMessages = {
  PublicationNotFound: 'Publication is not found',
  EmptyList: 'There are no posts that can be loaded',
  ShowSingle: 'Publication is showing',
  ShowAll: 'List of publications is showing',
  NewsSent: 'Publications sent',
  DeleteError : 'Publication is not deleted',
  Add : "Publication added successfully",
  Update : "Publication updated",
  Remove: "Publication removed",
  ChangeLike : "Liked status changed successfully",
}as const;
