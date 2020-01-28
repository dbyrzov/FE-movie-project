import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { TweenMax, Sine } from 'gsap'
import { Router } from '@angular/router';

import { AppComponent } from "../../app.component";
import { UserService } from 'src/app/services/user.service';
import { Body } from '../../models/Body';
import { DataService } from 'src/app/app-data.service';
import { Service } from 'src/app/app.services';
import { Movie } from 'src/app/models/Movie';

@Component({
  selector: 'app-logIn',
  templateUrl: './app-logIn.component.html',
  styleUrls: ['./app-logIn.component.css']
})
export class LogInComponent implements OnInit {

  constructor(
    private user: UserService, 
    private router: Router, 
    private data: DataService, 
    private service: Service){}

  ngOnInit() {
    document.getElementById('navBar').style.display = 'none';
  }

  login() {
    let email = (<HTMLInputElement>document.getElementById('email')).value;
    let pass = (<HTMLInputElement>document.getElementById('password')).value;
    this.submitLogin(email, pass);
  }

  submitLogin(email: string, pass: string) {
     this.handleLogin(email, pass);
  }

  handleLogin(email, pass) {
    this.user.login({email, pass}).subscribe((res : any) => {
      const authenticationToken = res.headers.get('Authorization');
      const userName = res.headers.get('Name');
      const userId = res.headers.get('User_id');
      const isAdmin = res.headers.get('Admin');
      if (authenticationToken) {
        this.user.isLoggedIn.next(true);
        sessionStorage.setItem('user.email', email);
        sessionStorage.setItem('user.pass', pass);
        sessionStorage.setItem('user.name', userName);
        sessionStorage.setItem('user.id', userId);
        sessionStorage.setItem('user.token', authenticationToken);
        this.loadMovieList();
      }

      if (isAdmin == 'ADMIN') {
        this.data.ADMIN.next(true);
      }

    }, (err : any) => {console.log("No token"); console.log(err); this.router.navigate(['/login']);});
  }


  loadMovieList() {
    this.service.getAllMovies().subscribe( ({body}) => {
      console.log("All-movies");
      console.log(body);
      if (body) {
        this.data.ALLMOVIES.next(body);
        this.data.lastMovies.next(body.slice(0, 3));

        this.loadWatchedList();
        this.loadWishList();
        this.router.navigate(['/home']);

      }
    }, (err : any) => {console.error("All movies service failed!"); console.log(err); });
  }

  loadWatchedList() {
    let watchedList = Array<Movie>();
    this.service.getWatchedMovies().subscribe( ({body}) => {
      console.log(body);
      if (body) {
        this.data.ALLMOVIES.value.filter(m => {
          if(body.includes(m.title)){
            watchedList.push(m);
          } 
        });
        this.data.userWatchedList.next(watchedList);
      }
    }, (error : any) => {
      watchedList = []; 
      console.log(error);
    });
  }

  loadWishList() {
    let wishList = Array<Movie>();
    this.service.getWishListMovies().subscribe( ({body}) => {
      console.log(body);
      if (body) {
        this.data.ALLMOVIES.value.filter(m => {
          if(body.includes(m.title)){
            wishList.push(m);
          } 
        });
        this.data.userWishList.next(wishList);
      }
    }, (error : any) => {
      wishList = []; 
      console.log(error);
    });
  }


  showLoginForm(){
    $('#login-button').fadeOut("slow",function(){
      $("#container").fadeIn();
      TweenMax.from("#container", .4, { scale: 0, ease:Sine.easeInOut});
      TweenMax.to("#container", .4, { scale: 1, ease:Sine.easeInOut});
    });
  };
  //$(".close-btn").click(function
  closeBtn(){
    TweenMax.from("#container", .4, { scale: 1, ease:Sine.easeInOut});
    TweenMax.to("#container", .4, { left:"0px", scale: 0, ease:Sine.easeInOut});
    $("#container, #forgotten-container").fadeOut(800, function(){
      $("#login-button").fadeIn(800);
    });
  };
   
  closeSignUpBtn(){
    TweenMax.from("#container", .4, { scale: 1, ease:Sine.easeInOut});
    TweenMax.to("#container", .4, { left:"0px", scale: 0, ease:Sine.easeInOut});
    $("#container, #signup-container").fadeOut(800, function(){
      $("#login-button").fadeIn(800);
    });
  };

  /* Forgotten Password */
  //$('#forgotten').click(function()
   forgottenPass(){
    $("#container").fadeOut(function(){
      $("#forgotten-container").fadeIn();
    });
  };

  showSignupForm(){
    $("#container").fadeOut("slow",function(){
      $("#signup-container").fadeIn();
    });
  };
}