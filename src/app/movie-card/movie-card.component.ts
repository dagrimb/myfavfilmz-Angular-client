/**
 * @module movie-card
 * This component loads and displays all movies after a user successfully logs in. 
 * It provides the functionality for users to view dialogs for a movie's synopsis, director and genre. 
 * It identifies which movies in the collection are part of the user's favorite movies list and gives users the option to add and remove movies from that list.
 */

import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'; // importing API calls
import { MatDialog } from '@angular/material/dialog';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MatSnackBar } from '@angular/material/snack-bar'; // import for displaying notification back to user


@Component({ // use @Component decorator to tell Angular that the class right below is a component
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html', // defines the custom HTML element
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = []; // declare movies state as array where movies returned are stored
  user: any = localStorage.getItem('user'); // declare user state as user in the localStorage
  favorites: any[] = []; // declare favorites state as an array of movie

  /**
   * @param dialog Provides dialog object to be used in the three dialogs the moviecard template provides click functions for
   * @param fetchApiData Uses various method in FetchApiData service to retrieve or perform operations on data
   * @param snackBar Displays notification that movie has either been added to or removed from a user's list of favorite movies
   */

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
    ) { }

  ngOnInit(): void { // These function are called when the component loads
    this.getMovies();
    this.getUserFavorites();
  }

  /**
   * This is to open MovieGenreDialog
   * @param image descriptive of specific movie genre
   * @param name of genre
   * @param description of genre
   * @param source online where movie genre's description can be found
   */

  openMovieGenreDialog(image: any, name: string, description: string, source: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: { image, name, description, source},
      height: '400px',
      width: '600px'
    });
  }

/**
 * The is to open the MovieDirectorDialog
 * @param image of the director
 * @param name of the director
 * @param birth year of the director
 * @param death year of the director
 * @param bio of the director
 * @param source online where director's bio can be found
 */

  openMovieDirectorDialog(image: any, name: string, birth: number, death: number, bio: string, 
  source: string): void {
    this.dialog.open(MovieDirectorComponent, {
      data: { image, name, birth, death, bio, source},
      height: '400px',
      width: '600px'
    });
  }

/**
 * This is to open the MovieSynopsisDialog
 * @param title of the movie
 * @param description of the movie
 * @param source online where movie description can be found
 * @param year the movie was released
 * @param score on Rotten Tomatoes
 */

  openMovieSynopsisDialog(title: string, description: any, source: string, year: number, score: 
  string): void {
    this.dialog.open(MovieDetailsComponent, {
      data: { title, description, source, year, score},
      height: '400px',
      width: '600px',
    });
  }

/**
 * Retrieves movies collection array by using the getAllMovies function from fetchApiDataService and assigning the response object to the movies state of this component.
 * @function getMovies
 * @param fetchApiData Uses getAllMovies() method in FetchApiData service to retrieve all movie-related data
 * @param response array (to be assigned to movies state of MovieCard component)
 * @returns movies array
 */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Retrieves favorites array in the user object by using the getUser function from fetchApiData service to get the user state object.
   * The objects FavoriteMovies property is accessed via dot notation and assigned to "favorites" state object of this component.
   * @function getUserFavorites
   * @param fetchApiData Uses getUserFavorites() method in FetchApiData service to retrieve all user-related data
   * @param response object (will call FavoriteMovies property with dot notation and assign to component's favorites state)
   * @returns FavoriteMovies object
  */
  getUserFavorites(): void {
    this.fetchApiData.getUser(this.user).subscribe((res: any) => {
      this.favorites = res.FavoriteMovies;
      return this.favorites;
    });
  }

  /**
   * Posts new favorite movie to the user object's FavoriteMovies array using the addFavoriteMovie function in the fetchApiData service, passing in the user state object and id of the movie being added as arguments.
   * Once executed, the response object is assigned to the "favorites" state of this component and a snack bar is opened with a message that the movie has been added to the user's favorites.
   * @function addUserFavorites
   * @param fetchApiData Uses addFavoriteMovie() method in FetchApiData service to post data about a movie to a user's existing FavoriteMovies array
   * @param response object (will add the object tied to the movieID to the user's FavoriteMovie array)
   * @returns FavoriteMovies object upon new movie being added to array
  */
  addUserFavorite(movieID: string): void {
    this.fetchApiData.addFavoriteMovie(this.user, movieID).subscribe((res: any) => {
      this.favorites = res;
      this.snackBar.open(`This movie has been added to your favorites!`, 'OK', {
        duration: 2000,      
      });
      return this.getUserFavorites();
    });
  }

  /**
   * Deletes user favorite by calling the deleteFavoriteMovie function housed in the fetchApiData service, passing in the id of the movie to be deleted. 
   * Once the function is executed, the response object is assigned to the "favorites" state of this component.
   * A snack bar then opens with a message stating that the movie is been removed from the user's favorites.
   * @function removeUserFavorite
   * @param fetchApiData Uses deleteFavoriteMovie() method in FetchApiData service to delete data about a movie from a user's existing FavoriteMovies array
   * @param response object (will remove the object tied to the movieID from the user's FavoriteMovie array)
   * @returns FavoriteMovies object upon new movie being removed from array
  */
  removeUserFavorite(movieID: string): void {
    this.fetchApiData.deleteFavoriteMovie(movieID).subscribe((res: any) => {
      this.favorites = res;
      this.snackBar.open(`This movie has been removed from your favorites!`, 'OK', {
        duration: 2000,      
      });
      return this.getUserFavorites();
    });
  }

  /**
  * This is function is used in the movie-card template when to designate when a movie is favorited or not
  * @function favoriteMovie
  * @params movieId: the id the movie is passed through to be used when the includes method is called on the favorites array to determine if that id is in that array
  * @returns true or false based on whether favorites object includes a particular movieID
  */

  favoriteMovie(movieId: any): any {
    return (this.favorites.includes(movieId) ? true : false)
  }

}