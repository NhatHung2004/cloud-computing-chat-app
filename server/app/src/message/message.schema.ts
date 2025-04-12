import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // Đánh dấu là một Schema trong MongoDB
class Message extends Document {
    @Prop({ required: true })
    senderEmail: string;

    @Prop({ required: true })
    receiverEmail: string;

    @Prop({ required: true })
    message: string;
}

const MessageSchema = SchemaFactory.createForClass(Message);

export {
    MessageSchema,
    Message
}
