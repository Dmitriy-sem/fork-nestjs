import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateUserDto } from 'src/user/dto/create-user.dto'
import { UserDocument } from 'src/user/schemas/user.schema'

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

    async createUser(newUserData: CreateUserDto): Promise<UserDocument> {
        return this.userModel.create(newUserData)
    }

    async findUser(username: string): Promise<UserDocument> {
        return this.userModel.findOne({ username })
    }
}
