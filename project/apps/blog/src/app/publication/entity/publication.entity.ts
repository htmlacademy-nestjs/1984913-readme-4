import {Publication, PublicationStatus, PublicationType} from '@project/shared/app-types';
import { DEFAULT_AMOUNT, DEFAULT_STATUS } from '../publication.constant';

export class PublicationEntity implements Publication {
  public _id: string;
  public _userId: string;
  public _originUserId: string;
  public _originId: string;
  public type: PublicationType;
  public createdDate: string;
  public postedDate: string;
  public status: PublicationStatus;
  public isReposted:boolean;
  public tags:string[];
  public likesCount:number;
  public commentsCount:number;


  constructor(PublicationData: Publication) {
    this.fillEntity(PublicationData);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(PublicationData: Publication) {
    this._id = PublicationData._id;
    this._userId = PublicationData._userId;
    this._originUserId = PublicationData._originUserId;
    this._originId = PublicationData._originId;
    this.type = PublicationData.type;
    this.createdDate = PublicationData.createdDate;
    this.postedDate = PublicationData.postedDate;
    this.status = PublicationData.status;
    this.isReposted = PublicationData.isReposted||DEFAULT_STATUS;
    this.tags = PublicationData.tags;
    this.likesCount = PublicationData.likesCount||DEFAULT_AMOUNT;
    this.commentsCount = PublicationData.commentsCount||DEFAULT_AMOUNT;
  }

}
