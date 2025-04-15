import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Tin nhắn | Cloud Messenger",
    description: "Trang hiển thị tin nhắn và người dùng đã nhắn tin",
};

export default function MessageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
            {children}
        </section>
    );
}