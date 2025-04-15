import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Profile | Cloud Messenger",
    description: "Trang hiển thị thông tin cá nhân",
};

export default function ProfileLayout({
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