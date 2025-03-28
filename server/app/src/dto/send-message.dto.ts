import { ApiProperty } from "@nestjs/swagger";

export class SendMessageDto {
    @ApiProperty()
    senderEmail: string;
    @ApiProperty()
    receiverEmail: string;
    @ApiProperty()
    message: string;
}
