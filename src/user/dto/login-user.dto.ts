import { Length } from 'class-validator'

export class LoginUserDto {
    @Length(2, 25)
    username: string

    @Length(6)
    password: string
}
