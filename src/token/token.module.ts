import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { UserModule } from 'src/user/user.module'
import { TokenService } from './token.service'

@Module({
    providers: [TokenService],
    imports: [
        JwtModule.register({
            secret: process.env.SECRET_KEY || 'kadsas',
            signOptions: { expiresIn: '24h' },
        }),
        UserModule,
    ],
    exports: [TokenService],
})
export class TokenModule {}
