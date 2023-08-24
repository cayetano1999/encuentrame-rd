import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReportData } from '../../models/report.model';
import { PoliceReport } from '../../models/police-report-model';

@Injectable({
  providedIn: 'root'
})
export class FcmService {
  private fcmUrl = 'https://fcm.googleapis.com/fcm/send';
  private serverKey = 'TU_CLAVE_DEL_SERVIDOR_FCM';

  private options = { headers: new HttpHeaders({
    // 'Authorization': ''
   })
   .set('Authorization', 'key=AAAA0-tl40I:APA91bEC0jsz2yed6_z0L-eGrj77-yadLkV5mAFad8hgG6WXrzagWYt_Ka8UsUaJxUim9zFlTbjb-epLGcA7-t_cZi_8-d5zustuMQlSKZ0o-6L_CATJICUOt0YdpVLUUzCfJtGhBeb1')
   .set('Content-Type', 'application/json')
  };

  constructor(private http: HttpClient) { }

  sendNotification(tokens: string[], title: string, text: string, imageUrl: string, data: ReportData) {
  

    const notification = {
      "registration_ids": ["f8LtaJ64TXO8pwDu5aBcak:APA91bEv6g22HfYTPYXrC0rawXItAoateTQrAZOKg7TWB4IJqoC_pDpKsNR1GXE1hOR4iMb5AaKNlI0-t2hdl3QCdVMwxwv1xUBNR4fYCdKKxBrDflF1HMfRe-LErIj5ojD-7gPfwKbk"],
      
      "notification": {
        "title": data.caseData.user.user.hospitalDto.name,
        "body": data.caseData.caseReference,
        "image": data.caseData.personImages[0]
      },

      "data": {
        "case": data.code,
      }
    };
    debugger;

    return this.http.post(this.fcmUrl, JSON.stringify(notification), this.options);



  }

  sendNotificationPolicial(tokens: string[], title: string, text: string, imageUrl: string, data: PoliceReport) {
  

    const notification = {
      "registration_ids": ["f8LtaJ64TXO8pwDu5aBcak:APA91bEv6g22HfYTPYXrC0rawXItAoateTQrAZOKg7TWB4IJqoC_pDpKsNR1GXE1hOR4iMb5AaKNlI0-t2hdl3QCdVMwxwv1xUBNR4fYCdKKxBrDflF1HMfRe-LErIj5ojD-7gPfwKbk"],
      
      "notification": {
        "title": data.user.user.policeCenterDto.name,
        "body": `${data.persons?.length} personas reportadas`,
        "image": data.persons[0].foto
      },

      "data": {
        "case": data.code
      }
    };
    debugger;

    return this.http.post(this.fcmUrl, JSON.stringify(notification), this.options);



  }
}
