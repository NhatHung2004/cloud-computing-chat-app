import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('messages')
export class MessageController {
    constructor(private readonly messageService: MessageService) { }

    @Post()
    async sendMessage(@Body() body: { senderId: string; receiverId: string; message: string }) {
        return this.messageService.saveMessage(body.senderId, body.receiverId, body.message);
    }

    @Get(':senderId/:receiverId')
    async getMessages(@Param('senderId') senderId: string, @Param('receiverId') receiverId: string) {
        return this.messageService.getMessages(senderId, receiverId);
    }
}
