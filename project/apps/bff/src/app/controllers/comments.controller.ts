import { Body, Req, Get, Param, Controller, Post, Query, UseFilters, UseGuards, Delete } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosExceptionFilter } from '../filters/axios-exception.filter';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { ApplicationServiceURL } from '../app.config';
import { CommentsPath } from '../app.constant';
import { CreateCommentDto } from '@project/shared/shared-dto';
import { CommentQuery } from '../query/comment.query';

@Controller('comments')
@UseFilters(AxiosExceptionFilter)
export class CommentsController {
  constructor(
    private readonly httpService: HttpService
  ) { }

  @UseGuards(CheckAuthGuard)
  @Post(CommentsPath.Add)
  public async createComment( @Body() dto: CreateCommentDto, @Req() req:Request) {
    const {data} = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Comments}/${CommentsPath.Add}`, dto,{
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @Get(CommentsPath.PostId)
  public async showCommentsByPostId(@Param('postId') id: number, @Query() query:CommentQuery) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Comments}/${id}`, {
      params:query
    });
    return data
  }


  @UseGuards(CheckAuthGuard)
  @Delete(`${CommentsPath.Delete}/:commentId`)
  public async remove( @Param('commentId') id: number, @Req() req:Request) {
    const {data} = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Comments}/${CommentsPath.Delete}/${id}`, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

}
