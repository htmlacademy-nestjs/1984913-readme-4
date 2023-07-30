export const LikesError = {
  PostNotFound : 'Post is not found',
  LikeNotFound: "Like is not existing",
  LikeExists: "Like already added"
} as const;

export const LikesMessages = {
  Add : "Like added successfully",
  Remove: "Like removed"
} as const;
