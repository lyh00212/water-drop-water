import { Args, Mutation, Query, Resolver, Context } from '@nestjs/graphql'
import { UserService } from './user.service'
import { UserInput } from './dto/user-input.type'
import { UserType } from './dto/user.type'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '@/common/guards/auth.guards'
import { Result } from '@/common/dto/result.type'
import { SUCCESS, UPDATE_ERROR } from '@/common/constants/code'

@Resolver()
@UseGuards(GqlAuthGuard)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Mutation(() => Boolean, { description: '新增用户' })
    async create(@Args('params') params: UserInput): Promise<boolean> {
        return await this.userService.create(params)
    }
    @Query(() => UserType, { description: '使用id查询用户' })
    async find(@Args('id') id: string): Promise<UserType> {
        return await this.userService.find(id)
    }
    @Query(() => UserType, { description: '获取用户相关数据' })
    async getUserInfo(@Context() cxt: any): Promise<UserType> {
        console.log(cxt.req.user)
        const id = cxt.req.user.id
        return await this.userService.find(id)
    }
    @Mutation(() => Boolean, { description: '更新用户' })
    async update(
        @Args('id') id: string,
        @Args('params') params: UserInput,
    ): Promise<boolean> {
        return await this.userService.update(id, params)
    }
    @Mutation(() => Boolean, { description: '删除用户' })
    async del(@Args('id') id: string): Promise<boolean> {
        return await this.userService.del(id)
    }
    @Mutation(() => Result, { description: '更新用户' })
    async updateUserInfo(
        @Args('id') id: string,
        @Args('params') params: UserInput,
    ): Promise<Result> {
        const res = await this.userService.update(id, params)
        if (res) {
            return {
                code: SUCCESS,
                message: '更新成功',
            }
        }
        return {
            code: UPDATE_ERROR,
            message: '更新失败',
        }
    }
}
