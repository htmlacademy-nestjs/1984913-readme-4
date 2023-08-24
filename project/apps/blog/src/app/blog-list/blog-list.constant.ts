export const API_TAG_NAME = 'blog-list';

export const BlogListError = {
  PublicationNotFound: 'Publication is not found',
  EmptyList: 'There are no posts that can be loaded',
} as const;

export const BlogListMessages = {
  ShowSingle: 'Publication is showing',
  ShowAll: 'List of publications is showing',
} as const;

export const DefaultPostsLimit ={
  Query:25,
  Search:20
}as const;

export const DefaultSortParam = {
  Direction: 'desc',
  Type: 'postedDate',
} as const;

export const BlogListPath = {
  Main: 'blog-list',
  Id: ':id',
  Drafts: 'drafts',
  Search: 'search',
  SendNewsletter: 'send-news',
} as const;
