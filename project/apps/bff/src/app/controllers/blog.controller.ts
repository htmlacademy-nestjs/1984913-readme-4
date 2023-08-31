import { Body, Req, Get, Param, Controller, Post, Query, UseFilters, UseGuards, Delete, Patch } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosExceptionFilter } from '../filters/axios-exception.filter';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { ApplicationServiceURL } from '../app.config';
import { BlogListPath, CommentsPath } from '../app.constant';
import { PostQuery } from '../query/post.query';
import { SearchPostsQuery } from '../query/search.query';
import { CreateBlogPublicationDto, UpdateBlogPublicationDto } from '@project/shared/shared-dto';


@Controller('blog')
@UseFilters(AxiosExceptionFilter)
export class BlogController {
  constructor(
    private readonly httpService: HttpService
  ) { }

  @Get()
  public async showPublications(@Query() query:PostQuery) {
  const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.BlogList}`, {
    params:query
  });
  return data;
  }

  @Get(BlogListPath.Search)
  public async searchPublicationsByTitle(@Query() query:SearchPostsQuery) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.BlogList}/${BlogListPath.Search}`, {
      params:query
    });
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @Get(BlogListPath.Drafts)
  async showDrafts(@Req() req:Request) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.BlogList}/${BlogListPath.Drafts}`,{
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data
  }

  @UseGuards(CheckAuthGuard)
  @Get(BlogListPath.SendNewsletter)
  public async sendNews(@Req() req:Request) {
    await this.httpService.axiosRef.get(`${ApplicationServiceURL.BlogList}/${BlogListPath.SendNewsletter}`,{
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
  }

  @Get(BlogListPath.Id)
  public async showPublicationById(@Param('id') id: number) {
    const { data:publicationData } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.BlogList}/${id}`);
    const { data:likesData} = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Likes}/${id}`);
    const { data:commentsData } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Comments}/${id}`);
    const likesCount = likesData.likedByUsersIds.length;
    const commentsCount = commentsData.length;
    return {...publicationData, likesCount, commentsCount}
  }


  @UseGuards(CheckAuthGuard)
  @Post(CommentsPath.Add)
  public async createPublication(@Req() req:Request, @Body() dto: CreateBlogPublicationDto) {
    const {data} = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Publications}/${CommentsPath.Add}`, dto,{
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @Patch('update-post/:id')
  public async update(@Req() req:Request, @Param('id') id: number, @Body() dto: UpdateBlogPublicationDto) {
    const {data} = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Publications}/${id}`, dto,{
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @Post(`repost/:id`)
  public async repost(@Param('id') id: number, @Req() req:Request ) {
    const {data} = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Publications}/${id}/${BlogListPath.Repost}`,null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @Delete('delete-post/:id')
  public async delete(@Param('id') id: number, @Req() req:Request) {
    await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Publications}/${id}`, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
  }

  @UseGuards(CheckAuthGuard)
  @Post('change-like-status/:id')
  public async changeLikeStatus( @Param('id') id:number, @Req() req:Request) {
    const {data} = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Likes}/${id}`,null,{
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }
}
