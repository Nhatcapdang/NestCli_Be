import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
class User {
  @Prop()
  email: string;
  @Prop()
  password: string;
}
@Schema({
  timestamps: true,
})
export class Users extends Document {
  @Prop({ type: Object })
  user: User;
  @Prop()
  accessToken: string;
}
export const UsersSchema = SchemaFactory.createForClass(Users);
