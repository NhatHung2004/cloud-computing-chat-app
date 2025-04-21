'use client';

import { Apis } from '@/configs/Apis';
import { AxiosError } from 'axios';

export async function sendMessageApi(
    toEmail: string,
    message: string,
    files: File[] // Đổi thành mảng files
): Promise<{ success: boolean; error?: string }> {
    const senderEmail = localStorage.getItem('email');

    if (!senderEmail) {
        return { success: false, error: 'Không tìm thấy email người gửi' };
    }

    const formData = new FormData();
    formData.append('senderEmail', senderEmail);
    formData.append('receiverEmail', toEmail);
    formData.append('message', message);

    // Thêm tất cả files vào FormData
    if (files && files.length > 0) {
        files.forEach(file => {
            formData.append(`files`, file);
        });
    }

    try {
        await Apis.post('/messages', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return { success: true };
    } catch (err: unknown) {
        let errorMessage = 'Gửi thất bại!';
        if (err instanceof AxiosError) {
            errorMessage = err.response?.data?.message || errorMessage;
        }
        return { success: false, error: errorMessage };
    }
}