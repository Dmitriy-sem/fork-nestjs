import { Body, Controller, Post } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CreateCategoryDto } from './dto/create-category.dto'

@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) {}
    @Post()
    create(@Body() body: CreateCategoryDto) {
        return this.categoryService.createCategory(body)
    }
}
