import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-navigation',
  templateUrl: './user-navigation.component.html',
  styleUrls: ['./user-navigation.component.scss']
})
export class UserNavigationComponent implements OnInit {

  constructor(
    public router: Router,
    public snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
  }

  viewProfile(): void {
    this.router.navigate(['user'])
  }

  logoutUser(): void {
    localStorage.clear();
    this.snackBar.open('You have ended your session', 'OK'
    );
    this.router.navigate(['welcome'])
  }


}