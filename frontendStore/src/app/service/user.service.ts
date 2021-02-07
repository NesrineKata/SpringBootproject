import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {CookieService} from 'ngx-cookie-service';
import { JwtResponse } from '../entity/JwtResponse';
import {adminUrl, apiUrl} from '../../environments/environment';
import { User } from '../entity/User';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  @Injectable({
    providedIn: 'root'
})
export class UserService {

    private currentUserSubject: BehaviorSubject<JwtResponse>;
    public currentUser: Observable<JwtResponse>;
    public nameTerms = new Subject<string>();
    public name$ = this.nameTerms.asObservable();
    constructor(private http: HttpClient,
                private cookieService: CookieService) {
        const memo = localStorage.getItem('currentUser');
        this.currentUserSubject = new BehaviorSubject<JwtResponse>(JSON.parse(memo));
        this.currentUser = this.currentUserSubject.asObservable();
        cookieService.set('currentUser', memo);
    }
    getUserByUsername(username):Observable<any>{
        const url = `${apiUrl}/getbyusername/${username}`;
        return this.http.get<User>(url);

    }
    get currentUserValue() {
        return this.currentUserSubject.value;
    }


    login(credentials): Observable<JwtResponse> {
      /*  return this.http.post("http://localhost:8080/api/auth/login", {
          username: credentials.username,
          password: credentials.password
        }, httpOptions);
    */
   return this.http.post<any>("http://localhost:8080/api/auth/login",  {
    username: credentials.username,
    password: credentials.password
  }).pipe(
    tap(user => {
        if (user && user.accessToken) {
            this.cookieService.set('currentUser', JSON.stringify(user));
            localStorage.setItem('currentUser', JSON.stringify(user));
           /* if (loginForm.remembered) {
                localStorage.setItem('currentUser', JSON.stringify(user));
            }*/
            //console.log((user.roles[0]));
            this.nameTerms.next(user.username);
            this.currentUserSubject.next(user);

            return user;
        }
    }),
    catchError(err=>"error"))
    }
    
    signUp(user): Observable<any> {
        return this.http.post("http://localhost:8080/api/auth/register", {
          username: user.username,
          name:user.name,
          email: user.email,
          password: user.password
        }/*, httpOptions*/);
      }


      
/*
    login(loginForm): Observable<JwtResponse> {
        //const url = `${apiUrl}/login`;
        const url="http://localhost:8080/api/auth/login";
        return this.http.post<JwtResponse>(url, loginForm).pipe(
            tap(user => {
                if (user && user.accessToken) {
                    this.cookieService.set('currentUser', JSON.stringify(user));
                    if (loginForm.remembered) {
                        localStorage.setItem('currentUser', JSON.stringify(user));
                    }
                    console.log((user.username));
                    this.nameTerms.next(user.username);
                    this.currentUserSubject.next(user);
                    return user;
                }
            }),
            catchError(this.handleError('Login Failed', null))
        );
    }
*/
    logout() {
        this.currentUserSubject.next(null);
        localStorage.removeItem('currentUser');
        this.cookieService.delete('currentUser');
        this.cookieService.delete('cart');
    }
/*
    signUp(signUpForm): Observable<> {
       // const url = `${apiUrl}/register`;
        const url="http://localhost:8080/api/auth/register";
        return this.http.post<>(url, signUpForm);
    }
*/
    update(user: User): Observable<User> {
        const url = `${apiUrl}/profile`;
        return this.http.put<User>(url, user);    }

    get(email: string): Observable<User> {
        const url = `${apiUrl}/getbyusername/${email}`;
        return this.http.get<User>(url);
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            console.log(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
    getUsers():Observable<User[]>{
        const url=`${adminUrl}/get`;
        return this.http.get<User[]>(url);
    }
   deleteUser(id){
       return this.http.delete("http://localhost:8080/api/auth/delete"+id);
   }  
}