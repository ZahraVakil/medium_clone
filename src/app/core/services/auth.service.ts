import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated: boolean = false;
  private authStatusSubject: Subject<boolean> = new Subject<boolean>();

  loginURL: string = environment.baseURL + environment.login_url;
  signupURL: string = environment.baseURL + environment.signup_url;
  currentUserURL: string = environment.baseURL + environment.currentUser_url

  constructor(private http: HttpClient) {
    // Initialize authentication status from localStorage on service initialization
    this.isAuthenticated = this.getStoredAuthStatus();
  }

  private getStoredAuthStatus(): boolean {
    const storedStatus = localStorage.getItem('authStatus');
    return storedStatus ? JSON.parse(storedStatus) : false;
  }

  setAuthStatus(status: boolean) {
    this.isAuthenticated = status;
    localStorage.setItem('authStatus', JSON.stringify(status)); // Store status in localStorage
    this.authStatusSubject.next(status); // Emit the new authentication status
  }

  getAuthStatus(): boolean {
    return this.isAuthenticated;
  }

  get authStatus() {
    return this.authStatusSubject.asObservable(); // Expose asObservable to subscribe from components
  }

  login(credentials: any) {
    return this.http.post(this.loginURL, credentials);
  }

  signup(credentials: any) {
    return this.http.post(this.signupURL, credentials);
  }

   getCurrentUser(){
    return this.http.get<any>(this.currentUserURL);
  }

  // getCategories(){
  //   return this.http.get<any>(this.categoriesURL);
  // }
}
