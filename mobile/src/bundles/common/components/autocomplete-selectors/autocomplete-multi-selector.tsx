import React from 'react';
import {
    type Control,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';
import { TextInput } from 'react-native';
import Animated from 'react-native-reanimated';

import {
    ScrollView,
    Tag,
    Text,
    TouchableOpacity,
    View,
} from '~/bundles/common/components/components';
import { Color, IconName, TextCategory } from '~/bundles/common/enums/enums';
import {
    useFormController,
    useMemo,
    useSelectorAnimations,
    useState,
    useVisibility,
} from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from './styles';

type Options = {
    label: string;
    value: string;
};

type Properties<T extends FieldValues> = {
    control?: Control<T, null>;
    name: FieldPath<T>;
    hasError?: boolean;
    items: Options[];
    placeholder?: string;
};

const AutocompleteMultiSelector = <T extends FieldValues>({
    control,
    name,
    hasError,
    items,
    placeholder,
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });
    const { value, onBlur, onChange } = field;
    const [search, setSearch] = useState('');
    const { isVisible, toggleVisibility } = useVisibility(false);
    const { heightAnimatedStyle } = useSelectorAnimations(isVisible);

    const handleSearch = (text: string): void => {
        setSearch(text);
    };

    const handleItemSelect = (item: Options): void => {
        if (value.includes(item.value)) {
            return;
        }
        toggleVisibility();
        value.push(item);
        onChange(value);
    };

    const handleItemDelete = (itemName: string): void => {
        onChange(value.filter((item: Options) => item.value !== itemName));
    };

    const filteredItems = useMemo(() => {
        return items.filter(
            (item) =>
                item.value.toLowerCase().includes(search.toLowerCase()) &&
                !value.includes(item.value),
        );
    }, [search, value, items]);

    return (
        <>
            <View style={styles.container}>
                <TextInput
                    placeholder={placeholder}
                    onBlur={onBlur}
                    onFocus={toggleVisibility}
                    value={search}
                    onChangeText={handleSearch}
                    style={[
                        globalStyles.pv10,
                        globalStyles.pl15,
                        globalStyles.pr5,
                        globalStyles.borderRadius5,
                        globalStyles.flexDirectionRow,
                        globalStyles.justifyContentSpaceBetween,
                        globalStyles.alignItemsCenter,
                        styles.input,
                        hasError && styles.error,
                    ]}
                    placeholderTextColor={Color.TEXT2}
                />

                <Animated.View
                    style={[
                        globalStyles.pl20,
                        globalStyles.pb5,
                        globalStyles.width100,
                        heightAnimatedStyle,
                        styles.dropdown,
                    ]}
                >
                    <ScrollView nestedScrollEnabled>
                        {filteredItems.map((item: Options) => (
                            <TouchableOpacity
                                key={item.value}
                                onPress={(): void => {
                                    handleItemSelect(item);
                                }}
                            >
                                <Text
                                    category={TextCategory.LABEL}
                                    style={globalStyles.pv5}
                                >
                                    {item.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </Animated.View>
            </View>
            <View
                style={[
                    globalStyles.mt15,
                    globalStyles.flexDirectionRow,
                    styles.tagContainer,
                ]}
            >
                {value.map((item: Options) => (
                    <Tag
                        key={item.value}
                        value={item.value}
                        onPress={handleItemDelete}
                        iconName={IconName.CLOSE}
                        iconSize={15}
                    />
                ))}
            </View>
        </>
    );
};

export { AutocompleteMultiSelector };
