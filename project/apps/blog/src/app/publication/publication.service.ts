import { Injectable } from '@nestjs/common';
import { PublicationMemoryRepository } from './publication-memory.repository';

@Injectable()
export class PublicationService {
  constructor(
    private readonly publicationRepository: PublicationMemoryRepository
  ) {}

}
