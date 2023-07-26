import { Injectable } from '@angular/core';
import * as firebaseDatabase from 'firebase';


@Injectable({
    providedIn: "root"
})

export class FireDataBaseService {

    /**
     *
     */
    _document = '';
    _ref: firebase.database.Reference = {} as any;
    constructor() {
        
        // this._ref = firebaseDatabase.database().ref(this._document);
    }


    add(data: any) {
        debugger;
        const newItem = firebaseDatabase.database().ref(this._document);
        newItem.push(data, complete => {
            console.log(complete);
        })
    }

    update(key: string, data: any) {
        ;
        return firebaseDatabase.database().ref(this._document + key).update(data);
    }

    remove(key: string) {
        return firebaseDatabase.database().ref(this._document + key).remove();
    }

    async get(document: string, keyToFilter: string, value: any){
        return firebaseDatabase.database().ref(document)
    .orderByChild(keyToFilter).equalTo(value)
    .once("value", snapshot => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        console.log("exists!", userData);
        return true;
      }
      return false;
    });

    }

}