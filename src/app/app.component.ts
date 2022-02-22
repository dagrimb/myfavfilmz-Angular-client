/**
 * This is the root component file, in charge of dynamically changing routes and determining how the application behaves.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

  export class AppComponent {
    title = 'myfavfilmz-Angular-client';
}
