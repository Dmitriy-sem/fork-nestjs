import { Body, Controller, Post, Res } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt'
import { Response } from 'express'
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';


@Controller('auth')
export class AuthController {
    constructor(
        private AuthService: AuthService,
        private jwtService: JwtService
    ){}
    
    @Post('register')
    async register(@Body() newUserDto: CreateUserDto){
        const {username, password, email} = newUserDto
        const isExist = await this.AuthService.findUser(username)
        if (!isExist) {
            const hashedPassword = await bcrypt.hash(password, 8)
            this.AuthService.createUser({username, password: hashedPassword, email})
            return `User ${username} was registered`
        } return 'User with this username is already exists'
        
    }

    @Post('login')
    async login(
        @Body() userDto: LoginUserDto,
        @Res({passthrough: true}) response: Response
    ) {
        const {username, password} = userDto
        const user = await this.AuthService.findUser(username)
        if (!user) {
            return 'User with this username doesn\'t exist'
        }

        if (!await bcrypt.compare(password, user.password)){
            return 'Please enter the correct password'
        }
        const jwt = await this.jwtService.signAsync({id: user._id})
        response.cookie('jwt', jwt, {httpOnly: true})
        response.cookie('user', user.id, {httpOnly: true})
        return 'Successs'
    }
}
