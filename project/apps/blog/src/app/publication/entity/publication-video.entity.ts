import {VideoPublication} from '@project/shared/app-types';
import { PublicationEntity } from './publication.entity';

export class VideoPublicationEntity extends PublicationEntity implements VideoPublication {
  public title: string;
  public link: string;

  constructor(PublicationData: VideoPublication) {
    super(PublicationData);
    this.fillEntity(PublicationData);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(PublicationData: VideoPublication) {
    this.title = PublicationData.title;
    this.link = PublicationData.link;
  }

}
