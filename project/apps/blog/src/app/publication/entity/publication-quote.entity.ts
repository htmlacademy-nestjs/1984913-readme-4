import {QuotePublication} from '@project/shared/app-types';
import { PublicationEntity } from './publication.entity';

export class QuotePublicationEntity extends PublicationEntity implements QuotePublication {
  public text: string;
  public author: string;

  constructor(publicationData: QuotePublication) {
    super(publicationData);
    this.fillEntity(publicationData);
  }

  public fillEntity(publicationData: QuotePublication) {
    this.text = publicationData.text;
    this.author = publicationData.author;
  }

}
