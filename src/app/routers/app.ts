import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from '../components/app/_';

const routes: Routes = [
  
  { path: '',
    component: AppComponent,
    children: [
      { path: '', loadChildren: '../modules/home#HomeModule'},
    ]
  }
  // { path: 'login', loadChildren: './login/login.module#LoginModule' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
