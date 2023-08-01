export const DEFAULT_AMOUNT = 0;
export const DEFAULT_STATUS = false;

export const PublicationsError = {
  PublicationNotFound : 'Publication is not found',
  Delete : 'Publication is not deleted',
} as const;

export const PublicationMessages = {
  Add : "Publication added successfully",
  Show : "Publication is showing",
  Update : "Publication updated",
  Remove: "Publication removed"
} as const;
