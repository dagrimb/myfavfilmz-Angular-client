import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { DeleteProfileComponent } from '../delete-profile/delete-profile.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  user: any = localStorage.getItem('user');  // delcare user variable us object where user data will be stored
  
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.getThisUser(); // function to fetch user data from FetchApiDatService
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


}
