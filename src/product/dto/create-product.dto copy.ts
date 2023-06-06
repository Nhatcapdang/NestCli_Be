import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  IsBoolean,
  IsOptional,
  IsNumberString,
  IsEnum,
  NotEquals,
  ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';
export enum SizeGlass {
  '350ml' = '350ml',
  '250ml' = '250ml',
  '500ml' = 'Size M',
  '700ml' = 'Size L',
}

class MoreCombina {
  @IsString()
  option: string;
  @IsNumberString()
  price: number;
}

class PropertyProduct {
  @IsBoolean()
  isHidden: boolean;
  @IsBoolean()
  isCheese: boolean;
  @IsBoolean()
  isColdess: boolean;
  @IsBoolean()
  isIces: boolean;
  @IsBoolean()
  isSugars: boolean;
}

class Nutritional {
  @IsNumberString()
  kcal: number;
  @IsNumberString()
  water: number;
  @IsNumberString()
  vitamin: number;
}
class RickText {
  @IsString()
  intro: string;
  @IsString()
  @ValidateIf((object, value) => value !== null)
  userManual?: string;
  @IsArray()
  @IsString({ each: true })
  @IsDefined()
  preserve?: string[];
}

class Signature {
  @IsString()
  @ValidateIf((object, value) => value !== null)
  photo: string;
  @ValidateIf((object, value) => value !== null)
  @IsString()
  backGround: string;
  @ValidateIf((object, value) => value !== null)
  @IsString()
  description: string;
}

class MlAndPrice {
  @IsString()
  @IsEnum(SizeGlass)
  ml: string;
  @IsNumberString()
  price: number;
}
class LabelBtn {
  @IsString()
  label: string;
  @IsString()
  to: string;
}
class Qoute {
  @IsString()
  @NotEquals(null)
  // This will pass the validation when displayName is undefined or a string, but fail for null.
  @ValidateIf((object, value) => value !== null)
  //This will pass the validation when displayName is ≠ or a string, but fail for null.
  // @ValidateIf((object, value) => value !== undefined)
  top: string;
  @IsString()
  @NotEquals(null)
  @ValidateIf((object, value) => value !== null)
  bottom: string;
}
class AboutProduct {
  @IsString()
  @IsOptional()
  title?: string;
  @IsString()
  label: string;
  @IsObject()
  @IsOptional()
  @Type(() => Qoute)
  @ValidateNested()
  qoue?: Qoute;
  @IsString()
  description1: string;
  @IsArray()
  @IsOptional()
  @Type(() => LabelBtn)
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  labelBtn?: LabelBtn[];
  @IsString()
  photo: string;
  @IsString()
  @IsOptional()
  photoPosition?: 'left' | 'right';
  @IsBoolean()
  @IsOptional()
  isShowSmallCarousel?: boolean;
  @IsString()
  @IsOptional()
  textAlign?: 'left' | 'right';
}
export class CreateProductDto {
  @ApiProperty({
    example: 'Coca Cola',
  })
  @IsString()
  name: string;
  @IsString()
  mainIngredient: string;
  @ApiProperty({
    example: '998',
  })
  @ApiProperty()
  @IsArray()
  // "each" tells class-validator to run the validation on each item of the array
  @IsString({ each: true })
  photo: string[];
  @IsString()
  @ApiProperty()
  hasTag: string;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MoreCombina)
  @ApiProperty({
    example: [
      {
        option: 'Ổi x Lê',
        price: 10000,
      },
    ],
  })
  moreCombina: MoreCombina[];

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @ApiProperty({
    example: ['100% Đường (Bình Thường)', '50% Đường (Ít Ngọt)'],
  })
  sugars: string[];
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => PropertyProduct)
  @ApiProperty({
    example: {
      isHidden: false,
      isCheese: false,
      isColdess: false,
      isIces: false,
      isSugars: false,
    },
  })
  property?: PropertyProduct;
  @IsString()
  @ApiProperty()
  group: string;
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => RickText)
  @ApiProperty({
    example: 'Sinh Tố Đóng Chai',
  })
  rickText: RickText;
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Signature)
  @ApiProperty()
  signature?: Signature;
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  @Type(() => AboutProduct)
  @ApiProperty()
  aboutProduct: AboutProduct[];
  @ArrayNotEmpty()
  @IsArray()
  @Type(() => MlAndPrice)
  @ValidateNested({ each: true })
  @ApiProperty()
  mlAndPrice: MlAndPrice[];
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Nutritional)
  @ApiProperty()
  nutritional: Nutritional;
}
