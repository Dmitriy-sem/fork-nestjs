import { IsInt, IsString, Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateForkDto {
    @ApiProperty()
    @IsString()
    @Length(5)
    title: string

    @ApiProperty()
    @IsString()
    @Length(10)
    description: string

    @ApiProperty()
    @IsInt()
    year: number

    @ApiProperty()
    @IsString()
    category: string
}
