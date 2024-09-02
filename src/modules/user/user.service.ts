import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, DeepPartial } from 'typeorm'
import { User } from './models/user.entity'

// 用于处理用户相关的业务逻辑
@Injectable()
export class UserService {
    // 这个构造函数的主要功能是通过依赖注入的方式，将一个用于操作用户数据的仓库对象UserRepository实例化并绑定到当前类中，以便在类的方法中可以方便地进行用户数据的数据库操作
    constructor(
        // 将UserRepository实例注入到当前类中。这样，当前类就可以访问和操作UserRepository中定义的方法和属性。
        // UserRepository参数的类型为Repository<User>，表示这是一个用于操作User实体的仓库对象，提供了对数据库中用户数据的CRUD（创建、读取、更新、删除）操作。
        // private表示UserRepository属性只能在当前类内部被访问和修改
        @InjectRepository(User) private UserRepository: Repository<User>,
    ) {}

    // 通过 UserRepository.insert 方法，异步地将 entity 插入数据库，最后返回 true
    // entity 表示一个要创建的新用户对象，其类型为 DeepPartial<User>。
    // 这意味着 entity 可以是 User 类型的一个深度部分对象，即 entity 的属性可以是部分的、完整的或嵌套属性的部分值。
    // 这提供了灵活性，在创建新用户时不必严格要求所有属性都是完整的 User 类型定义。

    // 新增一个用户
    async create(entity: DeepPartial<User>): Promise<boolean> {
        const res = await this.UserRepository.insert(entity)
        if (res && res.raw.affectedRows > 0) {
            return true
        }
        return false
    }
    // 删除一个用户
    async del(id: string): Promise<boolean> {
        const res = await this.UserRepository.delete(id)
        if (res.affected > 0) {
            return true
        }
        return false
    }
    // 更新一个用户
    async update(id: string, entity: DeepPartial<User>): Promise<boolean> {
        const res = await this.UserRepository.update(id, entity)
        if (res.affected > 0) {
            return true
        }
        return false
    }
    // 查询一个用户
    async find(id: string): Promise<User> {
        const res = await this.UserRepository.findOne({
            where: {
                id,
            },
        })
        return res
    }
}
