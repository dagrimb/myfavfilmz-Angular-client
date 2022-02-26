# MyfavfilmzAngularClient

myfavfilmz is a the client-side of a Single Page Application built on the MEAN stack, using the Angular.js library for a responsive User Interface. The API was for built with Node.js and Express and the database with MongoDB (for more information regarding this side of the application, please visit https://github.com/dagrimb/myfavfilmz-api).

This application exists to allow movie fans the ability to register for an account and create a list of their favorite movies. Users are also able to find out more about these favorite movies, such as details about a movie's genre, director and score on Rotten Tomatoes. The API's endpoints and corresponding structure allows the following user behavior (with HTML component/TypeScript template pairs that can be found in the "src/app" folder in parentheses):
  * Visitors are able to view a welcome message upon visiting the website, with an option to either register or log-in (welcome-page)
  * New users are able to register for a new account with a username, password, email address and birthday (user-registration-form)
  * Existing users are able to log into their accounts with their username and password (user-login-form) to do the following: 
    * Search and View a list of all movies in the movies collection with the ability to add or remove movies to/from their list of favorites from this view (movie-card)
    * Open three distinct dialogs to view the following information:
      * Movie Synopsis Details (movie-detail): A brief synopsis of the movie, what year it was released, and it's rating on Rotten Tomatoes.
      * Movie Director Details (movie-director): A brief bio, birth year, death year (if applicable) of the movie's director
      * Movie Genre Details (movie-genre): A brief description of the movie's genre
    * Navigate to their user profile via a link on the user navigation bar (user-navigation) in order to do the following:
      * View their existing user information (user-profile) as well as the movies the movies in their list of favorites (FaveMovies)
      * Remove movies from their list of favorites (FaveMovies)
      * Edit the afforementioned user information via a form or dialog (edit-profile)
      * Delete their account (delete-profile)

<img src="https://user-images.githubusercontent.com/74441727/155824382-70b0cb4c-b798-46f7-88f4-593543e31cba.png" width=1000>

TECHNOLOGIES USED
* Angular.js: an popular, highly-opinionated, component-based framework for larger projects to be experienced on a range of desktop and mobile applications and devices. This version of the myfavfilmz application was created using the Angular CLI, which is a toolchain with routing ability made available for (in this case of this application) navigating between "welcome," "movies," and "user" routes in the application. For more information on Angular.js framework, please visit: https://angular.io/
  * Angular Material: an Angular-specific UI component library. Much of the interactivity of the application is thanks to Angular Material, from the user registration and login forms to the informative dialogs that accompany each movie to the stylish buttons that open up profile edit and delete dialogs on the user's profile page.
  * TypeScript: created by Microsoft, this is a strongly typed programming language that is a superset of and builds on JavaScript with syntax for types, used to develop JS apps across an entire stack.
  * RxJS: a library used for developing with Angular. It allows events to be executed in such a way that improve the application's performance.
  * Webpack: the build environment that Angular comes with.
 
SETTING UP THE DEVELOPMENT ENVIRONMENT: What you will need

DEPENDENCIES/LIBRARIES NEEDED (Note: This is not an exhaustive list of dependencies. Please refer to the **package.lock.json"** for a detailed list of dependencies in order to re-build the app)

WHAT YOUR **package.json** SHOULD LOOK LIKE

{
  "name": "myfavfilmz-angular-client",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test"
  },
  "private": true,
  "dependencies": {
    "@angular/animations": "~13.1.0",
    "@angular/cdk": "^13.1.1",
    "@angular/common": "~13.1.0",
    "@angular/compiler": "~13.1.0",
    "@angular/core": "~13.1.0",
    "@angular/flex-layout": "^13.0.0-beta.38",
    "@angular/forms": "~13.1.0",
    "@angular/material": "^13.1.1",
    "@angular/platform-browser": "~13.1.0",
    "@angular/platform-browser-dynamic": "~13.1.0",
    "@angular/router": "~13.1.0",
    "rxjs": "~7.4.0",
    "tslib": "^2.3.0",
    "zone.js": "~0.11.4"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "~13.1.2",
    "@angular/cli": "~13.1.2",
    "@angular/compiler-cli": "~13.1.0",
    "@types/jasmine": "~3.10.0",
    "@types/node": "^12.11.1",
    "angular-cli-ghpages": "^1.0.0",
    "jasmine-core": "~3.10.0",
    "karma": "~6.3.0",
    "karma-chrome-launcher": "~3.1.0",
    "karma-coverage": "~2.1.0",
    "karma-jasmine": "~4.0.0",
    "karma-jasmine-html-reporter": "~1.7.0",
    "typedoc": "^0.22.12",
    "typescript": "~4.5.2"
  }
}

DOWNLOADS/INSTALATIONS
* Node Package Manager: **npm install**
* Angular: **npm install -g @angular/cli@latest**
  * See if your computer has Angular downloaded with the following command: **ng --version**. You should see the following upon running this:
 
<img src"https://user-images.githubusercontent.com/74441727/155828107-485c4d83-d20e-4dae-9635-2eaaa4b1365c.png" width=600>

TO RUN THE PROJECT
* Download the project and, in your terminal or CLI, navigate to the main (i.e. **myfavfilmz-Angular-client**) project directory
* Run the client application using the following command: **ng serve**

FURTHER INFORMATION: Documentation
* For more information on this project, please review the documentation by naviating (either via your terminal/CLI or manually to the appropriate folder on your computer), find the "out" folder and open the appropriate .html file in a web browser.

Built By: David Grimberg

