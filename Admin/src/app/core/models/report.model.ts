import { PersonData } from 'src/app/pages/projects/create-reports/create-reports.component';
import { UserData } from './user-data.mode';
import { Case } from './case.model';
export class Report {
    code: string;
    description: string;
    publishDate: Date;
    comments: {userName: string, comment: string}[];
    person: PersonData;
    caseData: Case
}