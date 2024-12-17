import { Module, ConsoleLogger } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthService } from './auth.service'
import { AuthResolver } from './auth.resolver'
import { UserService } from '@/modules/user/user.service'
import { User } from '@/modules/user/models/user.entity'
import { JwtModule } from '@nestjs/jwt'
import { JWT_SECRET } from '@/common/constants/aliyun'
import { JwtStrategy } from './jwt.strategy'

@Module({
    imports: [
        JwtModule.register({
            // 设置秘钥
            secret: JWT_SECRET,
            signOptions: {
                // 设置秘钥过期时间
                expiresIn: 60 * 60 * 24 * 7 + 's',
            },
        }),
        TypeOrmModule.forFeature([User]),
    ],
    providers: [
        JwtStrategy,
        ConsoleLogger,
        AuthService,
        AuthResolver,
        UserService,
    ],
    exports: [],
})
export class AuthModule {}
