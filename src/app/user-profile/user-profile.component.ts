import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { DeleteProfileComponent } from '../delete-profile/delete-profile.component';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  user: any = {};  // delcare user variable us object where user data will be stored
  favorites: any = [];
  movies: any[] = [];
  displayed: any[] = [];
  existingFaves: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    ) { }

  ngOnInit(): void {
    this.getThisUser(); // function to fetch user data from FetchApiDatService
    this.getUserFavorites();
  }

  getThisUser(): void {
    let sessionUser = localStorage.getItem('user');
    this.fetchApiData.getUser(sessionUser!).subscribe((response: any) => {
      this.user = response;
      console.log(response);
      this.getMovies();
    });
}

openEditProfileDialog(): void {
  this.dialog.open(EditProfileComponent, {
    height: '400px',
    width: '600px'
  });
}

openDeleteProfileDialog(): void {
  this.dialog.open(DeleteProfileComponent, {
    height: '400px',
    width: '600px'
  });
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

openMovieSynopsisDialog(title: string, description: any, source: string,
  year: number, score: string): void {
  this.dialog.open(MovieDetailsComponent, {
    data: { title, description, source, year, score},
    height: '400px',
    width: '600px',
  });
}

backHome(): void {
  this.router.navigate(['movies'])
}

getUserFavorites(): void {
  this.fetchApiData.getUser(localStorage.getItem('user')).subscribe((res: any) => {
    this.existingFaves = res.FavoriteMovies;
    return this.existingFaves;
    });
}

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
    this.displayed = resp;
    return this.retrieveFaves();
  });
}

retrieveFaves(): void {
    this.displayed.forEach((movie: any) => {
      if (this.existingFaves.includes(movie._id)) {
        this.favorites.push(movie);
      }
    });
  console.log(this.favorites);
  return this.favorites;
}

removeUserFavorite(movieID: string): void {
  this.fetchApiData.deleteFavoriteMovie(movieID).subscribe((response: any) => {
    this.favorites = response;
    this.snackBar.open(`This movie has been removed from your favorites!`, 'OK', {
      duration: 2000,      
    });
    window.location.reload();
    return this.getUserFavorites();
  });
}

  removeFavorite(movieID: string): void {
    this.removeUserFavorite(movieID);
  }

}




