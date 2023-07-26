import { Injectable } from '@angular/core';
import * as fireStorage from 'firebase';


@Injectable({
    providedIn: 'root'
})
export class FireStorageService {

     fireStorage = fireStorage.storage();
    // location = 'casos/'
    constructor() {
        
    }

    async uploadImg(image: any, location: string, imageName: string){
        try {
            // const imageName = this.imageName();
            return new Promise((resolve, reject) => {
              const pictureRef = this.fireStorage.ref(location + imageName);
              pictureRef
                .put(image)
                .then(function () {
                  pictureRef.getDownloadURL().then((url: any) => {
                    resolve(url);
                  });
                })
                .catch((error) => {
                  reject(error);
                });
            });
          } catch (e) {}
    }

    imageName() {
      const newTime = Math.floor(Date.now() / 1000);
      return Math.floor(Math.random() * 20) + newTime;
    }
}