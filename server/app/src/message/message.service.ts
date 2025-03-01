import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Message, MessageDocument } from "./message.schema";

@Injectable()
export class MessageService {
    constructor(@InjectModel(Message.name) private messageModel: Model<MessageDocument>) { }

    async saveMessage(senderId: string, receiverId: string, message: string): Promise<Message> {
        return this.messageModel.create({ senderId, receiverId, message });
    }

    async getMessages(senderId: string, receiverId: string): Promise<Message[]> {
        return this.messageModel.find({
            $or: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId }
            ]
        }).sort({ createdAt: 1 }).exec();
    }
}