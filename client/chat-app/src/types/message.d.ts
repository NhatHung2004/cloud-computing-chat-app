interface IMessage {
    _id: string;
    senderEmail: string;
    receiverEmail: string;
    message: string;
    file: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}