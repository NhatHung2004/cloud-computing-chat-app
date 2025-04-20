import { Controller, Post, Get, Body, Param, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { MessageService } from './message.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SendMessageDto } from 'src/dto/send-message.dto';

@ApiTags('messages')
@Controller('messages')
export class MessageController {
    constructor(private readonly messageService: MessageService) { }

    @Post()
    @UseInterceptors(FilesInterceptor('files'))
    @ApiOperation({ summary: "gửi tin nhắn", description: "lưu tin nhắn vào database" })
    async sendMessage(@Body() sendMessageDto: SendMessageDto, @UploadedFiles() files: Express.Multer.File[]) {
        const messageData = {
            senderEmail: sendMessageDto.senderEmail,
            receiverEmail: sendMessageDto.receiverEmail,
            message: "",
            file: [] as string[],
        };
        if (sendMessageDto.message) {
            messageData.message = sendMessageDto.message;
        }
        if (files) {
            const data = await this.messageService.uploadFile(files);
            if (!data) {
                throw new Error("File upload failed");
            }
            // Lưu thông tin file vào database
            messageData.file = data;
        }
        return this.messageService.saveMessage(messageData);
    }

    @Get('/user/:receiverId')
    @ApiOperation({ summary: "lấy tin nhắn", description: "lấy toàn bộ tin nhắn của user hiện tại" })
    async getMessages(@Param('receiverId') receiverId: string) {
        return this.messageService.getMessages(receiverId);
    }

    @Get('/sent/:senderId')
    @ApiOperation({ summary: "lấy tin nhắn", description: "lấy toàn bộ tin nhắn đã gửi của user hiện tại" })
    async getSentMessages(@Param('senderId') senderId: string) {
        return this.messageService.getSentMessages(senderId);
    }

    @Get()
    @ApiOperation({ summary: "lấy tin nhắn", description: "lấy toàn bộ tin nhắn" })
    async getAllMessages() {
        return this.messageService.getAllMessages();
    }

    @Get(':id')
    @ApiOperation({ summary: "lấy tin nhắn", description: "lấy tin nhắn theo id" })
    async getMessageById(@Param('id') id: string) {
        return this.messageService.getMessageById(id);
    }
}
