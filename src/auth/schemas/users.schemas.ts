import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Users extends Document {
  @Prop({ type: Object })
  user: object;
  @Prop()
  accessToken: string;
}
export const UsersSchema = SchemaFactory.createForClass(Users);
