import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessageService } from './message.service';

@WebSocketGateway({ cors: true }) // Kích hoạt WebSocket với CORS
export class MessageGateway {
    @WebSocketServer()
    server: Server; // Server WebSocket

    constructor(private messageService: MessageService) { }

    // Xử lý khi client gửi message
    @SubscribeMessage('sendMessage')
    async handleMessage(@MessageBody() data: { senderId: string; receiverId: string; message: string }) {
        const savedMessage = await this.messageService.saveMessage(data.senderId, data.receiverId, data.message);

        // Gửi tin nhắn đến người nhận
        this.server.emit(`receiveMessage-${data.receiverId}`, savedMessage);
    }
}