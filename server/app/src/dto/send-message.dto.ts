import { ApiProperty } from "@nestjs/swagger";

export class SendMessageDto {
    @ApiProperty()
    senderEmail: string;
    @ApiProperty()
    receiverEmail: string;
    @ApiProperty()
    message: string;
    @ApiProperty()
    file: Buffer | null; // Thay đổi kiểu dữ liệu của file thành Buffer | null
}
