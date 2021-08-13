import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { User } from '../../user/schemas/user.schema'
import { Types } from 'mongoose'
import { Category } from 'src/category/schemas/categoty.schema'

export type ForkDocument = Fork & Document

@Schema()
export class Fork {
    @Prop({ type: String, required: true, unique: true })
    title: string

    @Prop({ type: String, required: true, unique: true })
    description: string

    @Prop({ type: Number, required: true })
    year: number

    @Prop({ type: Types.ObjectId, ref: 'User' })
    owner: User

    @Prop({ type: Types.ObjectId, ref: 'Category' })
    category: Category
}

export const ForkSchema = SchemaFactory.createForClass(Fork)
