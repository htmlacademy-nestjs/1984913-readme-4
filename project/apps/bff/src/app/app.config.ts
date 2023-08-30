export enum ApplicationServiceURL {
  Users = 'http://localhost:3000/api/auth',
  BlogList = 'http://localhost:3001/api/blog-list',
  Publications = 'http://localhost:3001/api/publication',
  Likes = 'http://localhost:3001/api/likes',
  Comments = 'http://localhost:3001/api/comments',
  Uploader = 'http://localhost:3002/api/files',
}

export const HttpCLientParam = {
  MaxRedirects: 5,
  Timeout: 5000,
} as const
