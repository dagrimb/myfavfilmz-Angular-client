import { Component, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-movie-director',
  templateUrl: './movie-director.component.html',
  styleUrls: ['./movie-director.component.scss']
})
export class MovieDirectorComponent implements OnInit {
  movie: any = {};
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {image: any, name: string, birth: number, 
      death: number, bio: string, source: string},
    public fetchApiData: FetchApiDataService
    ) { }


  ngOnInit(): void {
  }
}