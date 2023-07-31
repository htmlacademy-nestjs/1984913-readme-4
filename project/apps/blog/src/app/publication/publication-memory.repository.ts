import { CRUDRepository } from '@project/util/util-types';
import { BlogPublication } from '@project/shared/app-types';
import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { BlogPublicationEntity } from './entity/blog-publication-entity.type';

@Injectable()
export class PublicationMemoryRepository implements CRUDRepository<BlogPublicationEntity, string, BlogPublication> {
  private repository: Record<string, BlogPublication> = {};


  public async create(item: BlogPublicationEntity): Promise<BlogPublication> {
    const entry = { ...item.toObject(), _id: randomUUID()};
    this.repository[entry._id] = entry;

    return entry;
  }

  public async findById(id: string): Promise<BlogPublication> {
    if (this.repository[id]) {
      return {...this.repository[id]};
    }

    return null;
  }

  public async findAll(): Promise<BlogPublication[]> {
    const existPublication = Object.values(this.repository);

    if (! existPublication) {
      return null;
    }

    return [...existPublication];
  }

  public async update(id: string, item: BlogPublicationEntity): Promise<BlogPublication> {
    this.repository[id] = { ...item.toObject(), _id: id};
    return this.findById(id);
  }

  public async destroy(id: string): Promise<void> {
    delete this.repository[id];
  }
}
