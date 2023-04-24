import { AuthService } from './auth.service';
import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  //   authService: AuthService;
  constructor(private authService: AuthService) {
    // this.authService = AuthService;
    this.authService.test();
  }
  // POST /auth/signup
  @Post('signup')
  signUp() {
    return this.authService.signUp();
  }
  // POST /auth/signin
  @Post('signin')
  signIn() {
    return this.authService.signIn();
  }
}
