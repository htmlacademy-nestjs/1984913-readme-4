import { Body, Req, Get, Param, Controller, Post, Query, UseFilters, UseGuards, Delete } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosExceptionFilter } from '../filters/axios-exception.filter';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { ApplicationServiceURL } from '../app.config';
import { BlogListPath } from '../app.constant';
import { PostQuery } from '../query/post.query';
import { SearchPostsQuery } from '../query/search.query';


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
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.BlogList}/${id}`);
    return data
  }

}
