/**
 * @module movie-genre
 * This component provides data to the MovieGenre template for rendering once the dialog is launched.
 */

import { Component, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'; // importing API calls
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-movie-genre',
  templateUrl: './movie-genre.component.html', // defines the custom HTML element
  styleUrls: ['./movie-genre.component.scss']
})
export class MovieGenreComponent implements OnInit {
  movie: any = {}; // declare movie state as an empty object

  /**
   * 
   * @param data Data structure made available to MovieGenre template to display
   * @param fetchApiData Makes exported fetchApiData class available to this file
   */

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {image: any, name: string, description: string, source: string},
    public fetchApiData: FetchApiDataService
    ) {}

  ngOnInit(): void {
  }
  
}
