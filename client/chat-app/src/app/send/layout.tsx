import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Send | Cloud Messenger",
    description: "Trang gửi tin nhắn",
};

export default function SendLayout({
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