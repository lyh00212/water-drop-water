import { Controller, Get } from '@nestjs/common'
import { UserService } from './modules/user/user.service'
import { User } from './modules/user/models/user.entity'

@Controller()
export class AppController {
    constructor(private readonly userService: UserService) {}

    @Get('/create')
    async create(): Promise<boolean> {
        return await this.userService.create({
            name: '水滴超级管理员',
            desc: '管理员',
            tel: '8000888',
            password: '123456',
            account: 'admin',
        })
    }
    @Get('/del')
    async del(): Promise<boolean> {
        return await this.userService.del(
            '15e07a7d-21a3-461b-9a70-8e2a24a2eb7b',
        )
    }
    @Get('/update')
    async update(): Promise<boolean> {
        return await this.userService.update(
            '770a5b65-495f-4f3b-ab28-90c48fd41f89',
            {
                name: '水滴超级管理员11111',
            },
        )
    }
    @Get('/find')
    async find(): Promise<User> {
        return await this.userService.find(
            '770a5b65-495f-4f3b-ab28-90c48fd41f89',
        )
    }
}
