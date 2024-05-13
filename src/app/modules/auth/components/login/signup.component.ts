import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signupForm!: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) {}



  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }


  get formControls() {
    return this.signupForm.controls;
  }

  onSignupClick() {
    this.isSubmitted = true;

    if (this.signupForm.invalid) {
      return;
    }

    const credentials = {
      email: this.signupForm.get('email')?.value,
      password: this.signupForm.get('password')?.value,
    };

    const requestBody = {
      user: credentials,
    };
    this.authService.signup(requestBody).subscribe({
      next: (response: any) => {
        localStorage.setItem('token', JSON.stringify(response.user.token));

        console.log(response);
        this.authService.setAuthStatus(true);

        this.toastr.success('SignIn Successfully', '', {
          timeOut: 2000,
        });
        this.router.navigate(['/articles']); // navigate
      },
      error: (error) => {
        this.toastr.error('Invalid Credentials', error.message, {
          timeOut: 2000,
        });
        console.error('Registration failed:', error);
      
      }
    });
  }
}
