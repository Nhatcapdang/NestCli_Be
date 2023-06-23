import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import {
  AtStrategy,
  FacebookStrategy,
  GoogleStrategy,
  RtStrategy,
} from './strategy';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './serializer/session.serializer';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './schemas/users.schemas';
// import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  // imports: [PrismaModule],
  // PassportModule.register({ session: true }),
  imports: [
    MongooseModule.forFeature([
      {
        name: Users.name,
        schema: UsersSchema,
      },
    ]),
    JwtModule.register({}),
    PassportModule.register({ session: true }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    FacebookStrategy,
    GoogleStrategy,
    SessionSerializer,
    // RtStrategy,
    AtStrategy,
  ],
})
export class AuthModule {}
