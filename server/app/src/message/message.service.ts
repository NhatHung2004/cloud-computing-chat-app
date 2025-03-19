import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Message } from "./message.schema";

@Injectable()
export class MessageService {
    constructor(@InjectModel(Message.name) private messageModel: Model<Message>) { }

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

    async getAllMessages(): Promise<Message[]> {
        return this.messageModel.find().exec();
    }
}
