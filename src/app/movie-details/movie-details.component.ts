import { Component, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movie: any = {};
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {title: string, description: string, source: string,
     year: number, score: string},
    public fetchApiData: FetchApiDataService
    ) {}

  ngOnInit(): void {
  }
}