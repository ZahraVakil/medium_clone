import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  user: any;
  isLoading: boolean = true; // Flag for spinner


  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(
      (response: any) => {
        this.user = response.user;
        this.isLoading = false; 

      },
      (error: any) => {
        console.error('Error fetching current user:', error);
        this.isLoading = false;

      }
    );
  }
}
