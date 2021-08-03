import { IsInt, Length } from 'class-validator'

export class CreateForkDto {
    @Length(5)
    title: string

    @Length(10)
    description: string

    @IsInt()
    year: number

    category: string
}
