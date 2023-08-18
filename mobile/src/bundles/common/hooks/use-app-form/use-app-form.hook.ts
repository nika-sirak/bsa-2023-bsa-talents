import { joiResolver } from '@hookform/resolvers/joi';
import {
    type Control,
    type DefaultValues,
    type FieldErrors,
    type FieldValues,
    useForm,
    type UseFormHandleSubmit,
    type ValidationMode,
} from 'react-hook-form';

import { type ValidationSchema } from '~/bundles/common/types/types';

type Arguments<T extends FieldValues = FieldValues> = {
    defaultValues: DefaultValues<T>;
    validationSchema?: ValidationSchema;
    mode?: keyof ValidationMode;
};

type Results<T extends FieldValues = FieldValues> = {
    control: Control<T, null>;
    errors: FieldErrors<T>;
    handleSubmit: UseFormHandleSubmit<T>;
};

const useAppForm = <T extends FieldValues = FieldValues>({
    defaultValues,
    mode,
    validationSchema,
}: Arguments<T>): Results<T> => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<T>({
        defaultValues,
        mode,
        resolver: validationSchema ? joiResolver(validationSchema) : undefined,
    });

    return {
        control,
        handleSubmit,
        errors,
    };
};

export { useAppForm };
