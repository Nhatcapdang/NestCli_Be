import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// da co o tat ca cac modal
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
