import { ApiProperty } from '@nestjs/swagger'
import { IsString, Length } from 'class-validator'

export class LoginUserDto {
    @ApiProperty()
    @IsString()
    @Length(2, 25)
    username: string

    @ApiProperty()
    @IsString()
    @Length(6)
    password: string
}
