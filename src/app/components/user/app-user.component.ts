import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/Movie';
import { Event } from "../../models/Event";
import { DataService } from 'src/app/app-data.service';


@Component({
  selector: 'app-user',
  templateUrl: './app-user.component.html',
  styleUrls: ['./app-user.component.css']
})
export class UserComponent implements OnInit {
    render: boolean = false;
    userMovies: Movie[] = [
        {
            category: "romance",
            actors: ["Mitko","Burzov","Mihaela","koko"],
            director: "Mitko",
            music: "jo",
            title: "Maleficent",
            dateOfCreation: "10/3/2020",
            studio: "o",
            description: "s",
            rating: 2.5,
            poster: "https://picsum.photos/350/250?image=444",
            trailer: "https://www.youtube.com/embed/n0OFH4xpPr4",
            duration: 2,
            country: "bg",
            imdbRating: 2,
            language: "bg",
            countryOfShooting: "bg",
            mainActors: ["1","2","3","4"],
            awards: ["a","b","c","d"]
        },
        {
            category: "horror",
            actors: ["zuzu","bubu","mimi","koko"],
            director: "Mitko",
            music: "jo",
            title: "Homealone",
            dateOfCreation: "10/3/2020",
            studio: "o",
            description: "s",
            rating: 4.5,
            poster: "https://images.fandango.com/ImageRenderer/400/0/redesign/static/img/default_poster.png/0/images/masterrepository/fandango/218843/Maleficent25d48787443c8d.jpg",
            trailer: "https://www.youtube.com/embed/n0OFH4xpPr4",
            duration: 2,
            country: "bg",
            imdbRating: 2,
            language: "bg",
            countryOfShooting: "bg",
            mainActors: ["1","2","3","4"],
            awards: ["a","b","c","d"]
        },
        {
            category: "асс",
            actors: ["zuzu","bubu","mimi","koko"],
            director: "Mitko",
            music: "jo",
            title: "Hulk",
            dateOfCreation: "10/3/2020",
            studio: "o",
            description: "s",
            rating: 3.7,
            poster: "https://static.posters.cz/image/750/%D0%BF%D0%BB%D0%B0%D0%BA%D0%B0%D1%82/hulk-roar-i3313.jpg",
            trailer: "https://www.youtube.com/embed/n0OFH4xpPr4",
            duration: 2,
            country: "bg",
            imdbRating: 2,
            language: "bg",
            countryOfShooting: "bg",
            mainActors: ["1","2","3","4"],
            awards: ["a","b","c","d"]
        },
        {
            category: "horror",
            actors: ["zuzu","bubu","mimi","koko"],
            director: "Mitko",
            music: "jo",
            title: "StarWars",
            dateOfCreation: "10/3/2020",
            studio: "o",
            description: "s",
            rating: 5.0,
            poster: "https://static.posters.cz/image/750/%D0%BF%D0%BB%D0%B0%D0%BA%D0%B0%D1%82/star-wars-the-last-jedi-one-sheet-i51532.jpg",
            trailer: "https://www.youtube.com/embed/n0OFH4xpPr4",
            duration: 2,
            country: "bg",
            imdbRating: 2,
            language: "bg",
            countryOfShooting: "bg",
            mainActors: ["1","2","3","4"],
            awards: ["a","b","c","d"]
        }
    ];

    events: Event[] = [
        {
            name: "Sreshta s mitko",
            date: "10.03.2020",
            place: "Stolicata"
        },
        {
            name: "Go to work",
            date: "10.03.2020",
            place: "Business park"
        }
    ];

    constructor(private data: DataService){}

    ngOnInit() {

    }

    mouseEnter(card: HTMLElement, bar: HTMLElement, rate: number) {
        console.log(bar);
        bar.style.width = (rate * ((card.offsetWidth*0.9) / 5)) + 'px';
    }

    mouseLeave(bar: HTMLElement) {
        bar.style.width = 0 + 'px';
    }

    deleteMovie(movie: string) {
        let newList = this.userMovies.filter(m => {return m.title != movie; });
        this.userMovies = newList;
    }

    selectMovie(title: string) {
        let res = this.data.ALLMOVIES.value.filter((t) => {
            return t.title == title;
        });
        console.log(res[0]);
        console.log(this.data.MOVIE);

        this.data.MOVIE.next(res[0]);
    }

}