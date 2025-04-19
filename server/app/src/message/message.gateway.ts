import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessageService } from './message.service';

@WebSocketGateway({ cors: true }) // Kích hoạt WebSocket với CORS
export class MessageGateway {
    @WebSocketServer()
    server: Server; // Server WebSocket

    constructor(private messageService: MessageService) { }

    // Xử lý khi client gửi message
    // @SubscribeMessage('sendMessage')
    // async handleMessage(@MessageBody() data: { senderId: string; receiverId: string; message: string }) {
    //     const messageData = {
    //         senderEmail: data.senderId,
    //         receiverEmail: data.receiverId,
    //         message: data.message,
    //     };
    //     const savedMessage = await this.messageService.saveMessage(messageData);

    //     // Gửi tin nhắn đến người nhận
    //     this.server.emit(`receiveMessage-${data.receiverId}`, savedMessage);
    // }
}