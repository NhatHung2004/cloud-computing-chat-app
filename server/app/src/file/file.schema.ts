import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // Đánh dấu là một Schema trong MongoDB
class File extends Document {
    @Prop({ required: true })
    senderEmail: string;

    @Prop({ required: true })
    receiverEmail: string;

    @Prop({ required: true })
    file: string;
}

const FileSchema = SchemaFactory.createForClass(File);

export {
    FileSchema,
    File
}
