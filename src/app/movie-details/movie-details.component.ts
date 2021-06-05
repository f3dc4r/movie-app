import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/services/sharedService';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  id: number;
  title: string;
  overview: string;
  poster_path: string;

  constructor(public sharedService: SharedService) { }

  ngOnInit(): void {
    this.id = this.sharedService.id_movie;
    this.title = this.sharedService.title_movie;
    this.overview = this.sharedService.overview_movie;
    this.poster_path = this.sharedService.poster_path_movie;
  }

  getUrl(){
    return "url('https://image.tmdb.org/t/p/w45/' + this.poster_path)";
  }

}
