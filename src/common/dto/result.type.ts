import { ClassType } from 'type-graphql'
import { ObjectType, Int, Field } from '@nestjs/graphql'
import { Page } from './page.type'

export interface IResult<T> {
    code: number
    message: string
    data?: T
}

export interface IResults<T> {
    code: number
    message: string
    data?: T[]
    page?: Page
}

export function createResult<T extends object>(
    ItemType: ClassType<T>,
): ClassType<IResult<T>> {
    @ObjectType()
    class Result implements IResult<T> {
        @Field(() => Int)
        code: number
        @Field(() => String)
        message: string
        @Field(() => ItemType, { nullable: true })
        data?: T
    }
    return Result
}

export function createResults<T extends object>(
    ItemTypes: ClassType<T>,
): ClassType<IResults<T>> {
    @ObjectType()
    class Results implements IResults<T> {
        @Field(() => Int)
        code: number
        @Field(() => String)
        message: string
        @Field(() => [ItemTypes], { nullable: true })
        data?: T[]
        @Field(() => Page, { nullable: true })
        page?: Page
    }
    return Results
}

@ObjectType()
export class Result {
    @Field(() => Int)
    code: number
    @Field(() => String)
    message: string
    @Field(() => String, { nullable: true })
    data?: string
}
