import axios from 'axios';
export const BASE_URL = 'https://cloud-computing-chat-app-production.up.railway.app';

export const MESSAGE_ENDPOINTS = {
    all: '/messages',
    received: (userId: string) => `/messages/user/${userId}`,
    sent: (userId: string) => `/messages/sent/${userId}`,
    byId: (id: string) => `/messages/${id}`,
};

export const USER_ENDPOINTS = {
    create: '/user',
    all: '/user',
    byId: (id: string) => `/user/${id}`,
};

export const Apis = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});