import {LinkPublication} from '@project/shared/app-types';
import { PublicationEntity } from './publication.entity';

export class LinkPublicationEntity extends PublicationEntity implements LinkPublication {
  public link: string;
  public description: string;

  constructor(PublicationData: LinkPublication) {
    super(PublicationData);
    this.fillEntity(PublicationData);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(PublicationData: LinkPublication) {
    this.link = PublicationData.link;
    this.description = PublicationData.link;
  }

}
