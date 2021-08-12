import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateCategoryDto } from './dto/create-category.dto'
import { Category, CategoryDocument } from './schemas/categoty.schema'

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel(Category.name)
        private categoryModel: Model<CategoryDocument>
    ) {}

    async createCategory(
        data: CreateCategoryDto
    ): Promise<Category & Document> {
        return this.categoryModel.create(data)
    }
}
