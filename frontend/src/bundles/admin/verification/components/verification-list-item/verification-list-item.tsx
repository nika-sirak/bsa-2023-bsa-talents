import { Avatar } from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { useCallback } from '~/bundles/common/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties = {
    id: string;
    imageSrc: string;
    name: string;
    isSelected: boolean;
    onSelect: (id: string) => void;
};

const VerificationListItem: React.FC<Properties> = ({
    id,
    imageSrc,
    name,
    isSelected,
    onSelect,
}) => {
    const handleSelect = useCallback((): void => {
        onSelect(id);
    }, [onSelect, id]);

    return (
        <>
            <li>
                <button
                    className={getValidClassNames(
                        styles.card,
                        styles.btnReset,
                        isSelected ? 'selected' : '',
                    )}
                    onClick={handleSelect}
                >
                    <Avatar className={styles.avatar} src={imageSrc} />
                    <span className={styles.name}>{name}</span>
                </button>
            </li>
        </>
    );
};

export { VerificationListItem };
