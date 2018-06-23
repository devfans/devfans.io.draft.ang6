import { NgModule }       from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { MaterialModule } from './material'

import { HomeRoutingModule }     from '../routers/home';

import { SidenavComponent }  from '../components/sidebar/_'
import { HomeComponent }         from '../components/home/_';

import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    HomeRoutingModule,
  ],
  declarations: [
    HomeComponent,
    SidenavComponent,
  ],
  providers: []
})
export class HomeModule {
}
