import { Body, Controller, Post, Req } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { Request } from 'express'
import { Category } from './schemas/categoty.schema'

type followBody = {
    category: string
}

@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) {}
    @Post()
    create(@Body() body: CreateCategoryDto): Promise<Category & Document> {
        return this.categoryService.createCategory(body)
    }

    @Post('follow')
    follow(
        @Body() body: followBody,
        @Req() req: Request,
    ): Promise<Category & Document> {
        return this.categoryService.followCategory(body.category, req)
    }
}
