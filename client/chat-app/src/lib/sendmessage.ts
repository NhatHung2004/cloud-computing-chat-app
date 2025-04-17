import { Apis, MESSAGE_ENDPOINTS } from '@/configs/Apis';

export async function sendMessageApi(toEmail: string, message: string): Promise<{ success: boolean; error?: string }> {
    const senderEmail = localStorage.getItem('email');

    if (!senderEmail) {
        return { success: false, error: 'Không tìm thấy email người gửi' };
    }

    const payload = {
        senderEmail,
        receiverEmail: toEmail,
        message,
    };

    try {
        await Apis.post('/messages', payload);

        return { success: true };
    } catch (err: any) {
        const errorMessage = err.response?.data?.message || 'Gửi thất bại!';
        return { success: false, error: errorMessage };
    }
}
