import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

const urlMovieDatabase = "https://api.themoviedb.org/3/movie/popular?api_key=97fee746e6b08ee771ca85ac015d8470&language=en-EN&page=1";

@Injectable({
    providedIn: 'root'
})

export class SharedService{

    id_movie : number;
    title_movie : string;
    overview_movie : string;
    poster_path_movie : string;

    constructor(private http : HttpClient){}

    getPopularMovies():Observable<any>{
        return this.http.get(urlMovieDatabase);
    }

}