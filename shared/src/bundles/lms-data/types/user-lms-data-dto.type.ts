import { type LMSProject } from './lms-project.type.js';

type UserLMSDataDto = {
    userId: string;
    english: string;
    averageProjectScore: number | null;
    averageLectureScore: number | null;
    lectureDetails: string;
    projectCoachesFeedback: string;
    hrFeedback: string;
    project: LMSProject;
};

export { type UserLMSDataDto };
