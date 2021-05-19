import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/services/sharedService';

@Component({
  selector: 'app-popular-movie',
  templateUrl: './popular-movie.component.html',
  styleUrls: ['./popular-movie.component.scss']
})
export class PopularMovieComponent implements OnInit {

  moviesList : any;

  constructor(public sharedService : SharedService) { }

  ngOnInit(): void {
    this.getServerMovies();
  }

  getServerMovies(){
    this.sharedService.getPopularMovies().subscribe(data=>{
      console.log(data, 'SERVER RESPONSE');
      this.moviesList = data;
    })
  }

}

/*
  TODO
  Creare una tabella ordinabile e paginabile
  Passare i dati dell'array nella tabella
  Migliorare la grafica



*/