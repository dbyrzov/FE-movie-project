import { Component, OnInit, AfterViewInit } from '@angular/core';

import { Movie } from 'src/app/models/Movie';
import { DataService } from '../../app-data.service';
import { Service } from 'src/app/app.services';
import { MovieComment } from 'src/app/models/MovieComment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './app-movie.component.html',
  styleUrls: ['./app-movie.component.css']
})



export class MovieComponent implements OnInit, AfterViewInit {
  public movie: Movie;
  private stars: any;
  admin: boolean;
  usersWatched: Array<string>;
  loggedUserName: string;
  
  constructor(private data: DataService, private service: Service, private router: Router){}

  ngOnInit() {
    this.data.MOVIE.subscribe(res => {
      this.movie = res;
      console.log("mirtki");
      console.log(this.movie);
    });

    this.service.getWhoWatchTheMovie(this.movie.title).subscribe( ({body}) => {
      if (body) {
        this.usersWatched = body;
      }
    }, (err : any) => { console.log(err); });

    this.data.ADMIN.subscribe( res => {console.log(res); this.admin = res; console.log(this.admin)} );
    this.loggedUserName = sessionStorage.getItem('user.name');
  }

  ngAfterViewInit() {
    this.init();
  }

  markStarsByRating() {
    for (let j = 0; j < this.stars.length; j++) {
      if (j <= this.movie.rating - 1) {
        this.stars[j].setAttribute('id', 'mark-star');
      } else {
        this.stars[j].removeAttribute('id');
      }
    }
    console.log(`Rating for <${this.movie.title}> changed: ${this.movie.rating}`);
  }

  init() {
    this.stars = document.querySelectorAll('.rating div');
    for (let i = 0; i < this.stars.length; i++) {
      this.stars[i].setAttribute('data-count', i);
      this.stars[i].id = `${i}`;
      this.stars[i].addEventListener('mouseenter', this.enterStarListener.bind(this));
      
      this.stars[i].addEventListener('click', () => {
        this.movie.rating = i + 1;
        // TODO: UPDATE RATING FOR MOVIE IN DB 
        this.stars = document.querySelectorAll('.rating div');
        this.markStarsByRating();
      });
    }
    document.querySelector('.rating').addEventListener('mouseleave', this.leaveStarListener.bind(this));
    this.markStarsByRating();
  };

  enterStarListener(e) {
    this.fillStarsUpToElement(e.target);
  };

  leaveStarListener() {
    this.fillStarsUpToElement(null);
  };

  fillStarsUpToElement(el) {
    for (let i = 0; i < this.stars.length; i++) {
      if (el == null || this.stars[i].getAttribute('data-count') > el.getAttribute('data-count')) {
        this.stars[i].classList.remove('hover');
      } else {
        this.stars[i].classList.add('hover');
      }
    } 
  };

  addToWishList(e) {
    e.target.classList.add('wished-movie');
    console.log(this.movie.title);
    this.service.addMovieToWishedList(this.movie.title).subscribe( (res : any) => {
        alert("Successfully added to wishlist!");
    }, (err : any) => { alert("Cannot add to wishlist!"); });
  }

  addMovieComment() {
    let user = (<HTMLTextAreaElement>document.getElementById('name')).value;
    let comment = (<HTMLTextAreaElement>document.getElementById('comment')).value;
    console.log(`User: ${user} comment: ${comment}`);
    let d = new Date();
    let day = d.getDate();
    let month = d.getMonth();
    let year = d.getFullYear();
    let curDate = day + '/' + month + '/' + year;


    this.service.saveMovieComment(this.movie.title, comment, curDate).subscribe( (res : any) => {
      let m: Movie;
      var c: MovieComment = {name: user, comment: comment, date: curDate};

      m = this.movie;
      m.comments.push(c);
      this.data.MOVIE.next(m);

      console.log('DONE!');
    });
  }


  gotoUserProfile(userName: string) {
      this.service.getUserInfo(userName).subscribe( (res : any) => {
        if (res) {
          this.data.USER.next(res);
          this.router.navigate(['home/user'])
        }
      });
  }
}