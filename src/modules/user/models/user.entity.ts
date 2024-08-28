import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { IsNotEmpty } from 'class-validator'

// 将当前类标记为一个名为'user'的数据库实体
@Entity('user')
export class User {
    // id 属性将自动生成一个UUID作为主键
    @PrimaryGeneratedColumn('uuid')
    id: string

    // 此处表示name为昵称，默认值为空
    @Column({
        // 给数据表字段加注释
        comment: '昵称',
        // 默认值
        default: '',
    })
    // 指定非空字段（写在哪个字段上面，哪个字段就不为空，此处是表示name不为空）
    @IsNotEmpty()
    name: string

    @Column({
        comment: '描述',
        nullable: true,
    })
    desc: string

    @Column({
        comment: '手机号',
        nullable: true,
    })
    tel: string

    @Column({
        comment: '密码',
        nullable: true,
    })
    password: string

    @Column({
        comment: '账户信息',
        nullable: true,
    })
    account: string
}
