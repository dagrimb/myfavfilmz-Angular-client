/**
 * @module movie-details
 * This component provides data to the MovieDetails template for rendering once the dialog is launched.
 */

import { Component, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'; // importing API calls
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html', // defines the custom HTML element
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movie: any = {}; // declare movie state as an empty object

/**
 * @param data Data structure made available to MovieDetails template to display
 * @param fetchApiData Makes exported fetchApiData class available to this file
 */

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {title: string, description: string, source: string,
     year: number, score: string},
    public fetchApiData: FetchApiDataService
    ) {}

  ngOnInit(): void {
  }
}