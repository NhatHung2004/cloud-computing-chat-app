import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { MessageService } from './message.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SendMessageDto } from 'src/dto/send-message.dto';

@ApiTags('messages')
@Controller('messages')
export class MessageController {
    constructor(private readonly messageService: MessageService) { }

    @Post()
    @ApiOperation({ summary: "gửi tin nhắn", description: "lưu tin nhắn vào database" })
    async sendMessage(@Body() sendMessageDto: SendMessageDto) {
        return this.messageService.saveMessage(sendMessageDto.senderEmail, sendMessageDto.receiverEmail, sendMessageDto.message);
    }

    @Get(':receiverId')
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
