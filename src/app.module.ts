import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot('mongodb+srv://dbDmitriy:4!U_x$TukpTs2iC@cluster0.jrou0.mongodb.net/fork?retryWrites=true&w=majority'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
