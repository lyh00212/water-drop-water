import { Module, ConsoleLogger } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './models/user.entity'
import { UserService } from './user.service'

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserService, ConsoleLogger],
    exports: [UserService],
})
export class UserModule {}
