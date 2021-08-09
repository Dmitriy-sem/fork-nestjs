import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateCategoryDto } from './dto/create-category.dto'
import { Category, CategoryDocument } from './schemas/categoty.schema'
import { Request } from 'express'

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel(Category.name)
        private categoryModel: Model<CategoryDocument>,
    ) {}

    async createCategory(
        data: CreateCategoryDto,
    ): Promise<Category & Document> {
        return this.categoryModel.create(data)
    }

    async followCategory(
        categoryName: string,
        req: Request,
    ): Promise<Category & Document> {
        const user = req.cookies['user']
        return this.categoryModel.findOneAndUpdate(
            { title: categoryName },
            { $push: { followers: user } },
        )
    }
}
