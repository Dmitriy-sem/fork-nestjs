import { IsEmail, Length } from 'class-validator'

export class CreateUserDto {
    @Length(2, 25)
    username: string

    @Length(6)
    password: string

    @IsEmail()
    email: string
}
