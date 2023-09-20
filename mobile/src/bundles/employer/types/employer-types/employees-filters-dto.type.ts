import { type EmployeesFilterOption } from './employees-filters-option.type';

// TODO: Change with real data
type EmployeesFiltersDto = {
    activeTalentsOnly: boolean;
    jobTitle: EmployeesFilterOption[];
    hardSkills: EmployeesFilterOption[];
    BSACharacteristics: EmployeesFilterOption[];
    location: EmployeesFilterOption[];
    BSAProjectName: EmployeesFilterOption[];
    englishLevel: string[];
    experienceYears: EmployeesFilterOption[];
    employmentTypes: string[];
};

export { type EmployeesFiltersDto };
