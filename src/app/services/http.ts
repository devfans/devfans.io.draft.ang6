import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { LoggerService } from './logger';
import { environment } from '../../environments/environment'
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { VIEWPORT_RULER_PROVIDER } from '@angular/cdk/overlay';
import { errors } from '../../common/errors';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  ServerCatch: (res: any) => void;

  constructor(
    private logger: LoggerService,
    private router: Router,
  ) {
    this.ServerCatch = this.serverCatch.bind(this)
  }

  serverCatch(res: any) {
    switch(parseInt(res.err_no)) {
      case errors.SUCCESS:
        this.logger.log("Login success!")
        localStorage.setItem("isLoggedin", 'yes')
        if (this.router.url.startsWith('/signin')) this.router.navigate(['/'])
        return
      case errors.NO_PERMISSION:
         this.logger.log("Not Authorized!")
         let navigationExtras: NavigationExtras = {
          queryParams: { status: 'NotAuthorized' },
        };
         this.router.navigate(['/signin', navigationExtras])
         return
      case errors.LOGIN_REQUIRED:
        localStorage.setItem("isLoggedin", 'no')
        this.logger.log("Login failed!")
        // window.location.href = environment.config.loginUrl
    }
   
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // this.logger.error(error);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
