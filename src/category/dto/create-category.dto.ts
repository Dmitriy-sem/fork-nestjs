import { ApiProperty } from '@nestjs/swagger'
import { IsString, Length } from 'class-validator'

export class CreateCategoryDto {
    @ApiProperty()
    @IsString()
    @Length(5)
    title: string

    @ApiProperty()
    @IsString()
    @Length(10)
    description: string
}
