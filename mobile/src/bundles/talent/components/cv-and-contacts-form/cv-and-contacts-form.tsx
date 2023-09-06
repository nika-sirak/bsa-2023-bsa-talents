import React from 'react';

import {
    Button,
    FilePicker,
    FormField,
    Input,
    ScrollView,
    Text,
    View,
} from '~/bundles/common/components/components';
import { TextCategory } from '~/bundles/common/enums/enums';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { AvatarPicker } from '~/bundles/talent/components/avatar-picker/avatar-picker';
import { StepFourValidationSchema } from '~/bundles/talent/validation-schemas/validation-schemas';

import { CV_AND_CONTACTS_DEFAULT_VALUES } from './constants/constants';
import { styles } from './styles';

type Properties = {
    onSubmit: () => void;
};

const CVAndContactsForm: React.FC<Properties> = ({ onSubmit }) => {
    const { control, errors, handleSubmit } = useAppForm({
        defaultValues: CV_AND_CONTACTS_DEFAULT_VALUES,
        validationSchema: StepFourValidationSchema,
    });

    const handleFormSubmit = useCallback((): void => {
        void handleSubmit(onSubmit)();
    }, [handleSubmit, onSubmit]);

    return (
        <ScrollView
            contentContainerStyle={[globalStyles.p25, styles.container]}
        >
            <FormField
                errors={errors}
                name="photoId"
                containerStyle={globalStyles.alignItemsCenter}
            >
                <AvatarPicker control={control} name="photoId" />
            </FormField>
            <FormField
                errors={errors}
                label="Full name"
                name="fullName"
                required
                containerStyle={globalStyles.pb25}
            >
                <Input
                    control={control}
                    name="fullName"
                    placeholder="Name Name"
                />
            </FormField>
            <FormField
                errors={errors}
                label="Phone number"
                name="phoneNumber"
                required
                containerStyle={globalStyles.pb25}
            >
                <Input
                    control={control}
                    name="phoneNumber"
                    placeholder="+38000 000 00 00"
                    keyboardType="numeric"
                />
            </FormField>
            <FormField
                errors={errors}
                label="Linkedin profile"
                name="linkedinProfile"
                required
                containerStyle={globalStyles.pb25}
            >
                <Input
                    control={control}
                    name="linkedinProfile"
                    placeholder="link to BSA project"
                    marker="www."
                />
            </FormField>
            <FormField
                errors={errors}
                label="CV"
                name="cv"
                required
                containerStyle={globalStyles.pb25}
            >
                <FilePicker
                    label="Choose file"
                    control={control}
                    name="cv"
                    style={[globalStyles.borderRadius5, styles.buttonContainer]}
                />
            </FormField>
            <View
                style={[
                    globalStyles.p15,
                    globalStyles.mb25,
                    globalStyles.borderRadius5,
                    styles.captionContainer,
                ]}
            >
                <Text category={TextCategory.CAPTION}>
                    Job search is anonymous. This information will be seen only
                    in case you share it.
                </Text>
            </View>
            <View style={globalStyles.flexDirectionRow}>
                <Button
                    label="Back"
                    buttonType="Outline"
                    style={globalStyles.mr10}
                />
                <Button label="Next" onPress={handleFormSubmit} />
            </View>
        </ScrollView>
    );
};

export { CVAndContactsForm };
