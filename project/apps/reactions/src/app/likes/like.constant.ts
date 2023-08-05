export const LikesError = {
  PublicationNotFound : ' Publication  is not found',
  LikeNotFound: "Like is not existing",
  LikeExists: "Like already added"
} as const;

export const LikesMessages = {
  Add : "Like added successfully",
  Remove: "Like removed"
} as const;

export const LikesPath = {
  Main:'likes',
  Add:'add/:postId',
  Delete:'delete/:postId'
}as const;

export const  API_TAG_NAME ='likes'
