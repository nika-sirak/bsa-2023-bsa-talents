import { type ChatParticipantDto } from '~/bundles/chat/types/types.js';
import { Grid } from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import {
    useAppSelector,
    useEffect,
    useRef,
} from '~/bundles/common/hooks/hooks.js';

import { MessageItem } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
    // messages: Message[];
    className?: string;
};

const MessageList: React.FC<Properties> = ({ className }) => {
    const autoScrollElement = useRef<HTMLDivElement>(null);

    const { chatMessages, chats, currentChatId } = useAppSelector(
        ({ chat }) => ({
            chatMessages: chat.current.messages,
            chats: chat.chats,
            currentChatId: chat.current.chatId,
        }),
    );

    let receiver: ChatParticipantDto, sender: ChatParticipantDto;
    const selectedChat = chats.find((chat) => chat.chatId === currentChatId);

    if (selectedChat) {
        receiver = selectedChat.participants.receiver;
        sender = selectedChat.participants.sender;
    }

    const messages = chatMessages.map((message) => {
        const match = message.senderId === sender.id ? sender : receiver;
        return {
            id: message.id,
            userId: message.senderId,
            value: message.message,
            userFullName: match.profileName as string,
            avatar: match.avatarUrl,
        };
    });

    useEffect(() => {
        if (messages.length > 0) {
            autoScrollElement.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
            });
        }
    }, [messages.length]);
    return (
        <Grid className={getValidClassNames(styles.messageList, className)}>
            {messages.map((message) => (
                <MessageItem
                    key={message.id}
                    userId={message.userId}
                    userFullName={message.userFullName}
                    avatarUrl={message.avatar}
                >
                    {message.value}
                </MessageItem>
            ))}
            <div ref={autoScrollElement} className={styles.autoScrollElement} />
        </Grid>
    );
};

export { MessageList };
