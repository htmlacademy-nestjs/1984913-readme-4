import { Body, Req, Get, Param, Controller, Post, Query, UseFilters, UseGuards, Delete } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosExceptionFilter } from '../filters/axios-exception.filter';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { ApplicationServiceURL } from '../app.config';
import { AppPath, ControllerName } from '../app.constant';
import { CreateCommentDto } from '@project/shared/shared-dto';
import { CommentQuery } from '@project/shared/shared-queries';

@Controller(ControllerName.Comment)
@UseFilters(AxiosExceptionFilter)
export class CommentsController {
  constructor(
    private readonly httpService: HttpService
  ) { }

  @UseGuards(CheckAuthGuard)
  @Post(AppPath.Add)
  public async createComment( @Body() dto: CreateCommentDto, @Req() req:Request) {
    const {data} = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Comments}/${AppPath.Add}`, dto,{
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @Get(AppPath.Id)
  public async showCommentsByPostId(@Param('id') id: number, @Query() query:CommentQuery) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Comments}/${id}`, {
      params:query
    });
    return data
  }


  @UseGuards(CheckAuthGuard)
  @Delete(`${AppPath.Delete}/${AppPath.Id}`)
  public async remove( @Param('id') id: number, @Req() req:Request) {
    const {data} = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Comments}/${AppPath.Delete}/${id}`, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

}
