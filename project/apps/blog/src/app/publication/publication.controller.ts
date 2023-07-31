import { Body, Controller, HttpStatus, Param, Post, Delete, Patch } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { ApiResponse } from '@nestjs/swagger';
import { PublicationMessages, PublicationsError } from './publication.constant';
import { PublicationRdo } from './rdo/publication.rdo';
import { fillObject } from '@project/util/util-core';
import { TextPublicationRdo } from './rdo/publication-text.rdo';
import { CreateTextPublicationDto } from './dto/create/publication-text.dto';
import { UpdateTextPublicationDto } from './dto/update/publication-text.dto';

@Controller('publication')
export class PublicationController {
  constructor(
    private readonly publicationsService: PublicationService
  ) {}

  @ApiResponse({
    type: PublicationRdo,
    status: HttpStatus.CREATED,
    description: PublicationMessages.Add,
  })
  @Post('add')
  public async create(@Body() dto: CreateTextPublicationDto) {
    const publication = await this.publicationsService.create(dto);
    return fillObject(TextPublicationRdo, publication);
  }

  @ApiResponse({
    type: PublicationRdo,
    status: HttpStatus.CREATED,
    description: PublicationMessages.Update,
  })
  @Patch(':id')
  public async update(@Param('id') id: string, @Body() dto: UpdateTextPublicationDto) {
    const publication = await this.publicationsService.update(id, dto);
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
  @Delete(':id')
  public async delete(@Param('id') id: string) {
    return await this.publicationsService.remove(id);
  }
}
