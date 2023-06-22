import { ForbiddenException, Injectable } from '@nestjs/common';
// import { User, Bookmark } from '@prisma/client';
import { AuthDto, Facebook } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schemas/users.schemas';
@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    // get env
    private config: ConfigService,
    @InjectModel(Users.name)
    private users: Model<Users>,
  ) {}
  async signUp(dto: AuthDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password);
    try {
      // save the new user in the db
      const user = dto;
      console.log('signup ser', dto, user, hash);
      return this.signToken(1, user.email);
    } catch (error) {
      if (error) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }
  async signIn(dto: AuthDto) {
    // find the user by email
    console.log('signin', dto);
    const user = dto;

    // if user does not exist throw exception
    // ForbiddenException(1111);
    //     {
    //     "statusCode": 403,
    //     "message": "1111",
    //     "error": "Forbidden"
    // }
    if (!user) throw new ForbiddenException('Credentials incorrect');

    // compare password
    const pwMatches = await argon.verify('user.hash', dto.password);
    // if password incorrect throw exception
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');
    return this.signToken(1, user.email);
  }
  async signToken(
    userId: number,
    email: string,
  ): Promise<{ accessToken: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return {
      accessToken: token,
    };
  }

  async signGgOrFb(dto: { user: Facebook }): Promise<Users> {
    const user = await this.users.findOne({ email: dto.user.email });
    console.log('user', dto.user.email, user);
    if (user) {
      return user;
    } else {
      const res = await this.users.create(dto);
      return res;
    }
  }
}
