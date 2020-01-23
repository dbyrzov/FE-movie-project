import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table'
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from "angular2-cookie/services/cookies.service";

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/app-home.component';
import { MoviesComponent } from './components/movies/app-movies.component';
import { MovieComponent } from './components/movie/app-movie.component';
import { LogInComponent } from './components/logIn/app-logIn.component';
import { EventsComponent } from './components/events/app-events.component';
import { UserComponent } from './components/user/app-user.component';
import { AuthGaurdService } from './services/auth.guard.service';
import { UserService } from './services/user.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MoviesComponent,
    MovieComponent,
    LogInComponent,
    EventsComponent,
    UserComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule ,
    MatTableModule
  ],
  providers: [UserService ,AuthGaurdService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
