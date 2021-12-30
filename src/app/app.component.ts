import { Component } from '@angular/core';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
  export class AppComponent {
    title = 'myfavfilmz-Angular-client';

    constructor(public dialog: MatDialog) { } // pass Angular Material dialog in the constructor as an argument so its available to component
  // This is the function that will open the dialog when the signup button is clicked
  openUserRegistrationDialog(): void { 
    this.dialog.open(UserRegistrationFormComponent, {
    // Assign the dialog a width
    width: '280px'
    });
  }
}
