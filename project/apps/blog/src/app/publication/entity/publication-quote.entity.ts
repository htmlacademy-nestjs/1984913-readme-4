import {QuotePublication} from '@project/shared/app-types';
import { PublicationEntity } from './publication.entity';

export class QuotePublicationEntity extends PublicationEntity implements QuotePublication {
  public text: string;
  public author: string;

  constructor(PublicationData: QuotePublication) {
    super(PublicationData);
    this.fillEntity(PublicationData);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(PublicationData: QuotePublication) {
    this.text = PublicationData.text;
    this.author = PublicationData.author;
  }

}
