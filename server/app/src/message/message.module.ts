import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MessageSchema, Message } from "./message.schema";
import { MessageService } from "./message.service";
import { MessageController } from "./message.controller";
import { MessageGateway } from "./message.gateway";
import { User, UserSchema } from "src/user/user.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }, {name: User.name, schema: UserSchema}]),
    ],
    providers: [MessageService, MessageGateway],
    controllers: [MessageController],
    exports: [MessageService],
})
export class MessageModule {}
