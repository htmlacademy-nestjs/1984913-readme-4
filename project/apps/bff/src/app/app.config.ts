export enum ApplicationServiceURL {
  Users = 'http://localhost:3000/api/auth',
  BlogList = 'http://localhost:3001/api/blog-list',
}

export const HttpCLientParam = {
  MaxRedirects: 5,
  Timeout: 5000,
} as const
