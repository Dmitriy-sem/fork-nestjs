import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, Length } from 'class-validator'

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @Length(2, 25)
    username: string

    @ApiProperty()
    @IsString()
    @Length(6)
    password: string

    @ApiProperty()
    @IsEmail()
    email: string
}
