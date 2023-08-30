export const DEFAULT_AMOUNT = 0;
export const DEFAULT_STATUS = false;
export const  API_TAG_NAME ='publications'

export const PublicationsError = {
  PublicationNotFound : 'Publication is not found',
  Delete : 'Publication is not deleted',
  WrongType : 'Wrong post type',
  AlreadyReposted:'You already reposted this publication',
  NotUserAuthor:'User is not an author of this publication',
} as const;

export const PublicationMessages = {
  Add : "Publication added successfully",
  Show : "Publication is showing",
  Update : "Publication updated",
  Remove: "Publication removed"
} as const;

export const PublicationPath = {
  Main:'publication',
  Respost:':id/repost',
  Add:'add',
  Id: ':id'
}as const;


export const VALIDATION_ARGUMENT_TYPE = 'body'

export const TagDefaultParam = {
  MinLength: 3,
  MaxLength: 10,
  Amount: 8,
};
