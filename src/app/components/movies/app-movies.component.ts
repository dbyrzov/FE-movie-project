import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/Movie';
import { DataService } from '../../app-data.service';

@Component({
  selector: 'app-movies',
  templateUrl: './app-movies.component.html',
  styleUrls: ['./app-movies.component.css']
})
export class MoviesComponent implements OnInit{

    movies: Movie[] = [];

    constructor(private data: DataService){}

    ngOnInit() {
        this.data.filteredMovies.subscribe(res => {
            this.movies = res;
        })
    }

    selectMovie(title: string){
        let res = this.data.ALLMOVIES.value.filter((t) => {
            return t.title == title;
        });
        this.data.MOVIE.next(res[0]);
    }
}