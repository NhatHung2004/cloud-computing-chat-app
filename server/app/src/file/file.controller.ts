// upload.controller.ts
import {
    Body,
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileService } from "./file.service";
import { CreateFileDto } from "src/dto/create-file.dto";

@Controller("upload")
export class FileController {
    constructor(private readonly fileService: FileService) { }

    @Post()
    @UseInterceptors(FileInterceptor("file"))
    async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() createFileDto: CreateFileDto) {
        const data = await this.fileService.uploadFile(file);

        if (!data) {
            throw new Error("File upload failed");
        }

        // Lưu thông tin file vào database
        const fileData = {
            senderEmail: createFileDto.senderEmail,
            receiverEmail: createFileDto.receiverEmail,
            file: data.file,
        }
        const result = await this.fileService.saveFile(fileData);
        if (!result) {
            throw new Error("File save failed");
        }
        return fileData;
    }
}
