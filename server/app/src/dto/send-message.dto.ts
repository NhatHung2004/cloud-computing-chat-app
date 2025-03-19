import { ApiProperty } from "@nestjs/swagger";

export class SendMessageDto {
    @ApiProperty()
    senderId: string;
    @ApiProperty()
    receiverId: string;
    @ApiProperty()
    message: string;
}
