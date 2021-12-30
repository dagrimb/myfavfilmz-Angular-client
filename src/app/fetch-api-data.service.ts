import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//

// Declare the api url that will provide data for the client app
const apiUrl = 'https://myfavfilmz.herokuapp.com/';
@Injectable({ // The Injectable decorator, which we use to tell Angular that this service will be available everywhere (from the root on)
  providedIn: 'root'
})

export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { // express HttpClient as dependency and tell Angular to inject it into the class
  }

  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> { // type: any; the userDetails are what is posted to the API endpoint.
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe( // post userDetails to the API endpoint and return API's response. We use
    // .pipe() to combine multiple functions into a single function and will return a new function that runs the conjoined functions.
    catchError(this.handleError)
    );
  }

  // Making the api call for the user login endpoint
  userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    const { Username, Password } = userDetails;
    return this.http.post(apiUrl + 'login?Username=' + Username + '&Password' + Password, Headers).pipe(
      catchError(this.handleError)
    );
  }

  // Making the api call to GET all movies
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies`, {headers: new HttpHeaders( // use HttpHeaders to create new HTTP header object to be sent along
      // when making API call
      {
        Authorization: 'Bearer ' + token, // pass token in HTTP header since this is protected route
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

  // Making the api call to GET one movie
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
  
  // Making the api call to get one movie's director
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

  // Making the api call to get one movie's genre
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
  
  // Making the api call to get a particular user
  getUser(userID: any): Observable<any> {
    const token = localStorage.getItem('token');    
    return this.http.get(apiUrl + `users/${userID}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

  // Making the api call to get a particular user's favorite movies
  getFavoriteMovies(userID: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `users/${userID}/movies`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }
  
  // Making the api call to add a movie to a particular user's favorite movies
  addFavoriteMovie(movieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    const userID = localStorage.getItem('userID');
    
    return this.http.post(apiUrl + `users/${userID}/movies/${movieID}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

  // Making the api call to edit a user's information
  editUser(updatedInfo: any): Observable<any> {
      const token = localStorage.getItem('token');
      const userID = localStorage.getItem('userID');

    return this.http.put(apiUrl + `users/${userID}`, updatedInfo, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

  // Making the api call to delete a particular user
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const userID = localStorage.getItem('userID');
    return this.http.delete(apiUrl + `users/${userID}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

  // Making the api call to delete a particular user's favorite movie
  deleteFavoriteMovie(movieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    const userID = localStorage.getItem('userID');

    return this.http.delete(apiUrl + `users/${userID}/movies/${movieID}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

    // Non-typed response extraction
    private extractResponseData(res: any): any { 
      const body = res;
      return body || { };
    }

    private handleError(error: HttpErrorResponse): any { // HTTPErrorResponse: an HTTP response that represents an error or failure that gets
      // returned during or after executing an HTTP request (API call)
      if (error.error instanceof ErrorEvent) {
        console.error('Some error occurred:', error.error.message);
      } else {
        console.error(`Error Status code ${error.status}, ` + `Error body is: ${error.error}`);
      }
      return throwError(() => new Error('Something bad happened; please try again later.'));
    }
  }


