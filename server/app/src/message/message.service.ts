import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Message } from "./message.schema";
import { User } from "src/user/user.schema";
import { v4 as uuid } from "uuid";
import { s3Client } from "src/config/s3.config";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import * as path from 'path';

@Injectable()
export class MessageService {
    constructor(
        @InjectModel(Message.name) private messageModel: Model<Message>,
        @InjectModel(User.name) private userModel: Model<User>
    ) { }

    // Lưu tin nhắn
    async saveMessage({ senderEmail, receiverEmail, message, file }): Promise<Message> {
        // Kiểm tra xem người nhận có tồn tại trong database không
        const user = await this.userModel.findOne({ email: receiverEmail }).exec();
        if (!user) {
            throw new Error(`User with email ${receiverEmail} not found`);
        }

        return this.messageModel.create({ senderEmail, receiverEmail, message, file });
    }

    async uploadFile(files: Express.Multer.File[]): Promise<string[]> {
        if (!files || files.length === 0) {
            throw new Error('No files uploaded');
        }

        const uploadedUrls = await Promise.all(
            files.map(async (file) => {
                const fileExtension = path.extname(file.originalname);
                const key = `uploads/${uuid()}${fileExtension}`;

                const command = new PutObjectCommand({
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key: key,
                    Body: file.buffer,
                    ContentType: file.mimetype,
                });

                await s3Client.send(command);

                return `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${key}`;
            }),
        );

        return uploadedUrls;
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
