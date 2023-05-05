import {
  IsNumberString,
  IsString,
} from 'class-validator';

export class UpdateProductDto {
  @IsString()
  readonly name: string;
  @IsNumberString()
  readonly price: number;
}
