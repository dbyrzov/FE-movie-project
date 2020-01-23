import { Component, OnInit } from '@angular/core';

import { DataService } from './app-data.service';
import { UserService } from './services/user.service';
import { Movie } from './models/Movie';
import { BackendService } from './services/backend.services';
import { Service } from './app.services';
import { AuthGaurdService } from './services/auth.guard.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService, BackendService, Service]
})
export class AppComponent implements OnInit {

  constructor(private username: UserService, private data: DataService, private service: Service, private router: Router) {}

  ngOnInit(){
    console.log('Mirtko');
  }

  allMovies(){
    this.data.filteredMovies.next(this.data.ALLMOVIES.value);
    this.router.navigate(['/home/movies']);
  }

  watchedMovies(){
    this.data.filteredMovies.next(this.data.userWatchedList.value);
    this.router.navigate(['/home/movies/watchedList']);
  }

  wishListMovies(){
    this.data.filteredMovies.next(this.data.userWishList.value);
    this.router.navigate(['/home/movies/wishList']);
  }
}
