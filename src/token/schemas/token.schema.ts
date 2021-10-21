import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { User } from '../../user/schemas/user.schema'
import { Schema as MSchema } from 'mongoose'

export type TokenDocument = Token & Document

@Schema()
export class Token {
    @Prop({ type: String, required: true })
    token: string

    @Prop({ type: MSchema.Types.ObjectId, ref: 'User', required: true })
    user: User | MSchema.Types.ObjectId

    @Prop({ type: Date, expires: '1h', default: Date.now })
    createdAt: Date
}

export const TokenSchema = SchemaFactory.createForClass(Token)
