import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { MainService } from '../shared/services/main.service';
import { Observable, Subscription } from 'rxjs';



@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  authFormGroup: FormGroup;
  error: string = null;
  authSub$: Observable<any>;

  constructor(
    private authService: AuthService,
    private mainService: MainService
  ) {}

  ngOnInit() {
    this.authFormGroup = new FormGroup<{
      email: FormControl;
      password: FormControl;
    }>({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (this.authFormGroup.valid) {
      this.mainService.isLoading.next(true);
      const authFormData = {
        email: this.authFormGroup.get('email').value,
        password: this.authFormGroup.get('password').value
      };

      if (this.isLoginMode) {
        this.authSub$ = this.authService.loginUser(authFormData)
      } else {
        this.authSub$ = this.authService.signUpUser(authFormData)
      }

      this.authSub$.subscribe({
        next: () => {
          this.mainService.isLoading.next(false);
          this.error = null;
          this.authFormGroup.reset();
        },
        error: (error) => {
          this.error = error;
          this.mainService.isLoading.next(false);
        }
      });

      this.authFormGroup.reset();
    }
  }
}
