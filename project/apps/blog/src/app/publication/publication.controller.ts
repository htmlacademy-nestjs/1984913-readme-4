import { Body, Controller, HttpStatus, Param, Post, Delete, Patch } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { API_TAG_NAME, PublicationMessages, PublicationPath, PublicationsError } from './publication.constant';
import { PublicationRdo } from './rdo/publication.rdo';
import { fillObject } from '@project/util/util-core';
import { TextPublicationRdo } from './rdo/publication-text.rdo';
import { CreateTextPublicationDto } from './dto/create/publication-text.dto';
import { UpdateTextPublicationDto } from './dto/update/publication-text.dto';

@ApiTags(API_TAG_NAME)
@Controller(PublicationPath.Main)
export class PublicationController {
  constructor(
    private readonly publicationsService: PublicationService
  ) {}

  @ApiResponse({
    type: PublicationRdo,
    status: HttpStatus.CREATED,
    description: PublicationMessages.Add,
  })
  @Post(PublicationPath.Add)
  public async create(@Body() dto: CreateTextPublicationDto) {
    const publication = await this.publicationsService.create(dto);
    return fillObject(TextPublicationRdo, publication);
  }

  @ApiResponse({
    type: PublicationRdo,
    status: HttpStatus.CREATED,
    description: PublicationMessages.Update,
  })
  @Patch(PublicationPath.Id)
  public async update(@Param('id') id: string, @Body() dto: UpdateTextPublicationDto) {
    const postId = parseInt(id, 10);
    const publication = await this.publicationsService.update(postId, dto);
    return fillObject(TextPublicationRdo, publication);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: PublicationMessages.Remove,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: PublicationsError.Delete
  })
  @Delete(PublicationPath.Id)
  public async delete(@Param('id') id: string) {
    const postId = parseInt(id, 10);
    return await this.publicationsService.remove(postId);
  }
}
