import {TextPublication} from '@project/shared/app-types';
import { PublicationEntity } from './publication.entity';

export class PublicationTextEntity extends PublicationEntity implements TextPublication {
  public text: string;
  public title: string;
  public announcement: string;

  constructor(publicationData: TextPublication) {
    super(publicationData);
    this.fillEntity(publicationData);
  }

  public fillEntity(publicationData: TextPublication) {
    this.text = publicationData.text;
    this.title = publicationData.title;
    this.announcement = publicationData.announcement;
  }

}
