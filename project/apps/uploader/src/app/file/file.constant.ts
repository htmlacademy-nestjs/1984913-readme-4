export const  FileError = {
  FileNotFound : 'File with such id is not found',
  MimetypeError: "Wrong file mimetype",
} as const;

export const LikesMessages = {
  Add : "Like added successfully",
  Remove: "Like removed"
} as const;

export const FilePath = {
  Main:'files',
  Upload:'/upload',
  Id:'/:fileId',
}as const;

export const FORMAT_PATTERN ='YYYY MM'
