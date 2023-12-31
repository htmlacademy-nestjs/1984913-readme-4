import { Body, Req, Controller, HttpStatus, Param, Post, Delete, Patch, UseGuards } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { API_TAG_NAME, PublicationMessages, PublicationPath, PublicationsError } from './publication.constant';
import { PublicationRdo } from './rdo/publication.rdo';
import { CreateBlogPublicationDto, CreatePublicationLinkDto, CreatePublicationPhotoDto, CreatePublicationQuoteDto, CreatePublicationTextDto, CreatePublicationVideoDto, UpdateBlogPublicationDto, UpdatePublicationLinkDto, UpdatePublicationPhotoDto, UpdatePublicationQuoteDto, UpdatePublicationTextDto, UpdatePublicationVideoDto } from '@project/shared/shared-dto';
import { adaptRdoPublication } from './utils/adapt-rdo-publication';
import { CreatePostValidationPipe } from './pipes/create-post-validation.pipe';
import { UpdatePostValidationPipe } from './pipes/update-post-validation.pipe';
import { JwtAuthGuard } from '@project/util/util-core';
import { TypePostValidationPipe } from './pipes/type-post-validation.pipe';
import { RequestWithUserPayload } from '@project/shared/app-types';


@ApiTags(API_TAG_NAME)
@ApiExtraModels(CreatePublicationLinkDto, CreatePublicationPhotoDto, CreatePublicationQuoteDto, CreatePublicationTextDto,CreatePublicationVideoDto, UpdatePublicationLinkDto, UpdatePublicationPhotoDto, UpdatePublicationQuoteDto, UpdatePublicationTextDto, UpdatePublicationVideoDto)
@Controller(PublicationPath.Main)
export class PublicationController {
  constructor(
    private readonly publicationsService: PublicationService
  ) { }

  @ApiResponse({
    type: PublicationRdo,
    status: HttpStatus.CREATED,
    description: PublicationMessages.Add,
  })
  @UseGuards(JwtAuthGuard)
  @Post(PublicationPath.Add)
  public async create(@Req() { user }: RequestWithUserPayload, @Body(TypePostValidationPipe, CreatePostValidationPipe) dto: CreateBlogPublicationDto) {
    const userId = user.sub;
    const publication = await this.publicationsService.create(dto, userId);
    return adaptRdoPublication(publication);
  }

  @ApiResponse({
    type: PublicationRdo,
    status: HttpStatus.OK,
    description: PublicationMessages.Update,
  })
  @UseGuards(JwtAuthGuard)
  @Patch(PublicationPath.Id)
  public async update(@Req() { user }: RequestWithUserPayload, @Param('id') id: number, @Body(TypePostValidationPipe, UpdatePostValidationPipe) dto: UpdateBlogPublicationDto) {
    const userId = user.sub;
    const publication = await this.publicationsService.update(id, dto, userId);
    return adaptRdoPublication(publication);
  }

  @ApiResponse({
    type: PublicationRdo,
    status: HttpStatus.CREATED,
    description: PublicationMessages.Update,
  })
  @UseGuards(JwtAuthGuard)
  @Post(PublicationPath.Respost)
  public async repost(@Param('id') id: number, @Req() { user }: RequestWithUserPayload) {
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
  public async delete(@Param('id') id: number, @Req() { user }: RequestWithUserPayload) {
    const userId = user.sub;
    return await this.publicationsService.remove(id, userId);
  }
}
