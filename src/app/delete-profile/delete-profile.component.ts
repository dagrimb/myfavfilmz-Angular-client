/**
 * @module delete-profile
 * This component provides the functionality that allows a user to delete their account (i.e. to delete the user object in the myfavfilmz db that contains their unique information)
 */

import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'; // importing API calls
import { MatSnackBar } from '@angular/material/snack-bar'; // import for displaying notification back to user
import { Router } from '@angular/router';

@Component({ // use @Component decorator to tell Angular that the class right below is a component
  selector: 'app-delete-profile',
  templateUrl: './delete-profile.component.html', // defines the custom HTML element
  styleUrls: ['./delete-profile.component.scss']
})
export class DeleteProfileComponent implements OnInit {
  user: any = localStorage.getItem('user'); // assign the user in localStorage to the component's user state

/**
 * @param fetchApiData Uses deleteUser method in FetchApiData service to delete user data
 * @param snackBar Displays notification that account has been deleted back to users through a temporary alert
 * @param router Implements routing to automatically navigate user to moviecard upon login
 */

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  /**
   * Deletes user by calling the deleteUser function housed in the fetchApiData service, passing in the user state of this component. 
   * Once the function is executed, the user information is emptied from the local storage and a snack bar opens, displaying that the account has been deactivated.
   * The user is then naviatged to the welcome component where they can create a new account.
   * @function deleteAccountHolder  
  */

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
