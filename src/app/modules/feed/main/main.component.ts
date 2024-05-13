import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  isAuthenticated: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Set initial authentication status
    this.isAuthenticated = this.authService.getAuthStatus();
  }

  handleStartReading(): void {
    if (this.isAuthenticated) {
      // If the user is logged in, navigate to the articles page
      this.router.navigate(['/articles']);  // Adjust to your article page route
    } else {
      // If the user is not logged in, show a toast and redirect to signup
      this.toastr.warning('Please log in first.', '', {
        timeOut: 2000,
      });
      this.router.navigate(['/auth/signup']);  // Redirect to signup page
    }
  }
}
