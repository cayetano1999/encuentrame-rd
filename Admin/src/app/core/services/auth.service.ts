import { Injectable } from '@angular/core';

import { getFirebaseBackend } from '../../authUtils';

import { User } from '../models/auth.models';
import { ApiService } from './api.service';


const routes = {
    basicLoogin: () => `/Auth/SignIn`,
}

@Injectable({ providedIn: 'root' })

export class AuthenticationService {

    user: User;


    constructor(private apiService: ApiService) {
    }

    /**
     * Returns the current user
     */
    public currentUser(): User {
        return getFirebaseBackend().getAuthenticatedUser();
    }

    /**
     * Performs the auth
     * @param email email of user
     * @param password password of user
     */
    login(email: string, password: string) {
        return getFirebaseBackend().loginUser(email, password).then((response: any) => {
            const user = response;
            return user;
        });
    }

    /**
     * Performs the register
     * @param email email
     * @param password password
     */
    register(email: string, password: string) {
        return getFirebaseBackend().registerUser(email, password).then((response: any) => {
            const user = response;
            return user;
        });
    }

    /**
     * Reset password
     * @param email email
     */
    resetPassword(email: string) {
        return getFirebaseBackend().forgetPassword(email).then((response: any) => {
            const message = response.data;
            return message;
        });
    }

    /**
     * Logout the user
     */
    logout() {
        // logout the user
        getFirebaseBackend().logout();
    }

    basicLogin(user: string, pass: string){
        return this.apiService.post(routes.basicLoogin(), {email: user, password: pass});
    }
}

