import { AuthService } from './auth.service';
import { Controller, Post, Req } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  //   authService: AuthService;
  constructor(private authService: AuthService) {
    // this.authService = AuthService;
  }
  // POST /auth/signup
  @Post('signup')
  signUp(@Req() req: Request) {
    console.log('signup', req);
    const { body } = req;
    return this.authService.signUp(body);
  }
  // POST /auth/signin
  @Post('signin')
  signIn() {
    return this.authService.signIn();
  }
}
