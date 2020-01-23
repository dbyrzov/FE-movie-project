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

    /*******************************************************
     * 
     *     POST REQUESTS GOES HERE
     * 
     ******************************************************/

    addMovieToWishedList(title: string) {
        return this.backend.post(`/home/movies/wishList/add`, title);
    }
}