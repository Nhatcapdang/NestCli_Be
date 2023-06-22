import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './auth/strategy';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './interceptors/index.Interceptors';
// import { PassportModule } from '@nestjs/passport';
@Module({
  imports: [
    // https://docs.nestjs.com/techniques/configuration
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    AuthModule,
    BookmarkModule,
    UserModule,
    ProductModule,
  ],
  controllers: [AppController, UserController],
  providers: [
    AppService,
    JwtStrategy,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
