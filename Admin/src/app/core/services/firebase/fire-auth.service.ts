import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import * as fireAuth from 'firebase';


@Injectable({
    providedIn: 'root'
})
export class FireAuthService {

     ref = fireAuth.auth();

    constructor() {
        
    }

    loginWithUserEmail(email: string, pass: string){
        return this.ref.signInWithEmailAndPassword(email, pass);
    }

    register({email, pass}: any){
        return this.ref.createUserWithEmailAndPassword(email, pass);
    }

    loginWithGoogle(){
        return this.ref.signInWithPopup(new firebase.auth.GoogleAuthProvider);
    }

    loginWithGooglePop(){
        return this.ref.signInWithRedirect(new firebase.auth.GoogleAuthProvider);
    }
}