'use client';

import { Apis } from '@/configs/Apis';
import { AxiosError } from 'axios';

export async function sendMessageApi(toEmail: string, message: string | "", file: File | null): Promise<{ success: boolean; error?: string }> {
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
        // Nếu có file thì upload
        if (file !== null) {
            const formData = new FormData();
            formData.append('senderEmail', senderEmail);
            formData.append('receiverEmail', toEmail);
            formData.append('message', message);
            formData.append('file', file);

            const data = await Apis.post('/messages', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('File upload response:', data.data); // Log the response from the file upload
        }
        else {
            await Apis.post('/messages', payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
        return { success: true };
    } catch (err: unknown) {
        let errorMessage = 'Gửi thất bại!';
        if (err instanceof AxiosError) {
            errorMessage = err.response?.data?.message || errorMessage;
        }
        return { success: false, error: errorMessage };
    }
}
