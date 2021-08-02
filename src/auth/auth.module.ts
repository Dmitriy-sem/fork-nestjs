import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
    providers: [AuthService],
    controllers: [AuthController],
    imports: [
        MongooseModule.forFeature([
            {name: User.name, schema: UserSchema}
        ]),
        JwtModule.register({
            secret: 'secretkey',
            signOptions: {expiresIn: '24h'}
        })
    ]
})
export class AuthModule {}
