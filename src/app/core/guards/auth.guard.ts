import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private toastr: ToastrService) {}

  canActivate(): boolean {
    const isAuthenticated = localStorage.getItem('token') !== null;
    if (!isAuthenticated) {
      this.toastr.warning('Please log in first.', '', {
        timeOut: 2000,
      });
      this.router.navigate(['/auth/signup']);
    }
    return true;
  }
}
