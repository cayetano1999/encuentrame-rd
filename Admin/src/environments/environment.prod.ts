export const environment = {
  production: true,
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
  urlApi: 'https://encuentramerd-restapi.azurewebsites.net/',

  FCMInfo: {
    serverKey: "AAAA0-tl40I:APA91bEC0jsz2yed6_z0L-eGrj77-yadLkV5mAFad8hgG6WXrzagWYt_Ka8UsUaJxUim9zFlTbjb-epLGcA7-t_cZi_8-d5zustuMQlSKZ0o-6L_CATJICUOt0YdpVLUUzCfJtGhBeb1"  
  }

};


export const snapshortToArrayList = (snapshot : any) => { 
  let returnArray: any[] = []; 
  snapshot.forEach((element:any) => { 
    let item = element.val(); 
    if (item?.key) { 
      item.key = element.key; 
      returnArray.push(item); 
    } }); 
    return returnArray; 
}