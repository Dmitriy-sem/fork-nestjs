import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateUserDto } from '../user/dto/create-user.dto'
import { LoginUserDto } from '../user/dto/login-user.dto'
import { Response } from 'express'
import { UserService } from 'src/user/user.service'
import { TokenService } from 'src/token/token.service'
import { UserDocument } from 'src/user/schemas/user.schema'

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private tokenService: TokenService
    ) {}

    async createUser(newUserDto: CreateUserDto): Promise<UserDocument> {
        const { username, password, email } = newUserDto
        const isExist = await this.userService.findUser(username)

        if (!isExist) {
            const hashedPassword = await this.tokenService.hash(password)
            const newUserData = { username, email, password: hashedPassword }
            return this.userService.createUser(newUserData)
        }
        throw new HttpException(
            'User with this username is already exists',
            HttpStatus.BAD_REQUEST
        )
    }

    async loginUser(
        userDto: LoginUserDto,
        response: Response
    ): Promise<UserDocument> {
        const { username, password } = userDto
        const user = await this.userService.findUser(username)
        if (!user) {
            throw new HttpException(
                "User with this username doesn't exist",
                HttpStatus.BAD_REQUEST
            )
        }
        if (!(await this.tokenService.compare(password, user.password))) {
            throw new HttpException(
                'Please enter the correct password',
                HttpStatus.BAD_REQUEST
            )
        }
        const jwt = await this.tokenService.createJwt(user._id)
        this.tokenService.writeTokenToDb(user, jwt)
        response.cookie('jwt', jwt, { httpOnly: true })
        return user
    }
}
