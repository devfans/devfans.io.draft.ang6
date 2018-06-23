import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


@Injectable()
export class AuthGuard implements CanActivate {
    inBrowser: boolean;
    checkLoginStatus: ()=>void;
    constructor(private router: Router,
        @Inject(PLATFORM_ID) private platformId: Object,
        @Inject(APP_ID) private appId: string) {
        this.inBrowser = isPlatformBrowser(platformId)
        this.checkLoginStatus = () => {
            if (!this.inBrowser) return true
            return localStorage.getItem('isLoggedin') === 'yes'
        }
      }

    canActivate() {
        if (this.checkLoginStatus()) {
            return true;
        }

        this.router.navigate(['/signin']);
        return false;
    }
}
