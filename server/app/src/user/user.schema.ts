import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // Đánh dấu là một Schema trong MongoDB
class User extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;
}

const UserSchema = SchemaFactory.createForClass(User);

export {
    UserSchema,
    User,
}
