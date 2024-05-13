import { AuthService } from './../../../../core/services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  onLoginClick() {
    this.isSubmitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const credentials = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
      username: this.loginForm.get('username')?.value,
    };

    const requestBody = {
      user: credentials,
    };
    this.authService.login(requestBody).subscribe(
      (response: any) => {
        localStorage.setItem('token', JSON.stringify(response.user.token));
        localStorage.setItem('userId', JSON.stringify(response.user.id));

        console.log(response);
        this.authService.setAuthStatus(true);
        console.log(
          'Authentication status after login:',
          this.authService.getAuthStatus()
        );
        this.toastr.success('Login Successfully', '', {
          timeOut: 2000,
        });
        this.router.navigate(['/auth/signup']);
      },
      (error: any) => {
        this.toastr.error('Invalid Credentials', error.message, {
          timeOut: 2000,
        });
        console.error('Login failed:', error);
      }
    );
  }
}
