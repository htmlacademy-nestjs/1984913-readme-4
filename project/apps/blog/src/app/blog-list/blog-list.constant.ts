export const BlogListError = {
  PublicationNotFound : 'Publication is not found',
  EmptyList : 'There are no posts that can be loaded',
} as const;

export const BlogListMessages = {
  ShowSingle : "Publication is showing",
  ShowAll : "List of publications is showing",
} as const;

export const  DEFAULT_POSTS_AMOUNT = 25;
