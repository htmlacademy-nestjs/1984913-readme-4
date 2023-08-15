import { Controller, Post, Get, Param, UploadedFile, UseInterceptors, Inject } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import 'multer';
import { FileService } from './file.service';
import { fillObject } from '@project/util/util-core';
import { UploadedFileRdo } from './rdo/uploaded-file.rdo';
import { uploaderConfig } from '@project/config/config-uploader';
import { ConfigType } from '@nestjs/config';
import { FilePath } from './file.constant';

@Controller(FilePath.Main)
export class FileController {

  constructor(
    private readonly fileService: FileService,

    @Inject(uploaderConfig.KEY)
    private readonly applicationConfig: ConfigType<typeof uploaderConfig>,
      ) {}

  @Post(FilePath.Upload)
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const newFile = await this.fileService.saveFile(file);
    const path = `${this.applicationConfig.serveRoot}${newFile.path}`;
    return fillObject(UploadedFileRdo, Object.assign(newFile, { path }));
  }

  @Get(FilePath.Id)
  public async show(@Param('fileId') fileId: string) {
    const existFile = await this.fileService.getFile(fileId);
    const path = `${this.applicationConfig.serveRoot}${existFile.path}`;
    return fillObject(UploadedFileRdo, Object.assign(existFile, { path }));
  }
}
