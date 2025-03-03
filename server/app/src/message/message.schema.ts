import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({ timestamps: true }) // Đánh dấu là một Schema trong MongoDB
export class Message {
    @Prop({ required: true })
    senderId: string;

    @Prop({ required: true })
    receiverId: string;

    @Prop({ required: true })
    message: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
