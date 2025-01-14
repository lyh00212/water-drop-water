import { Query, Resolver } from '@nestjs/graphql'
import { OSSType } from './dto/oss.type'
import { OSSService } from './oss.service'
// import { UseGuards } from '@nestjs/common'
// import { GqlAuthGuard } from '@/common/guards/auth.guards'

@Resolver()
// @UseGuards(GqlAuthGuard)
export class OSSResolver {
    constructor(private readonly ossService: OSSService) {}

    @Query(() => OSSType, { description: '获取oss相关信息' })
    async getOSSInfo(): Promise<OSSType> {
        return await this.ossService.getSignature()
    }
}
