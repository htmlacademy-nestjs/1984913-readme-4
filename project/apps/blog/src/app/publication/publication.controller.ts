import { Body, Controller, HttpStatus, Param, Post, Delete, Patch } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { API_TAG_NAME, PublicationMessages, PublicationPath, PublicationsError } from './publication.constant';
import { PublicationRdo } from './rdo/publication.rdo';
import { CreateBlogPublicationDto } from './dto/create/blog-publication-dto.type';
import { UpdateBlogPublicationDto } from './dto/update/blog-publication-dto.type';
import { adaptRdoPublication } from './utils/adapt-rdo-publication';


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
  public async create(@Body() dto: CreateBlogPublicationDto) {
    const publication = await this.publicationsService.create(dto);
    return adaptRdoPublication(publication);
  }

  @ApiResponse({
    type: PublicationRdo,
    status: HttpStatus.CREATED,
    description: PublicationMessages.Update,
  })
  @Patch(PublicationPath.Id)
  public async update(@Param('id') id: string, @Body() dto: UpdateBlogPublicationDto) {
    const postId = parseInt(id, 10);
    const publication = await this.publicationsService.update(postId, dto);
    return adaptRdoPublication(publication);
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
