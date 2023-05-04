import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@Controller('user')
export class UserController {
  // user/me
  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetUser() user: { username: string }) {
    console.log(user);
    return user;
  }
}
