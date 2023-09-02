import { Publication } from '@prisma/client';
import { ApplicationServiceURL } from '../app.config';
import { HttpService } from '@nestjs/axios';

export async function getUserInfo(
  postData: Publication,
  httpService: HttpService
) {
  const userId = postData.isReposted ? postData.originUserId : postData.userId;
  const { data: userData } = await httpService.axiosRef.get(
    `${ApplicationServiceURL.Users}/${userId}`
  );
const {email, name, id} = userData
  return {email, name, id};
}

export async function getUserInfoForAll(
  postData: Publication[],
  httpService: HttpService
) {
  return await Promise.all(postData.map(async (item:Publication)=>{
    const userInfo = await getUserInfo(item, httpService);
    return {...item, userInfo}
  }))
}

