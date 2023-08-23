import { CheckRounded as CheckIcon } from '@mui/icons-material';
import {
    Checkbox as CheckboxMUI,
    type CheckboxProps,
    FormControlLabel,
} from '@mui/material';

import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = CheckboxProps & {
    label?: string;
    isDisabled?: boolean;
    isDefaultChecked?: boolean;
    isChecked?: boolean;
    isRequired?: boolean;
};

const checkboxIcon = (
    <span className={getValidClassNames(styles.checkboxIcon)} />
);
const checkboxIconChecked = (
    <span
        className={getValidClassNames(
            styles.checkboxIcon,
            styles.checkboxIconChecked,
        )}
    >
        <CheckIcon />
    </span>
);

const Checkbox: React.FC<Properties> = ({
    label,
    isChecked,
    isDefaultChecked,
    isDisabled,
    isRequired,
    className,
}) => {
    return label ? (
        <FormControlLabel
            control={
                <CheckboxMUI
                    defaultChecked={isDefaultChecked}
                    checked={isChecked}
                    required={isRequired}
                    disabled={isDisabled}
                    className={getValidClassNames(className)}
                    icon={checkboxIcon}
                    checkedIcon={checkboxIconChecked}
                />
            }
            label={label}
        />
    ) : (
        <CheckboxMUI
            defaultChecked={isDefaultChecked}
            checked={isChecked}
            required={isRequired}
            disabled={isDisabled}
            className={getValidClassNames(className)}
            icon={checkboxIcon}
            checkedIcon={checkboxIconChecked}
        />
    );
};

export { Checkbox };
