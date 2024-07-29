import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto, CreateUserDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,

    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.email = createUserDto.email.toLowerCase();
    const { pass, ...userData } = createUserDto;

    const hashedPassword = await bcrypt.hash(pass, 10);

    try {
      const newUser = new this.userModel({
        ...userData,
        pass: hashedPassword,
      });

      await newUser.save();
      const user = newUser.toObject();
      delete user.pass;
      return {user, token: this.getJwtoken({ id: newUser.id })}
    } catch (error) {
      this.handleExceptions(error);
    }
  }


  async login(loginUserDto: LoginUserDto) {
    const { pass, email } = loginUserDto;

    const searchUser = await this.userModel.findOne({
      email,
    }).select('+password'); // Explicitly select password field

    if (!searchUser) {
      throw new UnauthorizedException('Credentials are not valid');
    }

    const isPasswordValid = await bcrypt.compare(pass, searchUser.pass);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credentials are not valid');
    }

    const user = searchUser.toObject();
    delete user.pass;
    return {
      user,
      token: this.getJwtoken({ id: searchUser.id })
    };
  }


  async checkAuthStatus(user: User) {
   
    const searchUser = user.toObject();
    delete searchUser.pass;
    return {
      searchUser,
      token: this.getJwtoken({ id: user.id })
    };
  }

  private getJwtoken( payLoad: JwtPayload ){
    console.log(payLoad)
    const token = this.jwtService.sign( payLoad );
    return token;

  }

  private handleExceptions(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    console.log(error);
    throw new InternalServerErrorException('unexpected error, check logs');
  }
}
