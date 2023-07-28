import {PhotoPublication} from '@project/shared/app-types';
import { PublicationEntity } from './publication.entity';

export class PhotoPublicationEntity extends PublicationEntity implements PhotoPublication {
  public photo: string;

  constructor(PublicationData: PhotoPublication) {
    super(PublicationData);
    this.fillEntity(PublicationData);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(PublicationData: PhotoPublication) {
    this.photo = PublicationData.photo;
  }

}
