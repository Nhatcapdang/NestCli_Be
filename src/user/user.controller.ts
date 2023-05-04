import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@Controller('user')
export class UserController {
  // user/me
  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetUser() user: User) {
    console.log(user);
    return user;
  }
}
