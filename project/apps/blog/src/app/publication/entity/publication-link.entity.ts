import {LinkPublication} from '@project/shared/app-types';
import { PublicationEntity } from './publication.entity';

export class LinkPublicationEntity extends PublicationEntity implements LinkPublication {
  public link: string;
  public description: string;

  constructor(publicationData: LinkPublication) {
    super(publicationData);
    this.fillEntity(publicationData);
  }

  public fillEntity(publicationData: LinkPublication) {
    this.link = publicationData.link;
    this.description = publicationData.link;
  }

}
