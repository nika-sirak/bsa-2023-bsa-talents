import { actions as candidateActions } from '~/bundles/candidate-details/store/candidate.js';
import { actions as chatActions } from '~/bundles/chat/store/chat.js';
import {
    Avatar,
    Button,
    FormControl,
    Grid,
    Logo,
    RadioGroup,
    Typography,
} from '~/bundles/common/components/components.js';
import {
    useAppDispatch,
    useAppForm,
    useAppSelector,
    useCallback,
    useEffect,
} from '~/bundles/common/hooks/hooks.js';
import { actions as hiringInfoActions } from '~/bundles/hiring-info/store/hiring-info.js';
import { userDetailsApi } from '~/bundles/user-details/user-details.js';

import styles from './styles.module.scss';

type Properties = {
    className?: string;
};

const options = [
    {
        value: 'Yes',
        label: 'Yes',
    },
    {
        value: 'No',
        label: 'No',
    },
];
const CompanyInfo: React.FC<Properties> = ({ className }) => {
    const {
        company,
        hasSharedContacts,
        talentId,
        talentIsHired,
        companyId,
        currentChatId,
    } = useAppSelector(({ chat }) => ({
        company: chat.current.employerDetails,
        hasSharedContacts: chat.current.talentHasSharedContacts,
        talentId: chat.current.talentId,
        companyId: chat.current.employerDetails.employerId,
        currentChatId: chat.current.chatId,
        talentIsHired: chat.current.talentIsHired,
    }));
    const dispatch = useAppDispatch();

    const {
        logoUrl,
        companyName,
        employerName,
        employerPosition,
        about,
        companyWebsite,
    } = company;

    const handleShareCVButtonClick = useCallback(() => {
        const createNotificationMessage = async (): Promise<void> => {
            const userDetails = await userDetailsApi.getFullUserDetailsById({
                userId: talentId as string,
            });

            const cvUrl = userDetails.cv?.url;
            const baseUrl = window.location.toString().replace('/chats', '');

            void dispatch(
                chatActions.createMessage({
                    message:
                        'Hello!\n I have shared my CV and information with you.\n\n ' +
                        `CV_&_${cvUrl} ` +
                        `Profile_&_${baseUrl}/candidates/${talentId} `,
                    senderId: talentId as string,
                    receiverId: companyId as string,
                    chatId: currentChatId as string,
                }),
            );

            void dispatch(candidateActions.shareContactsWithCompany());
        };

        void createNotificationMessage();
    }, [dispatch, currentChatId, companyId, talentId]);

    const { control, watch } = useAppForm<{ hire: 'Yes' | 'No' }>({
        defaultValues: { hire: 'Yes' },
    });

    useEffect(() => {
        if (talentId && companyId) {
            void dispatch(
                hiringInfoActions.getHiringInfo({
                    talentId,
                    companyId,
                }),
            );
        }
    }, [dispatch, companyId, talentId]);

    const handleHireSubmit = useCallback((): void => {
        if (watch('hire') === 'Yes') {
            void dispatch(
                hiringInfoActions.submitHiringInfo({
                    talentId: talentId ?? '',
                    companyId: companyId ?? '',
                }),
            );
        }
    }, [dispatch, companyId, talentId, watch]);

    const aboutInfo = about ?? 'No information provided';
    return currentChatId ? (
        <Grid className={styles.wrapper}>
            <Grid className={styles.header}>
                <Avatar
                    alt={companyName ?? 'company name'}
                    src={logoUrl ?? ''}
                    isSmall
                />
                <Grid className={styles.headerInfo}>
                    <Typography className={styles.companyName} variant="h3">
                        {companyName}
                    </Typography>
                    <Typography
                        className={styles.companyRepresentative}
                        variant="body1"
                    >
                        {employerName}, {employerPosition}
                    </Typography>
                </Grid>
            </Grid>

            <Grid className={styles.contentWrapper}>
                <Grid className={styles.content}>
                    <Typography className={styles.contentHeading} variant="h6">
                        About {companyName}
                    </Typography>
                    <Typography className={styles.about} variant="body1">
                        {aboutInfo}
                    </Typography>
                    {companyWebsite && (
                        <>
                            <Typography
                                className={styles.contentHeading}
                                variant="h6"
                            >
                                Company Website
                            </Typography>
                            <Typography
                                variant="body1"
                                className={styles.linkWrapper}
                            >
                                <a
                                    href={
                                        companyWebsite.startsWith('http://') ||
                                        companyWebsite.startsWith('https://')
                                            ? companyWebsite
                                            : `http://${companyWebsite}`
                                    }
                                    rel="noreferrer"
                                    target="_blank"
                                    className={styles.companyLink}
                                >
                                    {companyWebsite}
                                </a>
                            </Typography>
                        </>
                    )}
                </Grid>
                <Grid className={styles.buttons}>
                    <Button
                        className={styles.mainBtn}
                        label="Share your contact and CV"
                        onClick={handleShareCVButtonClick}
                        isDisabled={hasSharedContacts}
                    />
                    <FormControl className={styles.hireCandidates}>
                        {!talentIsHired && (
                            <>
                                <Typography variant="label">
                                    Have the company hired you?
                                </Typography>
                                <RadioGroup
                                    control={control}
                                    options={options}
                                    name={'hire'}
                                    className={styles.radio}
                                />
                            </>
                        )}
                        {talentIsHired && (
                            <Typography
                                variant="label"
                                className={styles.hiredLabel}
                            >
                                You have been hired by this company
                            </Typography>
                        )}
                        <Button
                            label="Submit"
                            className={styles.mainBtn}
                            onClick={handleHireSubmit}
                            isDisabled={talentIsHired}
                        />
                    </FormControl>
                </Grid>
            </Grid>
        </Grid>
    ) : (
        <Grid className={className}>
            <Logo isCollapsed />
            <span className={styles.hire}>
                Where great talent meets great opportunities
            </span>
        </Grid>
    );
};

export { CompanyInfo };
