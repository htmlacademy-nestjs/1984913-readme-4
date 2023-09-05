import {VideoPublication} from '@project/shared/app-types';
import { PublicationEntity } from './publication.entity';

export class PublicationVideoEntity extends PublicationEntity implements VideoPublication {
  public title: string;
  public link: string;

  constructor(publicationData: VideoPublication) {
    super(publicationData);
    this.fillEntity(publicationData);
  }

  public fillEntity(publicationData: VideoPublication) {
    this.title = publicationData.title;
    this.link = publicationData.link;
  }

}
