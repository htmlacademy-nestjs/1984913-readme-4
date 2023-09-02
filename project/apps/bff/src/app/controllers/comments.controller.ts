import { Body, Req, Get, Param, Controller, Post, Query, UseFilters, UseGuards, Delete, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosExceptionFilter } from '../filters/axios-exception.filter';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { ApplicationServiceURL } from '../app.config';
import { AppPath, CommentsMessages, ControllerName } from '../app.constant';
import { CreateCommentDto } from '@project/shared/shared-dto';
import { CommentQuery } from '@project/shared/shared-queries';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags(ControllerName.Comment)
@Controller(ControllerName.Comment)
@UseFilters(AxiosExceptionFilter)
export class CommentsController {
  constructor(
    private readonly httpService: HttpService
  ) { }

  @ApiResponse({
    status:HttpStatus.CREATED,
    description: CommentsMessages.Add
  })
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


  @ApiResponse({
    status: HttpStatus.OK,
    description: CommentsMessages.Show
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: CommentsMessages.InvalidPublication
  })
  @Get(AppPath.Id)
  public async showCommentsByPostId(@Param('id') id: number, @Query() query:CommentQuery) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Comments}/${id}`, {
      params:query
    });
    return data
  }


  @ApiResponse({
    status: HttpStatus.OK,
    description: CommentsMessages.Remove,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: CommentsMessages.InvalidComment,
  })
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
