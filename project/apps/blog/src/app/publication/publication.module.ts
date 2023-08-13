import { Module } from '@nestjs/common';
import { PublicationController } from './publication.controller';
import { PublicationService } from './publication.service';
import { PublicationRepository } from './publication.repository';

@Module({
  controllers: [PublicationController],
  providers: [PublicationService, PublicationRepository],
  exports: [PublicationRepository],
})
export class PublicationModule {}
