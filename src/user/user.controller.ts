import {
  Controller,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('user')
export class UserController {
  // user/me
  @UseGuards(AuthGuard('user-jwt'))
  @Get('me')
  getMe(@Req() req: Request) {
    console.log(req.user);
    return req.user;
  }
}
