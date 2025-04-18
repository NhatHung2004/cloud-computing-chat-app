import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Message } from "./message.schema";
import { User } from "src/user/user.schema";

@Injectable()
export class MessageService {
    constructor(
        @InjectModel(Message.name) private messageModel: Model<Message>,
        @InjectModel(User.name) private userModel: Model<User>
    ) { }

    // Lưu tin nhắn
    async saveMessage({ senderEmail, receiverEmail, message }): Promise<Message> {
        // Kiểm tra xem người nhận có tồn tại trong database không
        const user = await this.userModel.findOne({ email: receiverEmail }).exec();
        if (!user) {
            throw new Error(`User with email ${receiverEmail} not found`);
        }

        return this.messageModel.create({ senderEmail, receiverEmail, message });
    }

    // Lấy tin nhắn của user hiện tại
    async getMessages(receiverId: string): Promise<Message[]> {
        const user = await this.userModel.findById(receiverId).exec();
        if (!user) {
            throw new Error(`User with id ${receiverId} not found`);
        }
        const receiverEmail = user.email;

        return this.messageModel.find({
            receiverEmail: receiverEmail
        }).sort({ createdAt: -1 }).exec();
    }

    // Lấy tin nhắn gửi đi của user hiện tại
    async getSentMessages(senderId: string): Promise<Message[]> {
        const user = await this.userModel.findById(senderId).exec();
        if (!user) {
            throw new Error(`User with id ${senderId} not found`);
        }
        const senderEmail = user.email;
        return this.messageModel.find({
            senderEmail: senderEmail
        }).sort({ createdAt: -1 }).exec();
    }

    // Lấy tin nhắn theo id
    async getMessageById(id: string): Promise<Message> {
        const msg = await this.messageModel.findById(id).exec();
        if (!msg) {
            throw new Error(`Message with id ${id} not found`);
        }

        return msg;
    }

    // Lấy tất cả tin nhắn
    async getAllMessages(): Promise<Message[]> {
        return this.messageModel.find().exec();
    }
}
