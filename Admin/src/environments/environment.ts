// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  defaultauth: 'fackbackend',
  firebaseConfig: {
    apiKey: "AIzaSyCN_jIcIYpwtot-251XfHMkkBNbLDTs1-4",
    authDomain: "encuentramerd-ef4c8.firebaseapp.com",
    projectId: "encuentramerd-ef4c8",
    storageBucket: "encuentramerd-ef4c8.appspot.com",
    messagingSenderId: "910187422530",
    appId: "1:910187422530:web:906698533d0362be5a5edb",
    measurementId: "G-CGLCS70B0Y"
  },
  urlApi: 'https://encuentramerd-restapi.azurewebsites.net/api'
};

export const snapshortToArrayList = (snapshot : any) => { 
  debugger
  let returnArray: any[] = []; 
  console.log(snapshot)
  snapshot.forEach((element:any) => { 
  debugger

    let item = element.val(); 
    if (item?.key) { 
      item.key = element.key; 
      returnArray.push(item); 
    } }); 
    return returnArray; 
}

export const snapshortToArray = (snapshot : any) => { 
  let returnArray: any[] = []; 
  snapshot.forEach((element:any) => { 
    let item = element.val(); 
    if (item) { 
      item.key = element.key; 
      returnArray.push(item); 
    } }); 
    return returnArray; 
}


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
