import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  user: any = localStorage.getItem('user');  // delcare user variable us object where user data will be stored
  
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router
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

}
