import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { EmailSubscriberService } from './email-subscriber.service';
import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { RabbitRouting } from '@project/shared/app-types';
import { MailService } from '../mail/mail.service';
import { NewsletterDto } from './dto/newsletter.dto';
import dayjs from 'dayjs';

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
    private readonly mailService: MailService
  ) {}

  @RabbitSubscribe({
    exchange: 'readme.notify',
    routingKey: RabbitRouting.AddSubscriber,
    queue: 'readme.notify.subscriber',
  })
  public async create(subscriber: CreateSubscriberDto) {
    this.subscriberService.addSubscriber(subscriber);
    await this.mailService.sendNotifyNewSubscriber(subscriber);
  }

  @RabbitSubscribe({
    exchange: 'readme.notify',
    routingKey: RabbitRouting.SendNewsletter,
    queue: 'readme.notify.newsletter',
  })
  public async sendNewsletter(dto: NewsletterDto) {
    const { email, posts } = dto;
    const recipient = await this.subscriberService.getSubscriber(email);
    if (recipient && posts.length > 0) {
      const newPosts = posts.filter((post) =>  dayjs(post.createdDate).isAfter(recipient.dateNotify)
      );
      if (newPosts.length > 0) {
        await this.mailService.sendNewsletter(recipient.email, newPosts);
        this.subscriberService.updateDateSent(recipient);
      }
    }
  }
}
