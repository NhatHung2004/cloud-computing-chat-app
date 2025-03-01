import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageModule } from './message/message.module';

@Module({
    imports: [
        MessageModule,
        MongooseModule.forRoot("mongodb+srv://nhathung:nhathung123@cluster0.lu8zf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"),  
        UserModule,
    ],
})
export class AppModule { }
