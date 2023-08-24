import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  constructor(
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handle(req, next));
  }

  async handle(req: HttpRequest<any>, next: HttpHandler) {
    const url = req.url.toLowerCase();

    debugger;
    if (url.includes('https://fcm.googleapis.com/fcm/send')) {
      req = this.addToken(req, false);
    }

    return await next.handle(req).pipe(
      map((response: HttpEvent<any>) => {
        if (response instanceof HttpResponse) {
          if(response.body){
            debugger;
            const decryptedBody = response.body
            let result;
            try {
              result = JSON.parse(decryptedBody);
            } catch (error) {
              result = decryptedBody;
            }
            response = response.clone({
              body: result
            })
          }
        }
        return response;
      }),
    ).toPromise();
  }

  private addUserId(request: HttpRequest<any>, userId: string) {
    return request.clone({
      setHeaders: {
        'user-info': userId,
      }
    });
  }

  private addToken(request: HttpRequest<any>, customUser: boolean) {
    return request.clone({
      setHeaders: {
        'Authorization': 'key=AAAA0-tl40I:APA91bEC0jsz2yed6_z0L-eGrj77-yadLkV5mAFad8hgG6WXrzagWYt_Ka8UsUaJxUim9zFlTbjb-epLGcA7-t_cZi_8-d5zustuMQlSKZ0o-6L_CATJICUOt0YdpVLUUzCfJtGhBeb1',
      }
    });
  }

//   async getUserId() {
//     const userData = await this.storageHelper.getStorageKey(StorageEnum.USER_DATA);
//     return userData?.user_t24;
//   }
}
