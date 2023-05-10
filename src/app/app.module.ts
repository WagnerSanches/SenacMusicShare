import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { SearchService } from './service/search-service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Inteceptador } from './service/Inteceptador';
import { AuthService } from './service/auth-service';
import { AddMusicComponent } from './components/add-music/add-music.component';
import { RouterModule } from '@angular/router';



const routes = [
    { path: '', component: AppComponent },
    { path: 'shareMusic', component: AddMusicComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    AddMusicComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    SearchService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Inteceptador,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
