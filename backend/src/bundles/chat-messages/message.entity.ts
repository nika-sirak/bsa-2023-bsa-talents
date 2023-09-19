import { type Entity } from '~/common/types/types.js';

import { type MessageProperties } from './types/types.js';

class MessageEntity implements Entity {
    private 'id': string | null;
    private 'senderId': string;
    private 'receiverId': string;
    private 'chatId': string;
    private 'message': string;
    private 'isRead': boolean;

    private constructor({
        id,
        senderId,
        receiverId,
        chatId,
        message,
        isRead,
    }: MessageProperties) {
        this.id = id;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.chatId = chatId;
        this.message = message;
        this.isRead = isRead;
    }

    public static initialize({
        id,
        senderId,
        receiverId,
        chatId,
        message,
        isRead,
    }: { id: string } & Omit<MessageProperties, 'id'>): MessageEntity {
        return new MessageEntity({
            id,
            senderId,
            receiverId,
            chatId,
            message,
            isRead,
        });
    }

    public static initializeNew({
        senderId,
        receiverId,
        chatId,
        message,
        isRead,
    }: Omit<MessageProperties, 'id'>): MessageEntity {
        return new MessageEntity({
            id: null,
            senderId,
            receiverId,
            chatId,
            message,
            isRead,
        });
    }

    public toObject(): { id: string } & Omit<MessageProperties, 'id'> {
        return {
            id: this.id as string,
            senderId: this.senderId,
            receiverId: this.receiverId,
            chatId: this.chatId,
            message: this.message,
            isRead: this.isRead,
        };
    }

    public toNewObject(): Omit<MessageProperties, 'id'> {
        return {
            senderId: this.senderId,
            receiverId: this.receiverId,
            chatId: this.chatId,
            message: this.message,
            isRead: this.isRead,
        };
    }
}

export { MessageEntity };
