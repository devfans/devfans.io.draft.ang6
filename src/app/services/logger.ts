import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  private prod: boolean = true;
  constructor() {
    //  if (!environment.production) this.prod = false;
   }

  log(s: any) {
    if (!this.prod) console.info(s)
  }

  debug(s: any) {
    if (!this.prod) console.debug(s)

  }

  info(s: any) {
    if (!this.prod) console.info(s)
  }

  error(s: any) {
    console.error(s)
  }

  warn(s: any) {
    if (!this.prod) console.warn(s)
  }
}
