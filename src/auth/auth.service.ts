import { Body, Injectable } from '@nestjs/common';
import { User, Bookmark } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { IAuth } from './dto';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  signUp(@Body() body: IAuth) {
    console.log('signup', body);
    return { message: 'signup service' };
  }
  signIn() {
    return 'signIn service';
  }
}
