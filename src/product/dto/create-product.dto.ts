import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Coca Cola',
  })
  @IsString()
  readonly name: string;

  @IsNumberString()
  @ApiProperty({
    example: '998',
  })
  readonly price: number;
}
