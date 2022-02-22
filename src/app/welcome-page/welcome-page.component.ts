/**
 * @module welcome-page
 * This component provides a welcome message with two dialogs--one for logging in and one for registering. 
 */

import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  /**
   * @param dialogRef Serves both as reference to component that functionality is for and for open() to be called on when dialogs need to open
   */

  constructor(public dialog: MatDialog) { }
  ngOnInit(): void {
  }

  /**
   * This is to open the UserRegistrationDialog
   */

  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '25rem'
    });
  }

  /**
   * This is the open the UserLoginDialog
   */

  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '25rem'
    });
  }
}
