import {PhotoPublication} from '@project/shared/app-types';
import { PublicationEntity } from './publication.entity';

export class PhotoPublicationEntity extends PublicationEntity implements PhotoPublication {
  public photo: string;

  constructor(publicationData: PhotoPublication) {
    super(publicationData);
    this.fillEntity(publicationData);
  }

  public fillEntity(publicationData: PhotoPublication) {
    this.photo = publicationData.photo;
  }

}
