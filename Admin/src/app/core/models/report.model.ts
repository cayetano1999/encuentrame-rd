import { PersonData } from 'src/app/pages/projects/create-reports/create-reports.component';
  export interface ReportData {
    caseData: CaseData,
    code: string,
    description: string,
    interaction: Interaction [],
    // key: string,
    person: PersonInfo
  }
  
  
  
  export interface CaseData {
    caseReference: string;
    code: string;
    creationDate: string;
    description: string;
    key: string;
    othersImages: string[];
    personImages: string[];
    status: string;
    user: UserData;
  }
  
  interface UserData {
    expireSeconds: string;
    expireTime: string;
    id: number;
    isActive: boolean;
    refreshToken: string;
    token: string;
    user: User;
    userId: string;
  }
  
  interface User {
    hospitalDto: HospitalDto;
    id: string;
    isActive: boolean;
    person: Person;
    policeCenterDto: PoliceCenterDto;
    userRoles: UserRole[];
  }
  
  export interface HospitalDto {
    address: string;
    boos: string;
    description: string;
    id: number;
    latitude: string;
    logo: string;
    longitude: string;
    name: string;
    pictures: string;
    phoneNumber: string;
  }
  
  interface Person {
    firstName: string;
    lastName: string;
    personId: string;
    phone: string;
  }
  
  interface PoliceCenterDto {
    address: string;
    boos: string;
    description: string;
    id: number;
    latitude: string;
    logo: string;
    longitude: string;
    name: string;
    pictures: string;
    phoneNumber: string;

  }
  
  interface UserRole {
    roleId: string;
    userId: string;
  }
  
  interface PersonInfo {
    address: string;
    age: number;
    city: string;
    gender: string;
    hairBorm: string;
    lastName: string;
    firstName: string;
    name: string;
    skinColor: string;
    specialCondition: string;
  }
  
  export interface Case {
    caseData: CaseData;
    code: string;
    description: string;
    interaction: Interaction[];
    person: PersonInfo;
    key: string;
  }
  
  
  export class Interaction {
    user: UserData;
    comment: string;
  }
  
