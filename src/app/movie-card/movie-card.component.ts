import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = []; // declare movies state as array where movies returned are stored
  user: any = localStorage.getItem('user');
  favorites: any[] = [];


  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getUserFavorites();
  }

  openMovieGenreDialog(image: any, name: string, description: string, source: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: { image, name, description, source},
      height: '400px',
      width: '600px'
    });
  }

  openMovieDirectorDialog(image: any, name: string, birth: number, death: number, bio: string, 
  source: string): void {
    this.dialog.open(MovieDirectorComponent, {
      data: { image, name, birth, death, bio, source},
      height: '400px',
      width: '600px'
    });
  }

  openMovieSynopsisDialog(title: string, description: any, source: string, year: number, score: 
  string): void {
    this.dialog.open(MovieDetailsComponent, {
      data: { title, description, source, year, score},
      height: '400px',
      width: '600px',
    });
  }

  // function for fetching movies from FetchApiDataService
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  getUserFavorites(): void {
    this.fetchApiData.getUser(this.user).subscribe((res: any) => {
      this.favorites = res.FavoriteMovies;
      return this.favorites;
      });
  }




  addUserFavorite(movieID: string): void {
    this.fetchApiData.addFavoriteMovie(this.user, movieID).subscribe((response: any) => {
      this.favorites = response;
      this.snackBar.open(`This movie has been added to your favorites!`, 'OK', {
        duration: 2000,      
      });
      return this.getUserFavorites();
    });
  }

  removeUserFavorite(movieID: string): void {
    this.fetchApiData.deleteFavoriteMovie(movieID).subscribe((response: any) => {
      this.favorites = response;
      this.snackBar.open(`This movie has been removed from your favorites!`, 'OK', {
        duration: 2000,      
      });
      return this.getUserFavorites();
    });
  }

  favoriteMovie(movieId: any): any {
    return (this.favorites.includes(movieId) ? true : false)
  }

}