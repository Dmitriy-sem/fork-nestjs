import { Body, Controller, Post, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Response } from 'express'
import { CreateUserDto } from '../user/dto/create-user.dto'
import { LoginUserDto } from '../user/dto/login-user.dto'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    register(@Body() newUserDto: CreateUserDto) {
        return this.authService.createUser(newUserDto)
    }

    @Post('login')
    async login(
        @Body() userDto: LoginUserDto,
        @Res({ passthrough: true }) response: Response,
    ) {
        return this.authService.loginUser(userDto, response)
    }
}
