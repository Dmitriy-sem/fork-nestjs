import { Length } from 'class-validator'

export class CreateCategoryDto {
    @Length(5)
    title: string

    @Length(10)
    description: string
}
