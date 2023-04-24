import { Injectable } from '@nestjs/common';

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
