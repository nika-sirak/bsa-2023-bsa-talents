import React from 'react';

import { ScrollView, Text } from '~/bundles/common/components/components';
import { globalStyles } from '~/bundles/common/styles/styles';
import { SearchCandidatesFilter } from '~/bundles/employer/components/components';

const Candidates: React.FC = () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const onSubmit = (payload: unknown): unknown => {
        return payload;
    };
    return (
        <ScrollView style={globalStyles.flex1}>
            <SearchCandidatesFilter onSubmit={onSubmit} />
            <Text>Employer screen: Candidates</Text>
        </ScrollView>
    );
};

export { Candidates };
