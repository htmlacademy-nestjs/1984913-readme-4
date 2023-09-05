import { Body, Req, Get, Param, Controller, Post, Query, UseFilters, UseGuards, Delete, Patch, UseInterceptors, UploadedFile, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosExceptionFilter } from '../filters/axios-exception.filter';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { ApplicationServiceURL } from '../app.config';
import { AppPath, BlogMessages, ControllerName, ImageType } from '../app.constant';
import { CreateBlogPublicationDto, CreatePublicationLinkDto, CreatePublicationPhotoDto, CreatePublicationQuoteDto, CreatePublicationTextDto, CreatePublicationVideoDto, UpdateBlogPublicationDto, UpdatePublicationLinkDto, UpdatePublicationPhotoDto, UpdatePublicationQuoteDto, UpdatePublicationTextDto, UpdatePublicationVideoDto } from '@project/shared/shared-dto';
import { PostQuery, SearchPostsQuery } from '@project/shared/shared-queries';
import { getUserInfo, getUserInfoForAll } from '../utils/get-user-info';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import 'multer';
import FormData from 'form-data'
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags(ControllerName.Blog)
@ApiExtraModels(CreatePublicationLinkDto, CreatePublicationPhotoDto, CreatePublicationQuoteDto, CreatePublicationTextDto,CreatePublicationVideoDto, UpdatePublicationLinkDto, UpdatePublicationPhotoDto, UpdatePublicationQuoteDto, UpdatePublicationTextDto, UpdatePublicationVideoDto)
@Controller(ControllerName.Blog)
@UseFilters(AxiosExceptionFilter)
export class BlogController {
  constructor(
    private readonly httpService: HttpService
  ) { }

  @ApiResponse({
    status: HttpStatus.OK,
    description: BlogMessages.ShowAll
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogMessages.EmptyList
  })
  @Get()
  public async showPublications(@Query() query:PostQuery) {
  const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.BlogList}`, {
    params:query
  });
  return getUserInfoForAll(data, this.httpService);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: BlogMessages.ShowAll
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogMessages.EmptyList
  })
  @Get(AppPath.Search)
  public async searchPublicationsByTitle(@Query() query:SearchPostsQuery) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.BlogList}/${AppPath.Search}`, {
      params:query
    });
    return getUserInfoForAll(data, this.httpService);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: BlogMessages.ShowAll
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogMessages.EmptyList
  })
  @UseGuards(CheckAuthGuard)
  @Get(AppPath.Drafts)
  async showDrafts(@Req() req:Request) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.BlogList}/${AppPath.Drafts}`,{
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data
  }

    @ApiResponse({
    status: HttpStatus.OK,
    description:BlogMessages.NewsSent
  })
  @UseGuards(CheckAuthGuard)
  @Get(AppPath.SendNewsletter)
  public async sendNews(@Req() req:Request) {
    await this.httpService.axiosRef.get(`${ApplicationServiceURL.BlogList}/${AppPath.SendNewsletter}`,{
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: BlogMessages.ShowSingle
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogMessages.PublicationNotFound
  })
  @Get(AppPath.Id)
  public async showPublicationById(@Param('id') id: number) {
    const { data:publicationData } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.BlogList}/${id}`);
    const userInfo = await getUserInfo(publicationData, this.httpService)
    return {...publicationData, userInfo}
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: BlogMessages.Add,
  })
  @UseGuards(CheckAuthGuard)
  @Post(AppPath.Add)
  public async createPublication(@Req() req:Request, @Body() dto: CreateBlogPublicationDto) {
    const {data} = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Publications}/${AppPath.Add}`, dto,{
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: BlogMessages.Add,
  })
  @UseGuards(CheckAuthGuard)
  @Post(`${AppPath.Upload}-${ImageType.Photo}`)
  @UseInterceptors(FileInterceptor(ImageType.Photo))
  public async createPhotoPublication(@Req() req: Request,  @UploadedFile() file: Express.Multer.File, @Body('tags') tags?:string) {
    const formData = new FormData()
    formData.append(ImageType.Photo, Buffer.from(file.buffer), file.originalname)
    const { data:photo } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Uploader}/${AppPath.Upload}/${ImageType.Photo}`, formData, {
      headers: {
        'Content-Type': req.headers['content-type'],
        ...formData.getHeaders()
      }
    });
    const dto = {type:ImageType.Photo, photo:photo.id, tags:[] }
    if(tags){
    dto.tags = tags.split(',')
    }
    const {data} = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Publications}/${AppPath.Add}`,dto ,{
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: BlogMessages.Update,
  })
  @UseGuards(CheckAuthGuard)
  @Patch(`${AppPath.Update}/${AppPath.Id}`)
  public async update(@Req() req:Request, @Param('id') id: number, @Body() dto: UpdateBlogPublicationDto) {
    const {data} = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Publications}/${id}`, dto,{
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: BlogMessages.Update,
  })
  @UseGuards(CheckAuthGuard)
  @Patch(`${AppPath.Update}/${AppPath.Id}/${ImageType.Photo}`)
  @UseInterceptors(FileInterceptor(ImageType.Photo))
  public async updatePhotoPublication(@Req() req:Request, @UploadedFile() file: Express.Multer.File, @Param('id') id: number,  @Body('tags') tags?:string) {
    const formData = new FormData()
    formData.append(ImageType.Photo, Buffer.from(file.buffer), file.originalname)
    const { data:photo } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Uploader}/${AppPath.Upload}/${ImageType.Photo}`, formData, {
      headers: {
        'Content-Type': req.headers['content-type'],
        ...formData.getHeaders()
      }
    });
    const dto = {type:ImageType.Photo, photo:photo.id, tags:[] }
    if(tags){
    dto.tags = tags.split(',')
    }
    const {data} = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Publications}/${id}`, dto,{
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: BlogMessages.Update,
  })
  @UseGuards(CheckAuthGuard)
  @Post(`${AppPath.Repost}/${AppPath.Id}`)
  public async repost(@Param('id') id: number, @Req() req:Request ) {
    const {data} = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Publications}/${id}/${AppPath.Repost}`,null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: BlogMessages.Remove,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: BlogMessages.DeleteError
  })
  @UseGuards(CheckAuthGuard)
  @Delete(`${AppPath.Delete}/${AppPath.Id}`)
  public async delete(@Param('id') id: number, @Req() req:Request) {
    await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Publications}/${id}`, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
  }

  @ApiResponse({
    status:HttpStatus.CREATED,
    description: BlogMessages.ChangeLike
  })
  @UseGuards(CheckAuthGuard)
  @Post(`${AppPath.Like}/${AppPath.Id}`)
  public async changeLikeStatus( @Param('id') id:number, @Req() req:Request) {
    const {data} = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Likes}/${id}`,null,{
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }
}
