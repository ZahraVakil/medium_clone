import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ArticleService } from 'src/app/core/services/article.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isAuthenticated: boolean = false;
  isDropdownOpen: boolean = false;
  isTagOpen: boolean = false;

  loggedInUser: any ;
  tags: any[] = [];

  constructor(private authService: AuthService, private router: Router, private articleService: ArticleService) {}

  ngOnInit(): void {

    this.fetchTags()

    // Subscribe to auth status changes
    this.authService.authStatus.subscribe((status) => {
      this.isAuthenticated = status;
    });

    // Initialize the auth status
    this.isAuthenticated = this.authService.getAuthStatus();

    this.authService.getCurrentUser().subscribe( 
          (response: any) => {
      this.loggedInUser = response.user;
      console.log('Logged in user:', this.loggedInUser);
    },
    (error: any) => {
      console.error('Error fetching current user:', error);
    }
  );
  }

  fetchTags(): void {
    this.articleService.getTags().subscribe(
      (response: any) => {
        console.log('Tags fetched:', response);
        this.tags = response.tags;
      },
      (error: any) => {
        console.error('Error fetching', error);
      }
    );
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }


  toggleTag(){
    this.isTagOpen = !this.isTagOpen;

  }
  onLogout() {
    this.authService.setAuthStatus(false); // Set auth status to false
    localStorage.clear(); // Clear local storage
    this.router.navigate(['/']); // Navigate to home page
  }
}
