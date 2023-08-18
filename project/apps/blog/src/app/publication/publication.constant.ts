export const DEFAULT_AMOUNT = 0;
export const DEFAULT_STATUS = false;
export const  API_TAG_NAME ='publications'

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

export const PublicationPath = {
  Main:'publication',
  Add:'add',
  Id: ':id'
}as const;

export const PublicationTitleLength = {
  Min: 20,
  Max: 50,
};
export const PublicationAnnouncementLength = {
  Min: 50,
  Max: 225,
};
export const TextPublicationLength = {
  Min: 100,
  Max: 1024,
};
export const QuotePublicationLength = {
  Min: 20,
  Max: 300,
};
export const PublicationAuthorLength = {
  Min: 3,
  Max: 50,
};

export const LINK_DESCRIPTION_LENGTH = 300;
