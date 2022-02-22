/**
 * @module user-registration
 * This component provides the functionality for a new user to register. 
*/

import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'; // import for closing dialog on success
import { FetchApiDataService } from '../fetch-api-data.service'; // importing API calls
import { MatSnackBar } from '@angular/material/snack-bar'; // import for displaying notification back to user

@Component({ // use @Component decorator to tell Angular that the class right below is a component
  selector: 'app-user-registration-form', 
  templateUrl: './user-registration-form.component.html', // defines the custom HTML element
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' }; // define component's input/user data

  /**
   * @param fetchApiData Uses userRegistration method in FetchApiData service to post new user data
   * @param dialogRef Serves both as reference to component that functionality is for and for close() to be called on when dialog need to close
   * @param snackBar Displays notification to user that they either have registered successfully
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
  }

/**
 * Registers new user by calling the registerUser function housed in the fetchApiData service, passing in the userData state of this component. 
 * The dialog then closes and a snack bar with a message that the registration was either successful or something when wrong appears temporarily. 
 * @function registerUser
 * @param fetchApiData Uses userRegistration method in FetchApiData service to post new user data to user array
 * @param response object (the new user object from the components userData state)
*/

  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((res) => { // pass userData object into API call
      // Logic for a successful user registration goes here! (To be implemented)
      this.dialogRef.close(); // This will close the modal on success!
      console.log(res);
      this.snackBar.open('user registered successfully', 'OK', {
        duration: 2000
      });
    }, (res) => {
      console.log(res);
      this.snackBar.open(res, 'OK', {
        duration: 2000
      });
    });
  }
}