/**
 * @module fetch-api-data
 * This file creates a new service to load data from the API by isolating and operating on data
 * The file is able to do so thanks to dependency injection so data is supplied to the different components in the app
 */

import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Declare the api url that will provide data for the client app
*/

const apiUrl = 'https://myfavfilmz.herokuapp.com/';
@Injectable({ // The Injectable decorator, which we use to tell Angular that this service will be available everywhere (from the root on)
  providedIn: 'root'
})

export class FetchApiDataService {

  /**
   * @param http Here we inject the HttpClient module into the constructor params.
   * This will provide HttpClient to the entire class, making it available via this.http
   */

  constructor(private http: HttpClient) { // express HttpClient as dependency and tell Angular to inject it into the class
  }

  /**
   * This function is for making api calls to the user registration endpoint by posting the information that the new user enters into the registration form.
   * The .pipe() method is then used to combine the information that the new user enters with the application's user collection. 
   * The function then returns a new function containing the conjoined entities.
   * @function userRegistration
   * @param userDetails The details that the new user enters into the registration form
   * @returns {object} Response object (i.e. new user object conjoined with the existing user collection array) 
  */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe( 
    catchError(this.handleError)
    );
  }

  /**
   * This function is for making api calls to the user login endpoint by posting the information that the existing user enters into the login form.
   * The .pipe() method is then used to combine that information that existing user enters with the API url.
   * The function then returns a new function containing the conjoined entities.
   * @function userLogin
   * @param userDetails The details that the existing user enters into the login form
   * @returns {object} Response object (i.e. the existing user object conjoined with the API url)
  */
  userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    const { Username, Password } = userDetails;
    return this.http.post(apiUrl + 'login?Username=' + Username + '&Password=' + Password, Headers).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * This function is to retrieve all movies in the movie collection by making api calls to movies endpoint. 
   * The function uses HttpHeaders to create new HTTP header object to be sent along when making API call and token is passed in as a HTTP header since this is protected route.
   * The .pipe() method is used to combine the session user information with the application's movie collection.
   * The function then returns a new function containing the conjoined entities.
   * @function getAllMovies
   * @returns {array} Response array (i.e. the movies collection)
  */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies`, {headers: new HttpHeaders( 
      {
        Authorization: 'Bearer ' + token,  
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

  /**
   * This function is to retrieve one movie in the movie collection by making calls to the movie's title parameter of the movies endpoint.
   * The function uses HttpHeaders to create new HTTP header object to be sent along when making API call and token is passed in as a HTTP header since this is protected route.
   * The .pipe() method is used to combine the session user information with the application's movie collection, filtering collection by a movie's title.
   * The function then returns a new function containing the conjoined entities.
   * @function getOneMovie
   * @param Title The title of the specific movie that the user wishes to retrieve
   * @returns {array} Response array (i.e. an individual movie array from the movies collection array)
  */
  getOneMovie(Title: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/${Title}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }
  
  /**
   * This function is to retrieve a movie's director information by making calls to the director path of the movie's title parameter of the movies endpoint.
   * The function uses HttpHeaders to create new HTTP header object to be sent along when making API call and token is passed in as a HTTP header since this is protected route.
   * The .pipe() method is used to combine the session user information with the application's movie collection, filtering collection by a movie's title and director.
   * The function then returns a new function containing the conjoined entities.
   * @function getDirector
   * @param Title The title of the specific movie that the user wishes to retrieve director information for
   * @returns {object} Response object (i.e. the director object for an individual movie array from the movies collection array)
  */
  getDirector(Title: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/${Title}/Director`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

  /**
   * This function is to retrieve a movie's genre information by making calls to the genre path of the movie's title parameter of the movies endpoint.
   * The function uses HttpHeaders to create new HTTP header object to be sent along when making API call and token is passed in as a HTTP header since this is protected route.
   * The .pipe() method is used to combine the session user information with the application's movie collection, filtering collection by a movie's title and genre.
   * The function then returns a new function containing the conjoined entities.
   * @function getGenre
   * @param Title The title of the specific movie that the user wishes to retrieve genre information for
   * @returns {object} Response object (i.e. the genre object for an individual movie array from the movies collection array)
  */
  getGenre(Title: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/${Title}/Genre`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }
  
  /**
   * This function is to retrieve a particular user's information by making calls to the username parameter of the users endpoint.
   * The function uses HttpHeaders to create new HTTP header object to be sent along when making API call and token is passed in as a HTTP header since this is protected route.
   * The .pipe() method is used to combine the session user information with the application's user collection, filtering the collection by a user's username.
   * The function then returns a new function containing the conjoined entities.
   * @function getUser
   * @param username The username of the specific user that the user wishes to retrieve information for
   * @returns {object} Response object (i.e. the user object for an individual user array from the users collection array)
  */
  public getUser(username: any): Observable<any> {
    const token = localStorage.getItem('token');    
    return this.http.get(apiUrl + `users/${username}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }
  
  /**
   * This function is to retrieve a particular user's favorite movies by making calls to the username parameter of the users endpoint.
   * The function uses HttpHeaders to create new HTTP header object to be sent along when making API call and token is passed in as a HTTP header since this is protected route.
   * The .pipe() method is used to combine the session user information with the application's user collection, filtering the collection by a user's username and favorite movies.
   * The function then returns a new function containing the conjoined entities.
   * @function getFavoriteMovies
   * @param username The username of the specific user that the user wishes to retrieve information for
   * @returns {array} Response array (i.e. the favorite movies array for an individual user array from the users collection array)
  */  
  getFavoriteMovies(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `users/${username}/movies`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }
  
  /**
   * This function is to add a movie array from the movies collection array to a particular user's favorite movies by making calls movies path of the users endpoint, passing in username and movieID as arguments.
   * The function uses HttpHeaders to create new HTTP header object to be sent along when making API call and token is passed in as a HTTP header since this is protected route.
   * The .pipe() method is used to combine the session user information with the application's user collection, filtering the collection by a user's username, favorite movies, and the id of a favorite movie to be added.
   * The function then returns a new function containing the conjoined entities.
   * @function addFavoriteMovie
   * @param username The username of the specific user that wishes to add a favorite movie to their collection
   * @param movieID The id of a movie that the user wishes to be added to their collection
   * @returns {array} Response array (i.e. the id of the movie the user wishes to add conjoined with the API url for a user's favorite movies)
  */
  public addFavoriteMovie(username: string, movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + `users/${username}/movies/${movieID}`, movieID, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

  /**
   * This function is to edit the user object representing an existing user in the users collection array by making calls users endpoint, filtering by the username parameter.
   * The function uses HttpHeaders to create new HTTP header object to be sent along when making API call and token is passed in as a HTTP header since this is protected route.
   * The .pipe() method is used to combine three things: 1) the session user information, 2) the information entered by the user in the edit profile form, and 3) the application's user collection, filtering the collection by the user's username.
   * The function then returns a new function containing the conjoined entities.
   * @function editUser
   * @param updatedInfo The information that the user enters to update their account
   * @returns {object} Response object (i.e. the new user object created when the user updates their information)
  */
  editUser(updatedInfo: any): Observable<any> {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('user');

    return this.http.put(apiUrl + `users/${username}`, updatedInfo, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

  /**
   * This function is to delete a user object representing an existing user in the users collection array by making calls users endpoint, filtering by the username parameter.
   * The function uses HttpHeaders to create new HTTP header object to be sent along when making API call and token is passed in as a HTTP header since this is protected route.
   * The .pipe() method is used to combine the session user information with the application's user collection, filtering the collection by a user's username.
   * The function then returns a new function containing the conjoined entities.
   * @function deleteUser
   * @param username The username of the specific user that the user wishes to delete their account
   * @returns {array} Response object (i.e. the user array with the deleted user object no longer contained)
  */
  deleteUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `users/${username}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

  // Making the api call to delete a particular user's favorite movie
  /**
   * This function is to delete a favorite movies array in the user object that represents an existing user in the users collection array by making calls users endpoint, filtering by the username parameter and the id of the movie to be deleted.
   * The function uses HttpHeaders to create new HTTP header object to be sent along when making API call and token is passed in as a HTTP header since this is protected route.
   * The .pipe() method is used to combine the session user information with the application's user collection, filtering the collection by a user's username and movie id.
   * The function then returns a new function containing the conjoined entities.
   * @function deleteFavoriteMovie
   * @param movieID The id of a movie that the user wishes to be removed from their collection
   * @returns {array} Response array (i.e. the id of the movie the user wishes to remove conjoined with the API url for a user's favorite movies)
   */
  deleteFavoriteMovie(movieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user')
    return this.http.delete(apiUrl + `users/${username}/movies/${movieID}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

    private extractResponseData(res: Response | Object): any { 
      const body = res;
      return body || { };
    }

    /**
     * This function is used for error handling within the above functions.
     * HTTPErrorResponse is an HTTP response that represents an error or failure that gets.
     * @function handleError
     * @param error 
     * @returns error message is returned during or after executing an HTTP request (API call)
     */
    private handleError(error: HttpErrorResponse): any { // 
      if (error.error instanceof ErrorEvent) {
        console.error('Some error occurred:', error.error.message);
      } else {
        console.error(`Error Status code ${error.status}, ` + `Error body is: ${error.error}`);
      }
      return throwError(() => new Error('Something bad happened; please try again later.'));
    }
  }
