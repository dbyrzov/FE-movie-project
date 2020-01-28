import { Injectable } from '@angular/core';
import { BackendService } from './services/backend.services';

@Injectable()
export class Service {   
    constructor(private backend: BackendService){}

    getAllMovies() {
        return this.backend.get(`/home/movies`);
    }

    getWatchedMovies() {
        return this.backend.get(`/home/movies/watchedList`);
    }

    getWishListMovies() {
        return this.backend.get(`/home/movies/wishList`);
    }

    getWhoWatchTheMovie(title: string) {
        return this.backend.get(`/home/movies/movie/watch?title=${title}`);
    }

    getUserInfo(name: string) {
        return this.backend.get(`/home/user?firstname=${name}`);
    }

    /*******************************************************
     * 
     *     POST REQUESTS GOES HERE
     * 
     ******************************************************/

    addMovieToWishedList(title: string) {
        return this.backend.post(`/home/movies/wishList/add`, title);
    }

    saveMovieComment(title: string, comment: string, date: string) {
        let bodyString = JSON.stringify({ title: title, comment: comment, date: date });
        return this.backend.post(`/home/movies/movie/comment/add`, { title: title, comment: comment, date: date });
    }
}