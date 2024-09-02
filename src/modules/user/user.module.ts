import { Module, ConsoleLogger } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './models/user.entity'
import { UserService } from './user.service'
import { UserResolver } from './user.resolver'

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [ConsoleLogger, UserService, UserResolver],
    // exports之后，app.controller.ts中才能使用
    exports: [UserService],
})
export class UserModule {}
