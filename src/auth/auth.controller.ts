import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthDto, Facebook } from './dto';
import { AuthGuard } from '@nestjs/passport';

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
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() dto: AuthDto) {
    return this.authService.signIn(dto);
  }

  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(
    @Req()
    req: Facebook,
  ): Promise<any> {
    return {
      statusCode: HttpStatus.OK,
      data: req.user,
    };
  }
}
