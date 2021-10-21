import { Body, Controller, Post, Req } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { Category } from './schemas/categoty.schema'

@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) {}
    @Post()
    create(@Body() body: CreateCategoryDto): Promise<Category> {
        return this.categoryService.createCategory(body)
    }
}
