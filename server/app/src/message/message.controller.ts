import { Controller, Post, Get, Body, Param, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MessageService } from './message.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SendMessageDto } from 'src/dto/send-message.dto';

@ApiTags('messages')
@Controller('messages')
export class MessageController {
    constructor(private readonly messageService: MessageService) { }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    @ApiOperation({ summary: "gửi tin nhắn", description: "lưu tin nhắn vào database" })
    async sendMessage(@Body() sendMessageDto: SendMessageDto, @UploadedFile() file: Express.Multer.File) {
        const messageData: { senderEmail: string; receiverEmail: string; message: string; file: Buffer | null } = {
            senderEmail: sendMessageDto.senderEmail,
            receiverEmail: sendMessageDto.receiverEmail,
            message: sendMessageDto.message,
            file: null,  // Khởi tạo file là null
        };
        // Kiểm tra nếu có file, thì thêm file vào messageData
        if (file) {
            messageData.file = file.buffer;  // Lưu file dưới dạng buffer nếu có
        }
        return this.messageService.saveMessage(messageData);
    }

    @Get('/user/:receiverId')
    @ApiOperation({ summary: "lấy tin nhắn", description: "lấy toàn bộ tin nhắn của user hiện tại" })
    async getMessages(@Param('receiverId') receiverId: string) {
        return this.messageService.getMessages(receiverId);
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
