import { Injectable, UploadedFile } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { File } from "./file.schema";
import { Readable } from "stream";
import cloudinary from "src/config/config.cloudinary";

@Injectable()
export class FileService {
    constructor(
        @InjectModel(File.name) private fileModel: Model<File>
    ) { }

    async uploadFile(file: Express.Multer.File): Promise<{ file: string }> {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    resource_type: "auto",
                    folder: "chat-app",
                },
                (error, result) => {
                    if (error) {
                        return reject(new Error(error.message));
                    }
                    if (!result || !result.secure_url) {
                        return reject(new Error("Upload failed or no secure URL returned"));
                    }
                    resolve({ file: result.secure_url });
                }
            );
    
            const readable = new Readable();
            readable.push(file.buffer);
            readable.push(null);
            readable.pipe(uploadStream);
        });
    }
    
    

    // Lưu thông tin file vào database
    async saveFile({ senderEmail, receiverEmail, file }): Promise<File> {
        return this.fileModel.create({ senderEmail, receiverEmail, file });
    }
}
