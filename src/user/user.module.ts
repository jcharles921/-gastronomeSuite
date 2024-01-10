import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { UserSchema,User } from 'src/model/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
// import { JwtModule } from '@nestjs/jwt';
// import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports:[
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        AuthModule,
    ],
    controllers:[UserController],
    providers:[UserService],
})
export class UserModule {}
