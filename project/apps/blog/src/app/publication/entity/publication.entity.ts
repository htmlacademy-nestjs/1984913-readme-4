import {Publication} from '@project/shared/app-types';
import { DEFAULT_AMOUNT, DEFAULT_STATUS } from '../publication.constant';
import { PublicationStatus, PublicationType } from '@prisma/client';

export abstract class PublicationEntity implements Publication{
  public _id?: number;
  public _userId?: string;
  public _originUserId?: string;
  public _originId?: string;
  public type: PublicationType;
  public createdDate: string;
  public postedDate: string;
  public status: PublicationStatus;
  public isReposted:boolean;
  public tags:string[];
  public likesCount:number;
  public commentsCount:number;


  constructor(publicationData: Publication) {
    this._id = publicationData._id;
    this._userId = publicationData._userId;
    this._originUserId = publicationData._originUserId;
    this._originId = publicationData._originId;
    this.type = publicationData.type;
    this.createdDate = publicationData.createdDate;
    this.postedDate = publicationData.postedDate;
    this.status = publicationData.status;
    this.isReposted = publicationData.isReposted||DEFAULT_STATUS;
    this.tags = publicationData.tags;
    this.likesCount = publicationData.likesCount||DEFAULT_AMOUNT;
    this.commentsCount = publicationData.commentsCount||DEFAULT_AMOUNT;  }

  public toObject() {
    return {...this};
  }

}
