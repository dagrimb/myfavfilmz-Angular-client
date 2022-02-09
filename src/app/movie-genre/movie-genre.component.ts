import { Component, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-movie-genre',
  templateUrl: './movie-genre.component.html',
  styleUrls: ['./movie-genre.component.scss']
})
export class MovieGenreComponent implements OnInit {
  movie: any = {};
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {image: any, name: string, description: string, source: string},
    public fetchApiData: FetchApiDataService
    ) {}

  ngOnInit(): void {
  }
  
}
