import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from 'src/user/user.module'
import { TokenSchema } from './schemas/token.schema'
import { TokenService } from './token.service'

@Module({
    providers: [TokenService],
    imports: [
        JwtModule.register({
            secret: process.env.SECRET_KEY || 'kadsas',
            signOptions: { expiresIn: '24h' },
        }),
        UserModule,
        MongooseModule.forFeature([{ name: 'Token', schema: TokenSchema }]),
    ],
    exports: [TokenService],
})
export class TokenModule {}
