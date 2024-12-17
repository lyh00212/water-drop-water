import { Field, InputType } from '@nestjs/graphql'

// 用于声明 UserInput 类为 GraphQL 的输入类型，以便在 GraphQL API 中作为参数使用
@InputType()
export class UserInput {
    // 用于定义类属性作为 GraphQL 字段。它允许添加描述或配置字段的行为。
    // 在这里，@Field({ description: '昵称' }) 为 name 属性添加了描述信息。
    @Field({ description: '昵称' })
    name?: string
    @Field({ description: '简介' })
    desc: string
    @Field({ description: '头像' })
    avatar: string
}
