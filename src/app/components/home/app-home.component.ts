import { Component, OnInit, AfterViewInit, Input, ViewChildren } from '@angular/core';

import { Movie } from "../../models/Movie";
import { Service } from 'src/app/app.services';
import { DataService } from 'src/app/app-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './app-home.component.html',
  styleUrls: ['./app-home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit{

  lastThMovies: Movie[] = [];
  sliderNum: number = 0;

  @ViewChildren('allTheseThings') things: any;

  constructor(private service: Service, private data: DataService) {}

  ngOnInit() {
    console.log("Mirtko");
    document.getElementById('navBar').style.display = 'inline-block';

    this.data.lastMovies.subscribe( res => {
      this.lastThMovies = res;
    });
  }

  ngAfterViewInit() {
    // this.things.changes.subscribe(t => {
    //   this.displaySlider();
    // })
    this.displaySlider();
  }

  displaySlider() {
    let slides = document.querySelectorAll('.mySlides');
    let dots = document.querySelectorAll('.dot');

    for (let i = 0; i < slides.length; i++) {
      if (i == this.sliderNum) {
        slides[i].classList.remove('hideSlide');
      } else {
        slides[i].classList.add('hideSlide');
      }
    }

    for (let i = 0; i < dots.length; i++) {
      if (i == this.sliderNum) {
        dots[i].classList.add('dotColor');
      } else {
        dots[i].classList.remove('dotColor');
      }
    }
  }

  plusSlides(side: number) {
    this.sliderNum += side;
    if (this.sliderNum < 0) this.sliderNum = 0;
    if (this.sliderNum > 2) this.sliderNum = 2;
    this.displaySlider();
  }

  currentSlide(slide: number) {
    this.sliderNum = slide;
    this.displaySlider();
  }
}