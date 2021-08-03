import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { TokenModule } from 'src/token/token.module'
import { UserModule } from 'src/user/user.module'

@Module({
    providers: [AuthService],
    controllers: [AuthController],
    imports: [TokenModule, UserModule],
})
export class AuthModule {}
