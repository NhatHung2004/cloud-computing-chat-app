import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // Đánh dấu là một Schema trong MongoDB
class Message extends Document {
    @Prop({ required: true })
    senderId: string;

    @Prop({ required: true })
    receiverId: string;

    @Prop({ required: true })
    message: string;
}

const MessageSchema = SchemaFactory.createForClass(Message);

export {
    MessageSchema,
    Message
}
