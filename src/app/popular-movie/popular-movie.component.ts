import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from 'src/services/sharedService';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
  selector: 'app-popular-movie',
  templateUrl: './popular-movie.component.html',
  styleUrls: ['./popular-movie.component.scss'],
})
export class PopularMovieComponent implements OnInit {
  //TABLE

  displayedColumns: string[] = ['id', 'title', 'release_date', 'vote_average'];

  dataSource: any;

  // DATA

  movieList: Array<any> = [];

  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  overview: string;
  poster_path: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  i: number = 0;

  constructor(public sharedService: SharedService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getServerMoviesTable();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getServerMoviesTable() {
    this.sharedService.getPopularMovies().subscribe((data) => {
      console.log(data, 'SERVER RESPONSE');
      console.log(data.results, 'DATA RESULTS');
      console.log(data.results[0].vote_average, 'AVERAGE VOTE');

      console.log(this.movieList, 'DATI MOVIE LIST');

      for (this.i = 0; this.i < data.results.length; this.i++) {
        this.movieList.push({
          id: data.results[this.i].id,
          title: data.results[this.i].title,
          release_date: data.results[this.i].release_date,
          vote_average: data.results[this.i].vote_average,
          overview: data.results[this.i].overview,
          poster_path: data.results[this.i].poster_path,
        });
      }

      console.log(this.movieList, 'MOVIE LIST');

      this.dataSource = new MatTableDataSource(this.movieList);

      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }

  onRowClicked(row) {
    console.log('Row clicked:', row);
    this.sharedService.id_movie = row.id;
    this.sharedService.title_movie = row.title;
    this.sharedService.overview_movie = row.overview;
    this.sharedService.poster_path_movie = row.poster_path;
    this.openDialog();
  }
  openDialog() {
    const dialogRef = this.dialog.open(MovieDetailsComponent, {
      height: '650px',
      width: '300px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

/*
  TODO
  Creare una tabella ordinabile e paginabile
  Passare i dati dell'array nella tabella
  Migliorare la grafica



*/
