import { Box as MUIBox, Slider as MUISlider } from '@mui/material';
import { useCallback } from 'react';

import styles from './styles.module.css';

type Option = {
    label?: string;
    value: number;
};

type Properties = {
    marks: Option[];
    label?: string;
    value?: number;
    containerClass?: string;
    sliderClass?: string;
    step?: number | null;
    valueLabelDisplay?: 'auto' | 'on' | 'off';
};

const getClasses = (styles: CSSModuleClasses): Record<string, string> => {
    const newClasses: Record<string, string> = {};
    for (const key of Object.keys(styles)) {
        newClasses[key] = styles[key];
    }
    return newClasses;
};

const CustomSlider: React.FC<Properties> = ({
    marks = [],
    label,
    value,
    step = null,
    valueLabelDisplay = 'on',
}) => {
    const getValueLabel = useCallback(
        (value: number): string | null => {
            const mark = marks.find((mark) => mark.value === value);
            return mark?.label ?? null;
        },
        [marks],
    );

    return (
        <MUIBox className={styles.sliderContainer}>
            {label && <span>{label}</span>}
            <MUISlider
                className={styles.slider}
                classes={getClasses(styles)}
                style={{
                    height: '15px',
                    marginTop: '20px',
                }}
                aria-label={label}
                defaultValue={value}
                marks={marks}
                step={step}
                valueLabelDisplay={valueLabelDisplay}
                valueLabelFormat={getValueLabel}
            />
        </MUIBox>
    );
};

export { type Properties as SliderProps };
export { CustomSlider as Slider };
