export interface UserData {
    id: number;
    token: string;
    refreshToken: string;
    expireTime: string;
    expireSeconds: string;
    userId: string;
    isActive: boolean;
    user: {
      id: string;
      email: string | null;
      isActive: boolean;
      person: {
        personId: string;
        firstName: string;
        lastName: string;
        phone: string;
        picture: string | null;
      };
      userRoles: {
        roleId: string;
        userId: string;
      }[];
      hospitalDto: {
        id: number;
        name: string;
        description: string;
        latitude: string;
        longitude: string;
        address: string;
        boos: string;
        logo: string;
        pictures: string;
      };
      policeCenterDto: {
        id: number;
        name: string;
        description: string;
        latitude: string;
        longitude: string;
        address: string;
        boos: string;
        logo: string;
        pictures: string;
      };
    };
  }
  