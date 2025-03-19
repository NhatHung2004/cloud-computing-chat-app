import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { MessageService } from './message.service';
import { ApiTags } from '@nestjs/swagger';
import { SendMessageDto } from 'src/dto/send-message.dto';

@ApiTags('messages')
@Controller('messages')
export class MessageController {
    constructor(private readonly messageService: MessageService) { }

    @Post()
    async sendMessage(@Body() sendMessageDto: SendMessageDto) {
        return this.messageService.saveMessage(sendMessageDto.senderId, sendMessageDto.receiverId, sendMessageDto.message);
    }

    @Get(':senderId/:receiverId')
    async getMessages(@Param('senderId') senderId: string, @Param('receiverId') receiverId: string) {
        return this.messageService.getMessages(senderId, receiverId);
    }

    @Get()
    async getAllMessages() {
        return this.messageService.getAllMessages();
    }
}
