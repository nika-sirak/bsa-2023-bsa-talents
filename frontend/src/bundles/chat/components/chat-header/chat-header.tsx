import {
    Avatar,
    Grid,
    Typography,
} from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { useAppSelector } from '~/bundles/common/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties = {
    avatarUrl?: string;
    className?: string;
    isOnline: boolean;
    title: string;
};

const ChatHeader: React.FC<Properties> = ({
    avatarUrl,
    className,
    isOnline,
    title,
}) => {
    const { currentChatId } = useAppSelector(({ chat }) => ({
        currentChatId: chat.current.chatId,
    }));
    const onlineIconClasses = getValidClassNames(
        styles.icon,
        isOnline ? styles.online : styles.offline,
    );

    return currentChatId ? (
        <Grid className={getValidClassNames(styles.wrapper, className)}>
            <Grid className={styles.logo}>
                <Avatar isSmall={true} src={avatarUrl} alt={title} />
            </Grid>
            <Grid className={styles.info}>
                <Typography
                    variant="h5"
                    className={getValidClassNames(
                        styles.truncate,
                        styles.title,
                    )}
                >
                    {title}
                </Typography>
                <Grid className={styles.status}>
                    <Grid className={onlineIconClasses} />
                    <p className={styles.textStatus}>
                        {isOnline ? 'Online' : 'Offline'}
                    </p>
                </Grid>
            </Grid>
        </Grid>
    ) : (
        <Grid className={getValidClassNames(styles.wrapper, className)}></Grid>
    );
};

export { ChatHeader };
