import React from 'react';

import {
    ChatBackButton,
    ChatInfoButton,
} from '~/bundles/chat/components/components';
import { Avatar, Text, View } from '~/bundles/common/components/components';
import {
    PhotoType,
    TextCategory,
    UserRole,
} from '~/bundles/common/enums/enums';
import { useAppSelector } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from './styles';

type Properties = {
    partnerName: string;
    partnerAvatar?: string;
    partnerId: string;
};

const ChatHeader: React.FC<Properties> = ({ partnerName, partnerId }) => {
    const { partners } = useAppSelector(({ chat }) => chat);
    const { currentUserData } = useAppSelector(({ auth }) => auth);
    const avatar = (
        <Avatar
            uri={partners[partnerId]}
            avatarSize={PhotoType.MEDIUM}
            customPhotoStyle={{
                photoShape: globalStyles.borderRadius15,
                defaultPhoto: globalStyles.borderRadius15,
            }}
        />
    );

    const headerContent = (
        <View style={[globalStyles.flex1, globalStyles.ph10]}>
            <Text
                category={TextCategory.H4}
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.title}
            >
                {partnerName}
            </Text>
            <View
                style={[
                    globalStyles.flex1,
                    globalStyles.flexDirectionRow,
                    globalStyles.alignItemsCenter,
                ]}
            >
                <View style={[globalStyles.mr5, styles.indicator]} />
                <Text style={styles.status}>Online</Text>
            </View>
        </View>
    );

    return (
        <View
            style={[
                globalStyles.flexDirectionRow,
                globalStyles.justifyContentSpaceBetween,
                globalStyles.alignItemsCenter,
                globalStyles.pv25,
                globalStyles.ph15,
                styles.headerContainer,
            ]}
        >
            <View style={[globalStyles.flexDirectionRow, globalStyles.flex1]}>
                {avatar}
                {headerContent}
            </View>
            {currentUserData?.role === UserRole.TALENT && <ChatInfoButton />}
            <ChatBackButton />
        </View>
    );
};

export { ChatHeader };
