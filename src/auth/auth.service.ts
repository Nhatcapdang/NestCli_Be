import { Injectable } from '@nestjs/common';
import { User, Bookmark } from '@prisma/client';
@Injectable()
export class AuthService {
  test() {
    return 'test';
  }
  signUp() {
    return { message: 'signup service' };
  }
  signIn() {
    return 'signIn service';
  }
}
