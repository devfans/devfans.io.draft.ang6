import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component} from '@angular/core';
import { Router } from '@angular/router';
import { slideToTop } from '../../animations';

/** @title Responsive sidenav */
@Component({
  selector: 'sidenav',
  templateUrl: '_.html',
  styleUrls: ['_.scss'],
  animations: [slideToTop()]
})
export class SidenavComponent {
  mobileQuery: MediaQueryList;
  opened: boolean;
  logoPath: string;
  fillerNav = [
    // {link: "/accounts", name: "Accounts" },
  ]

  fillerContent = Array(1).fill(0).map(() =>
      `Miners Table`);

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.opened = !this.mobileQuery.matches;
    this.logoPath = "assets/images/logo.png";
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}

