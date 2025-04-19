import { useState } from "react";

export function useSendMessage() {
    const [loading, setLoading] = useState(false);

    const sendMessage = async (toEmail: string, message: string): Promise<{ success: boolean; error?: string }> => {
        const senderEmail = localStorage.getItem('email');

        if (!senderEmail) {
            return { success: false, error: 'Không tìm thấy email người gửi' };
        }

        const payload = {
            senderEmail,
            receiverEmail: toEmail,
            message,
        };

        setLoading(true);
        try {
            const response = await fetch("https://cloud-computing-chat-app-production.up.railway.app/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok) {
                return { success: true };
            } else {
                return { success: false, error: data.message || "Gửi thất bại!" };
            }
        } catch (err) {
            return { success: false, error: "Không thể kết nối server!" };
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, loading };
}
