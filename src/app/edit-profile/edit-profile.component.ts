/**
 * @module edit-profile
 * This component provides the functionality that allows a user to edit their account (i.e. to edit the user object in the myfavfilmz db that contains their unique information)
 */

import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'; // import for closing dialog on success
import { FetchApiDataService } from '../fetch-api-data.service'; // importing API calls
import { MatSnackBar } from '@angular/material/snack-bar'; // import for displaying notification back to user
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' }; // define component's input/user data
 
/**
 * @param data User data to be manipulated in the compoment and displayed in the template 
 * @param fetchApiData Uses editUser method in FetchApiData service to edit user data
 * @param dialogRef Serves as reference to component that functionality is for
 * @param snackBar Displays notification that account has been updated back to users through a temporary alert
 */
   
  constructor(
    @Inject(MAT_DIALOG_DATA) // Allow Angular Material dialog to be used in EditProfileComponent
    public data: { onSuccess: () => void },
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  /**
   * Edit user information by calling the editUser function housed in the fetchApiData service, passing in the userData state of this component. 
   * Once the function is executed, the Username in the userData is set to the 'user' var in the local storage.
   * The user is then naviatged to the welcome component where they can create a new account.
   * A snackBar then opens with a message that the account has been updated.
   * @function editUserInfo
   * @param response object (to be included in setting the localStorage to "'user'", response.Username)
  */

  editUserInfo():void {
    this.fetchApiData.editUser(this.userData).subscribe((res) => {
      localStorage.setItem('user', res.Username);
      this.snackBar.open('Your account has been updated', 'OK')
      })
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }


}
