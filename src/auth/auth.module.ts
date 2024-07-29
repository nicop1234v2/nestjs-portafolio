import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],


  imports:[
    ConfigModule,
    MongooseModule.forFeature([
      {
      name: User.name,
      schema: UserSchema
    },
  ]),

  PassportModule.register({ defaultStrategy: 'jwt' }),

  JwtModule.registerAsync({
    imports:[],
    inject: [],
    useFactory: () => {
      return{
        secret: process.env.JWT_SECRET,
        signOptions:{
          expiresIn:'2h'
        }
      }
    }
  }),
  ],
  exports:[ PassportModule, JwtModule, JwtStrategy, MongooseModule]

})
export class AuthModule {}
