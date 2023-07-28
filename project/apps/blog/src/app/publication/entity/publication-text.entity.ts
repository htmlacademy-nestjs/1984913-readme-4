import {TextPublication} from '@project/shared/app-types';
import { PublicationEntity } from './publication.entity';

export class TextPublicationEntity extends PublicationEntity implements TextPublication {
  public text: string;
  public title: string;
  public anonuncement: string;

  constructor(PublicationData: TextPublication) {
    super(PublicationData);
    this.fillEntity(PublicationData);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(PublicationData: TextPublication) {
    this.text = PublicationData.text;
    this.title = PublicationData.title;
    this.anonuncement = PublicationData.anonuncement;
  }

}
