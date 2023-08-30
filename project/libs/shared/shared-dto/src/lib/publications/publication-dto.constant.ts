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
export const TagDefaultParam = {
  MinLength: 3,
  MaxLength: 10,
  Amount: 8,
};

export const LINK_DESCRIPTION_LENGTH = 300;

export const RegExpPattern = {
  Video:/(?:(?:https?:\/\/)(?:www)?\.?(?:youtu\.?be)(?:\.com)?\/(?:.*[=/])*)([^= &?/\r\n]{8,11})/,
  Tag:/^[A-Za-zА-Яа-я]([A-Za-zА-Яа-я0-9_.])+$/g,
} ;

export const PublicationsError = {
  WrongSourse : 'Video link must be from Youtube',
  WrongTagStart : 'Tags should start with digit',
  SpacesInTag:'Tags should not contain spaces',
} as const;
