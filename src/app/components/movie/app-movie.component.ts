import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Movie } from 'src/app/models/Movie';
import { DataService } from '../../app-data.service';
import { Service } from 'src/app/app.services';

@Component({
  selector: 'app-movie',
  templateUrl: './app-movie.component.html',
  styleUrls: ['./app-movie.component.css']
})



export class MovieComponent implements OnInit, AfterViewInit {
  public movie: Movie;
  private stars: any;
  usersWatched: Array<string>;
  
  constructor(private data: DataService, private service: Service){}

  ngOnInit() {
    this.data.MOVIE.subscribe(res => {
      this.movie = res;
      console.log("mirtki");
    });

    this.service.getWhoWatchTheMovie(this.movie.title).subscribe( (res : any) => {
      if (res) {
        this.usersWatched = res;
      }
    }, (err : any) => { console.log(err); });
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
    console.log(`Rating for <${this.movie.title}> changed: ${this.movie.rating}`)
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


}