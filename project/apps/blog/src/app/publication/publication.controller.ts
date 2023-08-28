import { Body, Req, Controller, HttpStatus, Param, Post, Delete, Patch, UseGuards } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { API_TAG_NAME, PublicationMessages, PublicationPath, PublicationsError } from './publication.constant';
import { PublicationRdo } from './rdo/publication.rdo';
import { CreateBlogPublicationDto } from './dto/create/blog-publication-dto.type';
import { UpdateBlogPublicationDto } from './dto/update/blog-publication-dto.type';
import { adaptRdoPublication } from './utils/adapt-rdo-publication';
import { CreatePostValidationPipe } from './pipes/create-post-validation.pipe';
import { UpdatePostValidationPipe } from './pipes/update-post-validation.pipe';
import { JwtAuthGuard } from '@project/util/util-core';
import { TypePostValidationPipe } from './pipes/type-post-validation.pipe';
import { RequestWithUserPayload } from '@project/shared/app-types';


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
  @UseGuards(JwtAuthGuard)
  @Post(PublicationPath.Add)
  public async create(@Body(TypePostValidationPipe,CreatePostValidationPipe) dto: CreateBlogPublicationDto) {
    const publication = await this.publicationsService.create(dto);
    return adaptRdoPublication(publication);
  }

  @ApiResponse({
    type: PublicationRdo,
    status: HttpStatus.CREATED,
    description: PublicationMessages.Update,
  })
  @UseGuards(JwtAuthGuard)
  @Patch(PublicationPath.Id)
  public async update(@Param('id') id: number, @Body(TypePostValidationPipe, UpdatePostValidationPipe) dto: UpdateBlogPublicationDto) {
    const publication = await this.publicationsService.update(id, dto);
    return adaptRdoPublication(publication);
  }

  @ApiResponse({
    type: PublicationRdo,
    status: HttpStatus.CREATED,
    description: PublicationMessages.Update,
  })
  @UseGuards(JwtAuthGuard)
  @Post(PublicationPath.Respost)
  public async repost(@Param('id') id: number, @Req() {user}:RequestWithUserPayload ) {
    const userId = user.sub;
    const publication = await this.publicationsService.repost(id, userId);
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
  @UseGuards(JwtAuthGuard)
  @Delete(PublicationPath.Id)
  public async delete(@Param('id') id: number) {
    return await this.publicationsService.remove(id);
  }
}
