import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

@Injectable()
export class TokenService {
    constructor(private jwtService: JwtService) {}

    hash(password: string): Promise<string> {
        return bcrypt.hash(password, 8)
    }

    compare(clearPassword: string, hashPassword: string): Promise<boolean> {
        return bcrypt.compare(clearPassword, hashPassword)
    }

    createJwt(id: string): Promise<string> {
        return this.jwtService.signAsync({ id })
    }
}
