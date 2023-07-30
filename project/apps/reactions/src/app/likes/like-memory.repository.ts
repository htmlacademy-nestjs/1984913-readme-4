import { CRUDRepository } from '@project/util/util-types';
import { Injectable } from '@nestjs/common';
import { Like } from '@project/shared/app-types';
import { LikeEntity } from './like-entity';
import { randomUUID } from 'crypto';

@Injectable()
export class LikeMemoryRepository implements CRUDRepository<LikeEntity, string, Like> {
  private repository: Record<string, Like> = {};

  public async create(item: LikeEntity): Promise<Like> {
    const entry = { ...item.toObject(), _id: randomUUID()};
    this.repository[entry._id] = entry;

    return entry;
  }

  public async findById(id: string): Promise<Like> {
    if (this.repository[id]) {
      return {...this.repository[id]};
    }

    return null;
  }

  public async findByPostId(postId: string): Promise<Like[] | null> {
    const existLike = Object.values(this.repository)
      .filter((item) => item.postId === postId);

    if (! existLike) {
      return null;
    }

    return [...existLike];
  }

  public async update(id: string, item: LikeEntity): Promise<Like> {
    this.repository[id] = { ...item.toObject(), _id: id};
    return this.findById(id);
  }

  public async destroy(id: string): Promise<void> {
    delete this.repository[id];
  }

}
