import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class PropertyUser {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
}
export class Facebook {
  @IsObject()
  @ValidateNested()
  @Type(() => PropertyUser)
  user: PropertyUser;

  @IsString()
  accessToken: string;
}
