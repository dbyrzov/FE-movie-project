import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from "./components/home/app-home.component";
import { MoviesComponent } from "./components/movies/app-movies.component";
import { MovieComponent } from "./components/movie/app-movie.component";
import { LogInComponent } from "./components/logIn/app-logIn.component";
import { UserComponent } from "./components/user/app-user.component";
import { EventsComponent } from "./components/events/app-events.component";
import { AuthGaurdService } from './services/auth.guard.service';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGaurdService]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGaurdService]},
  {path: 'home/movies', component: MoviesComponent, canActivate: [AuthGaurdService]},
  {path: 'home/movies/watchedList', component: MoviesComponent, canActivate: [AuthGaurdService]},
  {path: 'home/movies/wishList', component: MoviesComponent, canActivate: [AuthGaurdService]},
  {path: 'home/movies/movie', component: MovieComponent, canActivate: [AuthGaurdService]},
  {path: 'login', component: LogInComponent},
  {path: 'home/user', component: UserComponent},
  {path: 'home/events', component: EventsComponent, canActivate: [AuthGaurdService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
