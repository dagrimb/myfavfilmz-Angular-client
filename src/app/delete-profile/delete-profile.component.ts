import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-profile',
  templateUrl: './delete-profile.component.html',
  styleUrls: ['./delete-profile.component.scss']
})
export class DeleteProfileComponent implements OnInit {
  user: any = localStorage.getItem('user');

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  deleteAccountHolder(): void {
    this.fetchApiData.deleteUser(this.user).subscribe(() => {
      localStorage.clear();
      this.snackBar.open('Your account has been deactivated', 'OK', { 
        duration: 3000, 
      });
    });
    this.router.navigate(['/welcome']).then(() => {
      window.location.reload();
    });
  }




}
