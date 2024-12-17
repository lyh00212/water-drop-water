import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JWT_SECRET } from '@/common/constants/aliyun'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            // 定义从header中获取前缀为Bearer的token
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: JWT_SECRET,
        })
    }
    // token中会带有用户id，这里就是去解析出用户id，然后判断
    async validate(user): Promise<any> {
        if (!user.id) {
            // 没有用户id时，则抛出401错误
            throw new UnauthorizedException()
        }
        return user
    }
}
