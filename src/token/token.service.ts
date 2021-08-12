import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import * as bcrypt from 'bcrypt'
import { Model } from 'mongoose'
import { User } from 'src/user/schemas/user.schema'
import { TokenDocument } from './schemas/token.schema'
@Injectable()
export class TokenService {
    constructor(
        private jwtService: JwtService,
        @InjectModel('Token') private tokenModel: Model<TokenDocument>
    ) {}

    async hash(password: string): Promise<string> {
        return bcrypt.hash(password, 8)
    }

    async compare(
        clearPassword: string,
        hashPassword: string
    ): Promise<boolean> {
        return bcrypt.compare(clearPassword, hashPassword)
    }

    async createJwt(id: string): Promise<string> {
        return this.jwtService.signAsync(
            { id },
            { secret: process.env.SECRET_KEY, expiresIn: '1h' }
        )
    }

    async writeTokenToDb(user: User, token: string): Promise<TokenDocument> {
        await this.tokenModel.deleteOne({ user })
        return await this.tokenModel.create({ user, token })
    }

    async getUserByToken(token: string) {
        return await this.tokenModel.findOne({ token })
    }
}
