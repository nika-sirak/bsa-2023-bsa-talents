import { type ReactElement, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
    FlatList,
    Pressable,
    Text,
    TouchableOpacity,
    View,
} from '~/bundles/common/components/components';
import { Color, IconName, TextCategory } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from './styles';

type Select = {
    label: string;
    value: string;
};

type Properties = {
    options: Select[];
    onSelect?: (item: Select) => void;
};

const iconDefaultSize = 24;

const Selector: React.FC<Properties> = ({ options }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [isListVisible, setIsListVisible] = useState(false);

    const toggleIsListVisible = (): void => {
        setIsListVisible((previous) => !previous);
    };

    const handlePressItem = (option: Select): void => {
        toggleIsListVisible();
        setSelectedOption(option.label);
    };

    const selectIconName = isListVisible
        ? IconName.ARROW_DROP_UP
        : IconName.ARROW_DROP_DOWN;

    return (
        <View style={{ position: 'relative' }}>
            <Pressable
                style={[
                    globalStyles.pv10,
                    globalStyles.pl15,
                    globalStyles.pr5,
                    globalStyles.borderRadius5,
                    globalStyles.flexDirectionRow,
                    globalStyles.justifyContentSpaceBetween,
                    globalStyles.alignItemsCenter,
                    styles.dropdownButton,
                ]}
                onPress={(): void => {
                    setIsListVisible((previous) => !previous);
                }}
            >
                <Text category={TextCategory.LABEL}>{selectedOption}</Text>

                <Icon
                    name={selectIconName}
                    size={iconDefaultSize}
                    color={Color.PRIMARY}
                />
            </Pressable>
            {isListVisible && (
                <Pressable
                    style={[
                        globalStyles.pl20,
                        globalStyles.width100,
                        styles.dropdown,
                        styles.dropdownButton,
                    ]}
                    onPress={toggleIsListVisible}
                >
                    <FlatList
                        data={options}
                        renderItem={({ item }): ReactElement => {
                            return (
                                <TouchableOpacity
                                    onPress={(): void => {
                                        handlePressItem(item);
                                    }}
                                >
                                    <Text
                                        category={TextCategory.LABEL}
                                        style={globalStyles.pv5}
                                    >
                                        {item.label}
                                    </Text>
                                </TouchableOpacity>
                            );
                        }}
                        keyExtractor={(item): string => item.value}
                    />
                </Pressable>
            )}
        </View>
    );
};

export { Selector };
