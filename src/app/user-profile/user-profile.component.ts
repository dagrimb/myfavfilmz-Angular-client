import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { DeleteProfileComponent } from '../delete-profile/delete-profile.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  user: any = localStorage.getItem('user');  // delcare user variable us object where user data will be stored
  favorites: any = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
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
    }
  )
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


getUserFavorites(): void {
  let faves: any [] = [];
  this.fetchApiData.getAllMovies().subscribe((response: any) => {
    faves = response;
    faves.forEach((fave: any) => {
      if (this.user.FavoriteMovies.includes(fave._id)) {
        this.favorites.push(fave);
      }
    });
  });
  console.log(this.favorites);
  return this.favorites;
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



}
