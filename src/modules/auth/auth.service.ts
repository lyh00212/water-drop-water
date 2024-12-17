import { Injectable } from '@nestjs/common'
import * as Dysmsapi from '@alicloud/dysmsapi20170525'
import * as Util from '@alicloud/tea-util'
import * as dayjs from 'dayjs'
import { getRandomCode } from '@/shared/utils'
import { SIGN_NAME, TEMPLATE_CODE } from '@/common/constants/aliyun'
import { UserService } from '@/modules/user/user.service'
import { msgClient } from '@/shared/utils/msg'
import { Result } from '@/common/dto/result.type'
import { CODE_NOT_EXPIRE, SUCCESS, UPDATE_ERROR } from '@/common/constants/code'

// 用于处理用户相关的业务逻辑
@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    // 发送短信验证码
    async sendCodeMsg(tel: string): Promise<Result> {
        // 限制验证码的发送，验证码在有效期内，再次请求发送验证码时，不执行发送操作
        const user = await this.userService.findByTel(tel)
        // 获取到当前时间和上次验证码存储时间之间相差多少毫秒
        const diffTime = dayjs().diff(dayjs(user.codeCreateTimeAt))
        // 如何时间间隔不足1分钟，则不发送验证码
        if (diffTime < 60 * 1000) {
            return {
                code: CODE_NOT_EXPIRE,
                message: 'code 尚未过期',
            }
        }

        const code = getRandomCode()
        // 1.发送短信
        const sendSmsRequest = new Dysmsapi.SendSmsRequest({
            phoneNumbers: tel,
            signName: SIGN_NAME,
            templateCode: TEMPLATE_CODE,
            templateParam: `{\"code\":\"${code}\"}`,
        })
        const runtime = new Util.RuntimeOptions({})
        try {
            // 复制代码运行请自行打印 API 的返回值
            await msgClient.sendSmsWithOptions(sendSmsRequest, runtime)
            // 验证码获取成功后的操作
            if (user) {
                // 如果数据库中已经存在该用户，则更新用户的验证码
                const result = await this.userService.updateCode(user.id, code)
                if (result) {
                    return {
                        code: SUCCESS,
                        message: '获取账号信息成功',
                    }
                }
                return {
                    code: UPDATE_ERROR,
                    message: '更新code失败',
                }
            }
            const result = await this.userService.create({
                tel,
                code,
                codeCreateTimeAt: new Date(),
            })
            if (result) {
                return {
                    code: SUCCESS,
                    message: '创建账号成功',
                }
            }
            return {
                code: UPDATE_ERROR,
                message: '创建账号失败',
            }
        } catch (error) {
            // 此处仅做打印展示，请谨慎对待异常处理，在工程项目中切勿直接忽略异常。
            // 错误 message
            console.log(error.message)
            // 诊断地址
            console.log(error.data['Recommend'])
        }
    }
}
