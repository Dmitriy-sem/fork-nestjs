import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module'
import { ForkModule } from './fork/fork.module'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user/user.module'
import { TokenModule } from './token/token.module'
import { EventEmitterModule } from '@nestjs/event-emitter'

@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: '.env' }),
        MongooseModule.forRoot(process.env.MONGO_URI, {
            useFindAndModify: true,
        }),
        AuthModule,
        ForkModule,
        AuthModule,
        UserModule,
        TokenModule,
        EventEmitterModule.forRoot(),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
