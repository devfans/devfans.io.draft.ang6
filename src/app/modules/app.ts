import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpClientModule }    from '@angular/common/http';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';  

// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService }  from '../in-memory-data.service';

import { AppRoutingModule }     from '../routers/app';
import { AppComponent }         from '../components/app/_';
import { MaterialModule } from './material'

import {FormsModule, ReactiveFormsModule} from '@angular/forms';


// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@NgModule({
  imports: [
    // NgbModule.forRoot(),
    BrowserModule.withServerTransition({ appId: 'dce-ops' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // ),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ?
      'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);
  }
}
