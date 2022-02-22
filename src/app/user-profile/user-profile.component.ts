/**
 * @module user-profile
 * This component loads and displays all user information after a user navigates from the homepage to that component. 
 * It provides the functionality for users to view dialogs for a user's information edit and profile delete dialogs. 
 * It also displays movie cards for the user's favorite movies, as well as informative dialogs and the ability to remove a movie from the list of favorites.
 */

import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'; // importing API calls
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { DeleteProfileComponent } from '../delete-profile/delete-profile.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MatSnackBar } from '@angular/material/snack-bar'; // import for displaying notification back to user


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html', // defines the custom HTML element
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  user: any = {};  // delcare user state as object where user data will be stored
  favorites: any = []; // declare favorites state as array where movie objects will be stored
  movies: any[] = []; // declare movies state as array where movie objects will be stored
  displayed: any[] = []; 
  existingFaves: any[] = [];

  /**
   * @param fetchApiData Uses various method in FetchApiData service to retrieve or perform operations on data
   * @param router Implements routing to both navigate movies path when user clicks back button
   * @param dialogRef Serves both as reference to component that functionality is for and for open() to be called on when dialogs need to open
   * @param snackBar Displays notification to user movie has been removed from their favorites
   */

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    ) { }

  ngOnInit(): void { // These function are called when the component loads
    this.getThisUser(); 
    this.getUserFavorites();
  }

  /**
   * Retrieves user object by calling the getUser function housed in the fetchApiData service, passing the user information that exists in localStorage. 
   * The response object is then assigned to the user state object and the getMovies function is called, ensuring that information about all movies is available once authentication is successful.
   * @function getThisUser
   * @param fetchApiData Uses getUser method in FetchApiData service to retrieve user data
   * @param response object (i.e. user object, obtained from local storage and assigned to component's user state)
  */
  getThisUser(): void {
    let sessionUser = localStorage.getItem('user');
    this.fetchApiData.getUser(sessionUser!).subscribe((res: any) => {
      this.user = res;
      console.log(res);
      this.getMovies();
    });
  }

  /**
   * This is to open the EditProfileDialog
   * @function openEditProfileDialog
   */
    openEditProfileDialog(): void {
      this.dialog.open(EditProfileComponent, {
        height: '26rem',
        width: '39rem'
      });
    }

  /**
   * This is to open the DeleteProfileDialog
   * @function openDeleteProfileDialog
   */
  openDeleteProfileDialog(): void {
    this.dialog.open(DeleteProfileComponent, {
      height: '26rem',
      width: '39rem'
    });
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
openMovieSynopsisDialog(title: string, description: any, source: string,
  year: number, score: string): void {
  this.dialog.open(MovieDetailsComponent, {
    data: { title, description, source, year, score},
    height: '400px',
    width: '600px',
  });
}

/**
 * This provides the functionality for user to navigate back to the movies route when they click a back button from their user profile
 * @function backHome
*/
backHome(): void {
  this.router.navigate(['movies'])
}

/**
 * Retrieves favorites array in the user object by getting the user from the local storage and accessing its FavoriteMovies property via dot notation
 * @function getUserFavorites
 * @param fetchApiData Uses getUser method in FetchApiData service to retrieve user data
 * @param response object (user object, obtained from local storage, has its FavoriteMovies properties set to the existingFaves state of this component)
 * @returns user's FavoriteMovies object
*/
getUserFavorites(): void {
  this.fetchApiData.getUser(localStorage.getItem('user')).subscribe((res: any) => {
    this.existingFaves = res.FavoriteMovies;
    return this.existingFaves;
    });
}

/**  
 * Retrieves movies collection array by using the getAllMovies function from fetchApiDataService and assigning the response object to the movies state of this component.
 * @function getMovies
 * @param fetchApiData Uses getAllMovies method in FetchApiData service to retrieve data for all movies
 * @param response array (movies array, which is then set to the "displayed" state of the component)
 * @returns favorite movies to be displayed if getMovies is called
*/
getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((res: any) => {
    this.displayed = res;
    return this.retrieveFaves();
  });
}

/**
 * Retrieves user's current favorite movies by examining each displayed movie, checking to see if it is in the list of the user's existing favorite movies (by movieID) and, if so, adding it to the favorites array.
 * @function retrieveFaves
 * @param movie object (for each movie object that exists, if its id is in the existingFaves array, it is to be added to the list of favorites to be displayed in the user's profile) 
 * @returns users FavoriteMovies object if movie is already included in it
 */

retrieveFaves(): void {
    this.displayed.forEach((movie: any) => {
      if (this.existingFaves.includes(movie._id)) {
        this.favorites.push(movie);
      }
    });
  console.log(this.favorites);
  return this.favorites;
}

/**
  * Deletes user favorite by calling the deleteFavoriteMovie function housed in the fetchApiData service, passing in the id of the movie to be deleted. 
  * Once the function is executed, the response object is assigned to the "favorites" state of this component.
  * A snack bar then opens with a message stating that the movie is been removed from the user's favorites.
  * @function removeUserFavorites
  * @param fetchApiData Uses deleteFavoriteMovie method in FetchApiData service to delete data of a particular movie in a user's favorites from that array
  * @returns user's new favorite movies object when a movie is removed from the object
*/
removeUserFavorite(movieID: string): void {
  this.fetchApiData.deleteFavoriteMovie(movieID).subscribe((res: any) => {
    this.favorites = res;
    this.snackBar.open(`This movie has been removed from your favorites!`, 'OK', {
      duration: 2000,      
    });
    window.location.reload();
    return this.getUserFavorites();
  });
}

/**
 * Function necessary for the remove of a favorite from the user's favorite movie collection after the click of the icon
 * @function removeFavorite
 * @param movieID MovieID passed into the removeUserFavorite function called in this function
 */
  removeFavorite(movieID: string): void {
    this.removeUserFavorite(movieID);
  }

}




