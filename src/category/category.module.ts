import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CategoryController } from './category.controller'
import { CategoryService } from './category.service'
import { Category, CategorySchema } from './schemas/categoty.schema'

@Module({
    providers: [CategoryService],
    controllers: [CategoryController],
    imports: [
        MongooseModule.forFeature([
            { name: Category.name, schema: CategorySchema },
        ]),
    ],
})
export class CategoryModule {}
