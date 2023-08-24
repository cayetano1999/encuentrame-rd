import { PersonaCedula } from './persona.cedula';
import { Interaction } from './report.model';
import { UserData } from './user-data.mode';
export interface PoliceReport {
    persons: PersonaCedula[],
    user: UserData,
    creationDate: Date,
    code: string,
    description: string,
    interaction: Interaction [],
}