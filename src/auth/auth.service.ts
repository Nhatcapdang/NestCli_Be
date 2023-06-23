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
    const user = await this.users.findOne({ 'user.email': dto.email });
    if (user) {
      return {
        message: 'Email already exists',
      };
    } else {
      // generate the password hash
      const hash = await argon.hash(dto.password);
      // save the new user in the db
      const { _id, user } = await this.users.create({
        user: {
          email: dto.email,
          password: hash,
        },
      });
      const tokens = await this.getTokens(_id, dto.email);
      const res = await this.users.findOneAndUpdate(
        _id,
        {
          user: {
            ...user,
            ...tokens,
          },
        },
        {
          returnDocument: 'after',
        },
      );
      console.log('res', res);
      delete res.user.password;
      return res;
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
    const user = await this.users.findOne({ 'user.email': dto.user.email });
    console.log('user', dto.user.email, user);
    if (user) {
      return user;
    } else {
      const res = await this.users.create(dto);
      return res;
    }
  }

  async getTokens(userId: number, email: string): Promise<any> {
    const jwtPayload = {
      sub: userId,
      email: email,
    };

    const [at, rt] = await Promise.all([
      this.jwt.signAsync(jwtPayload, {
        secret: this.config.get<string>('AT_SECRET'),
        expiresIn: '15m',
      }),
      this.jwt.signAsync(jwtPayload, {
        secret: this.config.get<string>('RT_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }
}
