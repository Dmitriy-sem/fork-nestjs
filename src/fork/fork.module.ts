import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'
import { CategoryModule } from 'src/category/category.module'
import { Category, CategorySchema } from 'src/category/schemas/categoty.schema'
import { ForkController } from './fork.controller'
import { ForkService } from './fork.service'
import { Fork, ForkSchema } from './schemas/fork.schema'

@Module({
    providers: [ForkService],
    controllers: [ForkController],
    imports: [
        CategoryModule,
        MongooseModule.forFeature([
            { name: Fork.name, schema: ForkSchema },
            { name: Category.name, schema: CategorySchema },
        ]),
        JwtModule.register({
            secret: 'secret',
            signOptions: { expiresIn: '24h' },
        }),
    ],
})
export class ForkModule {}
