import { UserData } from './user-data.mode';
export interface Case {
    code: string;
    caseReference: string;
    description: string;
    personImages: string[];
    othersImages: string[];
    user: UserData;
    creationDate: any;
    status?: 'pending' | 'complete' | 'notified'
}