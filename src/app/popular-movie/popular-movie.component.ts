import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from 'src/services/sharedService';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-popular-movie',
  templateUrl: './popular-movie.component.html',
  styleUrls: ['./popular-movie.component.scss']
})
export class PopularMovieComponent implements OnInit {

  //TABLE
  
  displayedColumns : string[] = ['id', 'title', 'releasedate', 'averagevote', 'details'];

  dataSource : any;

  // DATA

  movieList : Array<any> = [];
  movieDetails: Array<any> = [];

  id : number;
  title : string;
  release_date : string;
  vote_average: number;
  overview : string;
  poster_path : string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  i:number = 0;


  constructor(public sharedService : SharedService) { }

  ngOnInit(): void {
    this.getServerMoviesTable();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getServerMoviesTable(){
    this.sharedService.getPopularMovies().subscribe(data=>{
      console.log(data, 'SERVER RESPONSE');
      console.log(data.results, 'DATA RESULTS');
      console.log(data.results[0].vote_average, 'AVERAGE VOTE');
      
      console.log(this.movieList, 'DATI MOVIE LIST');

      for(this.i = 0; this.i < data.results.length; this.i++){
          this.movieList.push({ 
          id : data.results[this.i].id, 
          title : data.results[this.i].title, 
          release_date : data.results[this.i].release_date,
          vote_average : data.results[this.i].vote_average
          });
      }

      console.log(this.movieList, 'MOVIE LIST');

      for(this.i = 0; this.i < data.results.length; this.i++){
          this.movieDetails.push({ 
          id : data.results[this.i].id, 
          title : data.results[this.i].title, 
          overview : data.results[this.i].overview,
          poster_path : data.results[this.i].poster_path
          });
      }

      console.log(this.movieDetails, 'MOVIE DETAILS');

      /*TODO
      Inserire Array data.results dentro Array movieList
      */


      this.dataSource = new MatTableDataSource(this.movieList);

      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    })
  }

}

/*
  TODO
  Creare una tabella ordinabile e paginabile
  Passare i dati dell'array nella tabella
  Migliorare la grafica



*/