/**
 * @module user-login
 * This component provides the functionality for an existing user to login-in to a session. 
 */

import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'; // import for closing dialog on success
import { FetchApiDataService } from '../fetch-api-data.service'; // importing API calls
import { MatSnackBar } from '@angular/material/snack-bar'; // import for displaying notification back to user
import { Router } from '@angular/router';

@Component({ // use @Component decorator to tell Angular that the class right below is a component
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html', // defines the custom HTML element
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' }; // @Input decorator defines component's input

  /**
   * @param fetchApiData Uses userLogin method in FetchApiData service to post user data
   * @param dialogRef Serves both as reference to component that functionality is for and for close() to be called on when dialog needs to close
   * @param snackBar Displays notification to user that they either have been logged in successfully or that something went wrong
   * @param router Implements routing to automatically navigate user to moviecard upon login
   */

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

/**
 * Logs-in user by calling the loginUser function housed in the fetchApiData service, passing in the userData state of this component. 
 * Once the function is executed, 'user' var is set username in the user of the res object and 'token' is set to the token in the res object in localStorage
 * The dialog closes on success and a snack bar opens that tells the user that they have successfully logged in or that something has gone wrong.
 * The user is then automatically navigated to the movies path
 * @function deleteAccountHolder
 * @param response object (contains user's username and system-generated token to be assigned set to localStorage as 'user' and 'token' respectively)
 */

// Send login info to backend
loginUser(): void {
  this.fetchApiData.userLogin(this.userData).subscribe((res) => {
    // Logic for a successful user login   
    localStorage.setItem('user', res.user.Username);
    localStorage.setItem('token', res.token);
    this.dialogRef.close(); // close modal on success
    console.log(res);
    this.snackBar.open('You have successfully logged in', 'OK', {
      duration: 2000,
    });
    this.router.navigate(['movies']);
  }, (response) => {
    console.log(response);
    this.snackBar.open(response, 'OK', {
      duration: 2000
    });
  });
}

}