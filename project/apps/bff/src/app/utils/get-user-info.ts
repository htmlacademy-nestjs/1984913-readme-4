import { PrismaPublication } from '@project/shared/app-types';
import { ApplicationServiceURL } from '../app.config';
import { HttpService } from '@nestjs/axios';

export async function getUserInfo(
  postData: PrismaPublication,
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
  postData: PrismaPublication[],
  httpService: HttpService
) {
  return await Promise.all(postData.map(async (item:PrismaPublication)=>{
    const userInfo = await getUserInfo(item, httpService);
    return {...item, userInfo}
  }))
}

