import { Injectable } from '@nestjs/common'
import * as OSS from 'ali-oss'
import * as dayjs from 'dayjs'
import { OSSType } from './dto/oss.type'
import { ACCESS_KEY, ACCESS_KEY_SECRET } from '@/common/constants/aliyun'

// 用于处理用户相关的业务逻辑
@Injectable()
export class OSSService {
    /**
     * @description 获取 OSS 上传签名
     * @see https://help.aliyun.com/document_detail/31926.html
     * @return {*}  {Promise<OSSType>}
     * @memberof OSSService
     */
    async getSignature(): Promise<OSSType> {
        const config = {
            accessKeyId: ACCESS_KEY,
            accessKeySecret: ACCESS_KEY_SECRET,
            bucket: 'water-drop-server-assets',
            dir: 'images/',
        }

        const client = new OSS(config)

        const date = new Date()
        date.setDate(date.getDate() + 1)
        const policy = {
            expiration: date.toISOString(), // 请求有效期
            conditions: [
                ['content-length-range', 0, 1048576000], // 设置上传文件的大小限制
            ],
        }

        // bucket域名
        // const host = 'water-drop-server-assets.oss-cn-hangzhou.aliyuncs.com'
        const host =
            `https://${config.bucket}.${(await client.getBucketLocation()).location}.aliyuncs.com`.toString()

        //签名
        const formData = await client.calculatePostSignature(policy)

        //返回参数
        const params = {
            expire: dayjs().add(1, 'days').unix().toString(),
            policy: formData.policy,
            signature: formData.Signature,
            accessId: formData.OSSAccessKeyId,
            host,
            dir: 'images/',
        }
        return params
    }
}
