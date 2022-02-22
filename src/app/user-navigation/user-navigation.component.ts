import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; // import for displaying notification back to user

@Component({ // use @Component decorator to tell Angular that the class right below is a component
  selector: 'app-user-navigation',
  templateUrl: './user-navigation.component.html',
  styleUrls: ['./user-navigation.component.scss']
})
export class UserNavigationComponent implements OnInit {

  /**
   * @param router Implements routing to both navigate to user path when clicking link for profile and navigating to welcome path after logout
   * @param snackBar Displays notification to user that they have ended their session upon logging out
   */

  constructor(
    public router: Router,
    public snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
  }

  /**
   * Navigates user to their profile from the homepage when they click a link
   * @function viewProfile
   */
  viewProfile(): void {
    this.router.navigate(['user'])
  }

  /**
   * Clears the local storage of session information, opens a message stating that the sesssion has ended and routes user to welcome page after they log out
   * @function logoutUser
   */
  logoutUser(): void {
    localStorage.clear();
    this.snackBar.open('You have ended your session', 'OK'
    );
    this.router.navigate(['welcome'])
  }


}