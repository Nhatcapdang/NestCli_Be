import { AuthService } from './auth.service';
import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  //   authService: AuthService;
  constructor(private authService: AuthService) {
    // this.authService = AuthService;
  }
  // POST /auth/signup
  @Post('signup')
  signUp(@Body() dto: AuthDto) {
    console.log('sign2up controll', dto);
    // const { dto } = req;
    return this.authService.signUp(dto);
  }
  // POST /auth/signin
  @Post('signin')
  signIn(@Body() dto: AuthDto) {
    return this.authService.signIn(dto);
  }
}
