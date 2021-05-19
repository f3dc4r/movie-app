import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

const urlMovieDatabase = "https://api.themoviedb.org/3/movie/popular?api_key=97fee746e6b08ee771ca85ac015d8470&language=it-IT&page=1";

@Injectable({
    providedIn: 'root'
})

export class SharedService{

    constructor(private http : HttpClient){}

    getPopularMovies():Observable<any>{
        return this.http.get(urlMovieDatabase);
    }

}