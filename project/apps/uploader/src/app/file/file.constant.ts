export const  FileError = {
  FileNotFound : "File with such id is not found",
  MimetypeError: "Wrong file mimetype",
  InvalidSize: "File size is too big",
} as const;

export const FilePath = {
  Main:'files',
  Upload:'/upload',
  Id:'/:fileId',
}as const;

export const FORMAT_PATTERN ='YYYY MM'

export const DEFAULT_OPTION_SPACE = 'application.db'

export const FILE_COLLECTION_NAME = 'files'

export const MaxImageSizeInByte={
  Avatar:512000,
  Photo:1048576,
}as const;

export const ImageType={
  Avatar:'avatar',
  Photo:'photo',
}as const;

export const ALLOWED_MIMETYPES = ['jpeg','jpg','png']

