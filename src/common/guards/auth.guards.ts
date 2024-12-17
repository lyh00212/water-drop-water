import { ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
// AuthGuard: nestjs中标准的授权守卫基础类
// AuthGuard('jwt')：告诉授权守卫使用jwt策略
export class GqlAuthGuard extends AuthGuard('jwt') {
    getRequest(context: ExecutionContext) {
        // graphql的守卫和其他的不同，需要对其请求层做一下特殊处理
        // 将request由graphql中的req转化为jwt守卫能够识别的req
        const ctx = GqlExecutionContext.create(context)
        return ctx.getContext().req
    }
}
