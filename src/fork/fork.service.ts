import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import {
    Category,
    CategoryDocument,
} from 'src/category/schemas/categoty.schema'
import { CreateForkDto } from './dto/create-fork.dto'
import { UpdateForkDto } from './dto/update-fork.dto'
import { Fork, ForkDocument } from './schemas/fork.schema'
import { Request } from 'express'

@Injectable()
export class ForkService {
    constructor(
        @InjectModel(Fork.name) private forkModel: Model<ForkDocument>,
        @InjectModel(Category.name)
        private categoryModel: Model<CategoryDocument>,
    ) {}

    async getAll(): Promise<ForkDocument[]> {
        return this.forkModel.find()
    }

    async getByCategory(title: string): Promise<ForkDocument[]> {
        const category = await this.categoryModel.findOne({ title })
        return this.forkModel.find({ category })
    }

    async create(
        forkDto: CreateForkDto,
        request: Request,
    ): Promise<ForkDocument> {
        const owner = request.cookies['user']
        const categoryItem = await this.categoryModel.findOne({
            title: forkDto.category,
        })
        const newFork = { ...forkDto, owner, category: categoryItem._id }
        return this.forkModel.create(newFork)
    }

    async update(id: string, forkDto: UpdateForkDto): Promise<ForkDocument> {
        return this.forkModel.findByIdAndUpdate(id, forkDto)
    }

    async remove(id: string): Promise<ForkDocument> {
        return this.forkModel.findByIdAndRemove(id)
    }
}
