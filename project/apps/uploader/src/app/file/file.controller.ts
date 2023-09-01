import { Controller, Post, Get, Param, UploadedFile, UseInterceptors, Inject } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import 'multer';
import { FileService } from './file.service';
import { fillObject } from '@project/util/util-core';
import { UploadedFileRdo } from './rdo/uploaded-file.rdo';
import { uploaderConfig } from '@project/config/config-uploader';
import { ConfigType } from '@nestjs/config';
import { FilePath, ImageType } from './file.constant';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';
import { FileValidationPipe } from './pipes/validate-file.pipe';

@Controller(FilePath.Main)
export class FileController {

  constructor(
    private readonly fileService: FileService,

    @Inject(uploaderConfig.KEY)
    private readonly applicationConfig: ConfigType<typeof uploaderConfig>,
  ) { }

  @Post(`${FilePath.Upload}/${ImageType.Avatar}`)
  @UseInterceptors(FileInterceptor(ImageType.Avatar))
  public async uploadAvatar(@UploadedFile(FileValidationPipe) file: Express.Multer.File) {
    const newFile = await this.fileService.saveFile(file, ImageType.Avatar);
    const path = `${this.applicationConfig.serveRoot}${newFile.path}`;
    return fillObject(UploadedFileRdo, Object.assign(newFile, { path }));
  }

  @Post(`${FilePath.Upload}/${ImageType.Photo}`)
  @UseInterceptors(FileInterceptor(ImageType.Photo))
  public async uploadPhoto(@UploadedFile(FileValidationPipe) file: Express.Multer.File) {
    const newFile = await this.fileService.saveFile(file, ImageType.Photo);
    const path = `${this.applicationConfig.serveRoot}${newFile.path}`;
    return fillObject(UploadedFileRdo, Object.assign(newFile, { path }));
  }

  @Get(FilePath.Id)
  public async show(@Param('fileId', MongoidValidationPipe) fileId: string) {
    const existFile = await this.fileService.getFile(fileId);
    const path = `${this.applicationConfig.serveRoot}${existFile.path}`;
    return fillObject(UploadedFileRdo, Object.assign(existFile, { path }));
  }
}
