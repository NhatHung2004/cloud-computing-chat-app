import { ApiProperty } from "@nestjs/swagger";

export class CreateFileDto {
    @ApiProperty()
    senderEmail: string;
    @ApiProperty()
    receiverEmail: string;
}
