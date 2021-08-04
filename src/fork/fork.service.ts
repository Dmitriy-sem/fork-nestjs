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
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter'
import { IFork } from './fork.type'
import { EmailService } from 'src/email/email.service'
import { User, UserDocument } from 'src/user/schemas/user.schema'

@Injectable()
export class ForkService {
    constructor(
        @InjectModel(Fork.name) private forkModel: Model<ForkDocument>,
        @InjectModel(Category.name)
        private categoryModel: Model<CategoryDocument>,
        @InjectModel(User.name) private userModdel: Model<UserDocument>,
        private eventEmitter: EventEmitter2,
        private emailService: EmailService,
    ) {}

    async getAll(): Promise<ForkDocument[]> {
        return this.forkModel.find()
    }

    async getByCategory(title: string): Promise<ForkDocument[]> {
        const category = await this.categoryModel.findOne({ title })
        return this.forkModel.find({ category })
    }

    @OnEvent('fork.created')
    async handleForkCreatedEvent(
        followers: string[],
        fork: IFork,
        categoryName: string,
    ) {
        const emailList = []
        for (const follower of followers) {
            const user = await this.userModdel.findById(follower)
            emailList.push(user.email)
        }

        this.emailService.sendMail(emailList.join(', '), fork, categoryName)
    }

    async create(
        forkDto: CreateForkDto,
        request: Request,
    ): Promise<ForkDocument> {
        const owner = request.cookies['user']
        const categoryItem = await this.categoryModel.findOne({
            title: forkDto.category,
        })
        const newFork: IFork = { ...forkDto, owner, category: categoryItem._id }
        this.eventEmitter.emit(
            'fork.created',
            categoryItem.followers,
            newFork,
            forkDto.category,
        )
        return this.forkModel.create(newFork)
    }

    async update(id: string, forkDto: UpdateForkDto): Promise<ForkDocument> {
        return this.forkModel.findByIdAndUpdate(id, forkDto)
    }

    async remove(id: string): Promise<ForkDocument> {
        return this.forkModel.findByIdAndRemove(id)
    }
}
