import { joiResolver } from '@hookform/resolvers/joi';
import {
    type Control,
    type DefaultValues,
    type FieldErrors,
    type FieldValues,
    type UseFormHandleSubmit,
    type UseFormSetError,
    type UseFormSetValue,
    type UseFormWatch,
    type ValidationMode,
} from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { type ValidationSchema } from '~/bundles/common/types/types.js';

type Parameters<T extends FieldValues = FieldValues> = {
    defaultValues: DefaultValues<T>;
    validationSchema?: ValidationSchema;
    mode?: keyof ValidationMode;
};

type ReturnValue<T extends FieldValues = FieldValues> = {
    control: Control<T, null>;
    errors: FieldErrors<T>;
    handleSubmit: UseFormHandleSubmit<T>;
    watch: UseFormWatch<T>;
    setValue: UseFormSetValue<T>;
    setError: UseFormSetError<T>;
};

const useAppForm = <T extends FieldValues = FieldValues>({
    validationSchema,
    defaultValues,
    mode,
}: Parameters<T>): ReturnValue<T> => {
    const {
        control,
        handleSubmit,
        watch,
        setValue,
        setError,
        formState: { errors },
    } = useForm<T>({
        mode,
        defaultValues,
        resolver: validationSchema ? joiResolver(validationSchema) : undefined,
    });

    return {
        control,
        errors,
        handleSubmit,
        watch,
        setValue,
        setError,
    };
};

export { useAppForm };
