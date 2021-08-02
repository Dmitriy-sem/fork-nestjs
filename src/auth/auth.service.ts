import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';


@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}

    async createUser(data: CreateUserDto){
        this.userModel.create(data)
    }

    async findUser(username: string){
        return this.userModel.findOne({username})
    }
}
