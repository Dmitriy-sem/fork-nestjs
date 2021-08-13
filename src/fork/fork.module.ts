import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'
import { CategoryModule } from 'src/category/category.module'
import { TokenModule } from 'src/token/token.module'
import { ForkController } from './fork.controller'
import { ForkService } from './fork.service'
import { Fork, ForkSchema } from './schemas/fork.schema'

@Module({
    providers: [ForkService],
    controllers: [ForkController],
    imports: [
        CategoryModule,
        TokenModule,
        MongooseModule.forFeature([
            { name: Fork.name, schema: ForkSchema },
        ]),
        JwtModule.register({
            secret: 'secret',
            signOptions: { expiresIn: '24h' },
        }),
    ],
})
export class ForkModule {}
