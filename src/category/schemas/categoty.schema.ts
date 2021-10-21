import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type CategoryDocument = Category & Document

@Schema()
export class Category {
    @Prop({ type: String, required: true, unique: true })
    title: string

    @Prop({ type: String, required: true, unique: true })
    description: string

    @Prop([String])
    followers: string[]
}

export const CategorySchema = SchemaFactory.createForClass(Category)
